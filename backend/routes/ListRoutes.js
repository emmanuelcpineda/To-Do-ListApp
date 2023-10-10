const express = require('express');
const { createList, 
  getUserLists, 
  deleteList } = require('../controllers/ListControllers');
const { verifyUserToken } = require('../authenticate');

const router = express.Router();

// route to create a list of tasks
// http://localhost:4500/lists/create
router.post('/create', verifyUserToken, createList);

//route to get all lists of a user
// http://localhost:4500/lists/:userId
router.get('/:userId', verifyUserToken , getUserLists);

//route to delete a list
// http://localhost:4500/lists/:listId
router.delete('/:listId', verifyUserToken, deleteList)

module.exports = router; 