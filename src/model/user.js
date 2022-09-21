const mongoose = require('mongoose');

const registerSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    dob: {
      type: String,
    },
    contact_no: {
      type: Number,

    },
    media:{
      type:mongoose.Types.ObjectId,
      ref:'medias'
    }
  },
  { timestamps: true },
);
module.exports = mongoose.model('users', registerSchema);
