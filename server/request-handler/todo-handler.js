import todoModel from "../models/model.js";

export async function addTodo(req, res) {
  try {
    const todo = new todoModel({
      item: req.body.item,
      date:req.body.date,
    });
    const newTodo = await todo.save();
    res.status(200).json(newTodo);
  } catch (err) {
    res.json({  error: ' Error in adding todo item' });
  }
}

export async function getTodo(req, res) {
  try {
    const todos = await todoModel.find();
    res.json(todos);
  } catch (err) {
    res.json({  error: ' Error in geting todos'});
  }
}


export async function deleteTodo (req,res){

    try {
        
        await todoModel.findByIdAndDelete(req.params.id);
        res.json({ message: 'deleted successfully' });
      } catch (err) {
        res.json({  error: ' Error in deleting todo item'});
      }
   
}

export async function updateTodo (req,res){

    try {
        const updatedTodo = await todoModel.findByIdAndUpdate(req.params.id, { item: req.body.item });
        res.json(updatedTodo);
      } catch (err) {
        res.status(500).json({  error: ' Error in updation'});
      }
   
}

export async function checkedTodo  (req, res) {
    const { id } = req.params;
    const { completed } = req.body;
  
    try {
      const checkedTodo = await todoModel.findByIdAndUpdate(id, { completed }, { detault: true });
      res.json(checkedTodo);
    } catch (error) {
      console.error('Error in checked todo item', error);
      res.json({ error: ' Error in checked todo item' });
    }
  };