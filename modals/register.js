// var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017/deepDB";

var mongoose = require("mongoose");
const  usersSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username : String,
    password : String,
    phone : Number,
    name: String,

});

module.exports= mongoose.model("users",usersSchema);