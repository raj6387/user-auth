require("dotenv").config();
const jwt = require("jsonwebtoken");
const secretkey = process.env.SECRET_KEY;

const generateToken = async ({ email }) => {
  const token = await jwt.sign({ email }, secretkey);
  return token;
};

const verifyToken = async (req, res, next) => {
  try {
    const auth = await req.headers.authorization.split(" ")[1];

    if (!auth) {
      return Promise.reject(new Error("Please provide a Authentication Token"));
    }
    const [error, result] = jwt.verify(
      auth,
      secretkey,
      next,
      function (err, decoded) {
        return [err, decoded];
      }
    );
    if (error) {
      return Promise.reject(error);
    }
    return Promise.resolve(result);
  } catch (e) {
    return Promise.reject(e);
  }
};

const Protect = async (req, res, next) => {
  try {
    await verifyToken(req, res);
    next();
  } catch (error) {
    return res.status(403).send({
      success: false,
      message: "Please login again",
    });
  }
};
module.exports = { generateToken, verifyToken, Protect };
