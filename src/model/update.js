const mongoose = require('mongoose');

const UpdateSchema = mongoose.Schema({
  media: {
    type: mongoose.Types.ObjectId,
    ref: 'medias',
  },
  user: {
    type:mongoose.Types.ObjectId,
    ref: 'users'
  },
  newPassword:String,
});
module.exports = mongoose.model('updates', UpdateSchema);
