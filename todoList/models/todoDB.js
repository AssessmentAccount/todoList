var mongoose = require("mongoose");


//Connection URL
var url = 'mongodb://localhost/todoList';

mongoose.connect(url);


//mongoose schema
var todoSchema = new mongoose.Schema({
    userName: String,
    password: String,
    salt: String,
    todoList:[String]
});

module.exports = mongoose.model("Todo", todoSchema);