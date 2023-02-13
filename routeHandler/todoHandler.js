const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const todoSchema = require("../schemas/todoSchema");
const Todo = new mongoose.model("Todo", todoSchema);

//get a Todo
router.get('/:status', async (req,res)=>{
    console.log(req.params.status);
try{
    await Todo.find({status:req.params.status},(err,data)=>{
        if(err){
            console.log(err);
            res.status(500).json({error:"There was a server side error",})
        }else{
    
            res.status(200).json({
                result:data,
                message:"Success"
            });
        }
    });
}catch(err){
console.log(err)
}
});

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
//Post Multiple Todo
router.post("/all", async(req,res)=>{
    await Todo.insertMany(req.body,(err)=>{
        if(err){
            res.status(500).json({error:"There was a server size error !"});
        }else{
            res.status(200).json({message:"Todos were inserted successfully"});
        }
    });
});
//put update Todo
router.put("/:id",async(req,res)=>{
    try{ 
        
     const result =   await Todo.findByIdAndUpdate(
        {_id:req.params.id},
        {$set: {
            status:"inactive",
            title:"update title -1000"
        },},
        {new:true},
        (err)=>{
            if(err){
                res.status(500).json({error:"There was a server side error"});
            }else{
                console.log(req.params.id);
               
                res.status(200).json({message:
                "Todo was updated successfully"});  
            }
        }
        );  
    
   }catch(err){}
});
module.exports = router ;