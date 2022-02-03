var express = require('express');
const mongoose = require('mongoose');
var url = "mongodb://localhost:27017/";
var bodyParser = require('body-parser');
const port = process.env.PORT || 80;
var app = express();
var register=require("./routes/register");
var login = require("./routes/login");
var sendmail = require("./routes/send-mail");
const { send } = require('process');
mongoose.connect('mongodb://localhost:27017/deepDB');
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use("/register",register);
app.use("/login",login);
app.use("/sendmail",sendmail);






app.get("/",(req,res)=>{
    res.send("Index Page");
});
app.listen(port,()=>{
    console.log(`App started successfully on port  ${port}`);
 });