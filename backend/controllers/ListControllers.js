const List = require('../models/ListSchema');
 
//function to create a list
const createList = async (req, res) => {
  try{ 
    const { userId, taskId } = req.body;
    
    if(!userId || !taskId) {
      return res.status(400).send('Please Complete the Required Fields.');
    }

    const newList = await List.create({
      taskId: taskId,
      userId: userId,
    })
    if(!newList) {
      res.status(500).send('Failed to Create List')
    }
    //save created list into db
    const savedNewList = await newList.save();
    if(savedNewList){
      return res.status(200).json(savedNewList);
    
    } else {
      return res.status(500).send('Failed to save new list.');
    }

  } catch(error) {
    console.error(error);
    res.status(500).send('Failed. An Error Occured');
  }
}

//function to get user lists
const getUserLists = async(req, res) => {
  try {
    const { userId } = req.params;

    const findLists = await List.find({ userId: userId });
    console.log(findLists, userId);
    if( !findLists || findLists.length === 0 ) {
      return res.status(404).send('No List Found.');
    }
    return res.status(200).json(findLists);

  } catch(error) {
    console.error(error);
    res.status(500).send('Failed. An Error Occured.');
  }
}

// function to delete a list
const deleteList = async(req, res) => {
  try {
    const { listId } = req.params;
    const listToDelete = await List.findByIdAndRemove(listId);
    if(!listToDelete) {
      return res.status(500).send('Error. Failed to delete list.');
    }
    return res.status(200).json(listToDelete);

  } catch(error) {
    console.error(error);
    return res.status(500).send('Failed. An error occured.');
  }
}


module.exports = { createList, getUserLists, deleteList };