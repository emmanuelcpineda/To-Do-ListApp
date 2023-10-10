const express = require('express');
const { registerUser, 
  loginUser, 
  allUsersInfo, 
  userInfo } = require('../controllers/UserControllers');
const { verifyUserToken } = require('../authenticate');

const router = express.Router();

// register/create new user
// http://localhost:4500/users/register
router.post('/register', registerUser);

// login user
// http://localhost:4500/users/login
router.post('/login', loginUser);

//get all users' info
// http://localhost:4500/users/all
router.get('/all', allUsersInfo);

//get info of specific user
// http://localhost:4500/users/:userId
router.get('/:userId', verifyUserToken, userInfo);

module.exports = router;