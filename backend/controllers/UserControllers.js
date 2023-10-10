const User = require('../models/UserSchema');
const auth = require('../authenticate');
const bcrypt = require('bcryptjs');

// function to create/register new user
const registerUser = async(req, res) => {
  try{
    const { name, email, phoneNumber, password } = req.body;
    if( !name || !email || !phoneNumber || !password ) {
      return res.status(400).send('Incomplete User Details.')
    }
    //to check if user already have an account
    const userRecord = await User.findOne({email});
    if(userRecord) {
      return res.status(400).send(`User ${userRecord.email} already exists.`);
    }
    //encrypt password
    const bcryptSalt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, bcryptSalt);
    const createNewUser = await User.create({
      name,
      email,
      phoneNumber,
      password: encryptedPassword,
    })
    // save user info to db
    createNewUser.save();
    return createNewUser ? res.status(201).json({message:`Success! Welcome ${createNewUser.name}!`}) 
    : res.status(400).json({message: 'Failed to register user.'});
  
  } catch(error) {
    console.error(error);
    res.status(500).send("Failed. Server Error.");
  }
}

// function to login user
const loginUser = async(req, res) => {
  try{
    const { email, password } = req.body; 
    //find user info from db
    const findUser = await User.findOne({email});
    //console.log(findUser);
    if( findUser && (await bcrypt.compare(password, findUser.password)) ){
      return res.status(200).json({
        message: `Welcome back ${findUser.name}!`,
        id: findUser._id,
        token: auth.generateToken(findUser)
      })
    } else {
      res.status(400).send('Invalid email or password');
    }

  } catch(error){
    console.error(error);
    res.status(500).send("Failed. Server Error");
  }
}

// function to get all users' info 
const allUsersInfo = async( req, res ) => {
  try {
    const users = await User.find({});
    //console.log(users);

    return users ? res.status(200).send(users) : res.status(400).send('Unable to fetch users\' details');

  } catch(error) {
    console.error(error);
    res.status(500).send('Failed. Server Error');
  }
}

//function to get specific user's info
const userInfo = async(req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);

    return user ? res.status(200).json({user}) : res.status(400).send('Unable to fetch user details.');

  } catch(error) {
    console.error(error);
    res.status(500).send('Failed. Server Error');
  }
}

module.exports = { registerUser, loginUser, allUsersInfo, userInfo };