require('dotenv').config();
const Task = require('../models/TaskSchema');
//const User = require('../models/UserSchema');
const jsonToken = require('jsonwebtoken');

// function to create a task
const createTask = async(req, res) => {
  try{
    const { title, toDoTask, remarks } = req.body;
    const userToken = req.headers.authorization;
    let userId = '';
    //checks if all inputs are valid
    if( !title || !toDoTask || !remarks ) {
      return res.status(400).send('Please input values on all fields');
    }
    
    // decrypt user token
    if(userToken && userToken.startsWith('Bearer')) {
      // get the token, without the 'Bearer'
      const token = userToken.split(' ')[1];

      // decode token
      const decoded = jsonToken.verify(token, process.env.JWT_SECRET);
      console.log('user id: ', decoded.id);
      userId = decoded.id;
    
    } else {
      return res.status(400).send('Invalid Request. No Token.');
    }

    //create and save new task
    const newTask = await Task.create({
      userId,
      title,
      toDoTask,
      remarks,
    })
    newTask.save();

    return (newTask) ? res.status(201).json({newTask}) 
    : res.status(400).send('Invalid Request.')

  } catch(error) {
    console.error(error);
    res.status(500).send('Failed. Server Error.');
  }
}

// function to get user tasks
const getUserTasks = async(req, res) => {
  try {
    const userToken = req.headers.authorization;
    let userId = '';
    // decrypt user token
    if(userToken && userToken.startsWith('Bearer')) {
      // get the token, without the 'Bearer'
      const token = userToken.split(' ')[1];

      // decode token
      const decoded = jsonToken.verify(token, process.env.JWT_SECRET);
      //console.log('user id: ', decoded.id);
      userId = decoded.id;
    
    } else {
      return res.status(400).send('Invalid Request. No Token.');
    }

    const task = await Task.find({});
    const userTasks = [];
    task.map( (task) => {
      //extract the userId from the ObjectId
      const user = task.userId.toHexString();
      //console.log('userId from db: ', user);
      // return user's tasks
      if(userId === user) {
        userTasks.push(task);
      }
    })
    return res.status(200).json(userTasks);

  } catch(error) {
    console.error(error);
    return res.status(500).send('Failed. Server Error');
  }
}

//function to update a task
const updateTask = async(req, res) => {
  try{ 
    // destructure values from body and params
    const { title, toDoTask, remarks } = req.body;
    const { taskId } = req.params;
    
    // initialize updates
    const dataToUpdate = {
      title: title,
      toDoTask: toDoTask,
      remarks: remarks,
    };

    const updatedData = await Task.findByIdAndUpdate( taskId, dataToUpdate, { new: true })
    console.log(updatedData);
    if( updatedData ) { 
      //updatedData.save(); 
      return res.status(200).json(updatedData);
    
    } else {
      return res.status(404).send('Task Not Found.');
    }

  } catch(error) {
    console.error(error);
    res.status(500).send('Failed. Server Error');
  }
}

//function to update whether a task is completed or not
const isTaskCompleted = async (req, res) => {
  try{ 
    const { taskId } = req.params;
    
    // find the task to be updated
    const currentTaskStatus = await Task.findById( taskId );
    // function for updating the task
    const taskUpdate = async (task) => {
      task.isCompleted = !task.isCompleted;
      const updatedTask = await task.save();
      return res.status(200).json(updatedTask);
    }

    return (!currentTaskStatus) ? res.status(404).send('Task Not Found.') 
    : taskUpdate(currentTaskStatus);

  } catch(error) {
    console.error(error);
    res.status(500).send('Failed. Server Error');
  }
}

//function to delete a task
const deleteTask = async(req, res) => {
  try{ 
    const { taskId } = req.params;
    console.log('task id', taskId);
    // find task to be deleted
    const taskToDelete = await Task.findByIdAndDelete(taskId);
    return (!taskToDelete) ? res.status(404).send('Error. Task Does Not Exist') 
    : res.status(200).send('Sucess! Task has been deleted.');

  } catch(error) {
    console.error(error);
    res.status(500).send('Failed. Server Error');
  }
}


module.exports = { createTask, getUserTasks, updateTask, deleteTask, isTaskCompleted };