const express = require('express');
const { verifyUserToken, isUserInfoMatched } = require('../authenticate');
const { createTask, 
  getUserTasks, 
  updateTask,
  isTaskCompleted, 
  deleteTask } = require('../controllers/TaskControllers');

const router = express.Router();

// route to create new task
// http://localhost:4500/tasks/create
router.post('/create', verifyUserToken, createTask);

// route to get user's tasks
// http://localhost:4500/tasks/:userId
router.get('/:userId', verifyUserToken, getUserTasks);

//route to update a task
// http://localhost:4500/tasks/:taskId
router.put('/:taskId', verifyUserToken, isUserInfoMatched, updateTask);

//route to update whether a task is completed or not
// http://localhost:4500/tasks/status/:taskId
router.put('/status/:taskId', verifyUserToken, isUserInfoMatched, isTaskCompleted);

//route to delete a task
//http://localhost:4500/tasks/:taskId
router.delete('/:taskId', verifyUserToken, isUserInfoMatched, deleteTask);

module.exports = router;
