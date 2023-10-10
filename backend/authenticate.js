require('dotenv').config();
const jsonToken = require('jsonwebtoken');
const Task = require('./models/TaskSchema');

// create user token
const generateToken = (user) => {
  const tokenData = {
    id: user._id,
    email: user.email,
    isAdmin: user.isAdmin
  };
  return jsonToken.sign( tokenData, process.env.JWT_SECRET, {} );
};

// verify user token
const verifyUserToken = (req, res, next) => {
  let token = req.headers.authorization;

  // function to set user to the token value
  const decodedToken = (token) => {
    //console.log(token);
    req.user = token;
    next();
  } 

  if( typeof token === "undefined" ) { 
    return res.send({invalid: 'Token Does Not Exist.'});

  } else {
    token = token.slice(7, token.length);
    //console.log(token);

    //decrypt token
    jsonToken.verify(token, process.env.JWT_SECRET, (error, decodedUserToken) => {
      //console.log(error);
      return (error) ? res.send({invalid: 'Not Authorized.'}) 
      : decodedToken(decodedUserToken);
    })
  }
}

// to verify if user info matches
const isUserInfoMatched = async (req, res, next) => {
  try {
    const userToken = req.headers.authorization;
    const idToVerify = req.params;
    // decrypt user token
    if(userToken && userToken.startsWith('Bearer')) {
      // get the token, without the 'Bearer'
      const token = userToken.split(' ')[1];
      
      // decode token
      const decoded = jsonToken.verify(token, process.env.JWT_SECRET);
      // console.log('user id: ', typeof decoded.id);
      // console.log('params ', typeof idToVerify.guestId);
      
      //if the req.params has 'taskId' as its value, 
      if( idToVerify.taskId === req.params.taskId ) {
        // extract first the 'userId' from the task info
        const task = await Task.findById(idToVerify.taskId)
        //console.log(task.userId);
        //extract only the exact userId
        const user = task.userId.toHexString();
        return (user === decoded.id) ?
          next() : res.status(400).send('Error. Not Matched.')

      } else {
        return res.status(400).send('Error. Not Matched.');
      }
      
    } else {
      return res.status(400).send('Invalid Request. No Token.');
    }

  } catch(error) {
    console.log(error);
    return res.status(500).send('Failed.Server Error.');
  }
}

module.exports = { generateToken, 
  verifyUserToken, 
  isUserInfoMatched };