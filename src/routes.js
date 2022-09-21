const express = require('express');
const {
  register, login, user, uploads, update, updateList, changePassword, updateProfile,
} = require('./controller/users/user');

const router = express.Router();

const { Protect } = require('./middleware/auth');
const { upload } = require('./middleware/media');

router.post('/register', register);
router.post('/login', login);
router.get('/list', Protect, user);
router.post('/upload', upload, uploads);
router.post('/update', update);
router.get('/updateList',updateList);
router.post('/changePassword',Protect,changePassword);
router.post('/updateProfile',updateProfile)

module.exports = router;
