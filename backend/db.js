// connection to the database
const mongoose = require('mongoose');

//uri string genrated from mongoose compass
const mongoURI = "mongodb://127.0.0.1:27017/inotebook";
//creating connection
const connectToMongo = ()=>{
    mongoose.connect(mongoURI)
    console.log("connected to mongoose");
}

module.exports =  connectToMongo;
