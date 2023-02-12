const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const todoSchema = require("../schemas/todoSchema");
const Todo = new mongoose.model("Todo", todoSchema);


//Post A TODO
router.post("/",async(req,res)=>{
    const newTodo = new Todo(req.body);
    console.log(newTodo);
    await newTodo.save((err)=>{
        if(err){
            console.log(err);
            res.status(500).json({error:"There was a server side error",})
        }else{
            res.status(200).json({
                message:"Todo was inserted successfully!"
            });
        }
    });
});
module.exports = router ;