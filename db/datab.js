const mongoose = require("mongoose");

mongoose.connect('mongodb+srv://infinityxx07:CR7XKUNAL@cluster0.tz4y4ua.mongodb.net/common')

const userschema = mongoose.Schema({
    firstname:String,
    lastname :String,
    username : String,
    password :String
})

const USER = new mongoose.model("USER",userschema);

module.exports=USER;