const router = require("express").Router();
const Task = require("../models/task");
const User = require('../models/user');
const authenticationToken = require('../middleware/auth_utils');
const url = "/tasks";

//create task
router.post(url,authenticationToken,async(req,res)=>{
    try{
        console.log(req.body);
        const {title,description, important,category } = req.body;
        const id = req.user._id.toString();
        const newTask = new Task({title : title, description:description, important :important , category: category});
        const saveTask = await newTask.save();
        const taskId = saveTask._id;
        await User.findByIdAndUpdate(id,{$push : {tasks : taskId}});
        return res.status(200).json({message : "Task created successfully."});
    } catch(err){
        console.log(err);
        return res.status(500).json({message: "Server error."});
    }
});

router.get(url, authenticationToken, async (req, res) => {
    try {
        const userId = req.user._id;

        const user = await User.findById(userId).populate('tasks');

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        return res.status(200).json({ tasks: user.tasks });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error." });
    }
});

router.delete(`${url}/:id`, authenticationToken,async(req,res)=>{
    try{
        const {id} = req.params;
        const user_id = req.user._id;
        await Task.findByIdAndDelete(id);
        await User.findByIdAndUpdate(user_id,{$pull : {tasks :id}})
        res.status(201).json({message : "Task deleted successfully"});
    } catch(err){
        console.log(err);
        res.status(500).json({message : "Server error."});
    }
});

router.put(`${url}/:id`,authenticationToken,async(req,res)=>{
    try{
        const {id} = req.params;
        const {title, description , category, important } =req.body
        task = await Task.findByIdAndUpdate(id,{title: title , description:description, category: category, important: important})
        return res.status(201).json({Task: task });
    } catch(err){
        console.log(err);
        res.status(500).json({message: "Server error"});
    }
});






module.exports = router;