/* eslint-disable space-infix-ops */
const bcrypt = require("bcrypt");

const { generateToken, verifyToken } = require("../../middleware/auth");
const Users = require("../../model/user");
const { Schema } = require("../../validation");
const Medias = require("../../model/media");
const Updates = require("../../model/update");
const { schema } = require("../../changePasswordValid");

const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, dob, contactNo, media } =
      req.body;

    const { error } = Schema.validate(req.body);
    if (error) {
      return res.status(401).json({
        success: false,
        message: error.details[0].message,
      });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const result = await Medias.findOne({ _id: media });
    console.log("result", result);
    if (!result) {
      res.staus(400).json({
        success: false,
        message: "media does not exist",
      });
    }

    const user = await Users.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const data = new Users({
      firstName,
      lastName,
      email,
      password: hashPassword,
      dob,
      contactNo,
      media: media,
    });
    await data.save();

    return res.status(200).json({
      success: true,
      message: "Registered Successfully",
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error,
    });
  }
};
const login = async (req, res) => {
  try {
    const user = await Users.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Please enter valid email id ",
      });
    }
    const comparePassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!comparePassword) {
      return res.status(401).json({
        success: false,
        message: "Incorrect password!!",
      });
    }

    const token = await generateToken({ email: user.email });

    return res.status(200).json({
      success: true,
      token,
      message: "Login successfully",
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error,
    });
  }
};
const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword, confirmPassword } = req.body;
    const { error } = schema.validate(req.body);
    if (error) {
      res.status(401).json({
        success: false,
        message: error.details[0].message,
      });
    }
    const decodeToken = await verifyToken(req, res);
    const { email } = decodeToken;
    const data = await Users.findOne({ email });

    if (newPassword !== confirmPassword) {
      return res.status(401).json({
        success: false,
        message: "Password did not match",
      });
    }
    const checkPassword = await bcrypt.compare(oldPassword, data.password);
    if (!checkPassword) {
      return res.status(401).json({
        success: false,
        message: "please enter valid oldPassword",
      });
    }
    const hashPassword = await bcrypt.hash(confirmPassword, 10);

    const isMatch = await Users.updateOne(
      { email: data.email },
      { $set: { password: hashPassword } }
    );
    console.log("newPassword", isMatch);
    if (isMatch) {
      return res.status(200).json({
        success: true,
        message: "Password is successfully changed",
      });
    }
  } catch (error) {
    console.log("error", error);
    res.status(401).json({
      success: false,
      message: error,
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { firstName, lastName, contact_no, media } = req.body;
    const decodeToken = await verifyToken(req, res);
    const { email } = decodeToken;
    const data = await Users.findOne({ email });
    console.log("data",data);
    if (!data) {
      res.status(401).json({
        success: false,
        message: "user not found",
      });
    }
    const update = await Users.updateOne(
      { email: data.email },
       {$set: {firstName, lastName, contact_no, media} ,
  });
    return res.status(200).json({
      success: false,
      message: "Profile is updated successfully",
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error,
    });
  }
};
const user = async (req, res) => {
  try {
    const decodeToken = await verifyToken(req, res);
    const { email } = decodeToken;
    const data = await Users.findOne({ email })
    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error,
    });
  }
};
const uploads = async (req, res) => {
  const upload = new Medias({ path: req.file.path });
  await upload.save();
  res.status(200).json({
    success: true,
    message: "Image uploaded successfuly",
  });
};
// eslint-disable-next-line consistent-return
const update = async (req, res) => {
  const { mediaId, userId } = req.body;
  // console.log('req.body',req.body);
  const data = await Medias.findOne({ _id: mediaId });
  //console.log("data", data);
  if (!data) {
    return res.status(401).json({
      success: false,
      message: "image not found",
    });
  }
  const user = await Users.findOne({ _id: userId });
  if (!user) {
    return res.status(401).json({
      success: false,
      message: "user not found",
    });
  }
  const result = new Updates({
    media: mediaId,
    user: userId,
  });
  result.save();
  res.status(200).json({
    success: true,
    message: "updated successfully",
  });
};
const updateList = async (req, res) => {
  const list = await Updates.find().populate([
    { path: "media", model: "medias" },
    {
      path: "user",
      model: "users",
    },
  ]);
  res.send(list);
};

module.exports = {
  register,
  login,
  user,
  uploads,
  update,
  updateList,
  changePassword,
  updateProfile,
};
