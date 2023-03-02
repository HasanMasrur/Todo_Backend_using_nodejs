const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
 city: {
    type: String,
    required: true,
  },
  description: String,
  status: {
    type: String,
    enum: ["active", "inactive"],
  },
  price:{
    type:Number,
    required:true,
  },
  lat:{
    type:Number,
    required:true,
  },
  lng:{
    type:Number,
    required:true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
todoSchema.methods = {
  findActive :()=>{
 return mongoose.model("Todo").find({'status':"active"}) .select({
  _id: 0,
  __v: 0,
  price:0,
  city:0,
  description:0,
  date: 0,
});
  },
};

module.exports = todoSchema;
