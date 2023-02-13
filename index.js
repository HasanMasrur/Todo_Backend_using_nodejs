const express = require('express');
const mongoose = require('mongoose');
const todoHandler = require("./routeHandler/todoHandler");
var cors = require('cors');
// express app initialization
const app = express();
app.use(express.json());
app.use(cors());
 const port = process.env.port||5000;
// database connection with mongoose
mongoose.set("strictQuery", false);
mongoose
  .connect("mongodb+srv://Hasan:Hasan@cluster0.s2uo3ke.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connection successful"))
  .catch((err) => console.log(err));

app.use("/todo",todoHandler);

// default error handler
function errorHandler(err, req, res, next) {
    if (res.headersSent) {
      return next(err);
    }
    res.status(500).json({ error: err });
  }
app.listen(port,()=>{
    console.log('app listening at port 5000');
});