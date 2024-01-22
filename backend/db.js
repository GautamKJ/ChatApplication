const mongoose= require('mongoose');

// const localurl="mongodb://localhost:27017/chatting";
const atlasurl="mongodb+srv://gautamKJ:jhagautam@cluster0.wprrdt5.mongodb.net/ChatApplication?retryWrites=true&w=majority";
const database= ()=>{
    mongoose.connect(atlasurl).then(
       ()=>{
       console.log("Database connected........");
   })
   .catch((err) =>{
       console.log("no connection" +err);
   })



}
module.exports=database;