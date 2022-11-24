const mongoose= require('mongoose');

const database= ()=>{
     mongoose.connect("mongodb://localhost:27017/chatting",()=>{
        console.log("Database connected........");
    });

}

module.exports=database;