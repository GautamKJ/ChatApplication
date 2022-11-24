// const database=require('./db');
const express=require('express');
const database = require('./db');
const http = require('http');
var cors = require('cors');
const fileupload = require("express-fileupload");
const port=8081;
var app= express();


app.use(fileupload());

app.use(cors())

database();
app.use(express.json());


app.use("/api/login",require("./routes/login"))
app.use("/api/chat",require("./routes/conversation"))

let httpServer=http.createServer(app);

// const io = require("socket.io")(8000)
const io = require('socket.io')(httpServer, {
  
    cors: {
      origin: '*',
    }
  });


httpServer.listen(port,()=>{
    console.log("port listen at ",port);

   
    let users = [];

const addUser = (userId, socketId) => {
  console.log("user????? ",userId);
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  console.log("getser ",userId,"      "+users.length);
  
  for(let i=0;i<users.length;i++)
  console.log("find ",users[i]);
  return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  //when ceonnect
  console.log("a user connected.");

  //take userId and socketId from user
  // console.log("socket ",socket);
  
  socket.on("addUser", (userId) => {
    console.log("comeon  ",userId,"   "+socket.id);
    if( !users.find((user) => user.userId === userId)){
    addUser(userId, socket.id);
    }
    for(let i=0;i<users.length;i++){
      console.log("mE--- ",users[i]);
    }
    // io.emit("getUsers", users);
  });

  //send and get message
  socket.on("sendMessage", ({senderEmail, senderId, receiverId, text }) => {
    console.log("ASDFGHJKL");
    console.log("SenderID, REciever ID ",senderId+"   "+receiverId);
    const user = getUser(receiverId);
    console.log("user----- ",user);
    if(user!=undefined){
    io.to(user.socketId).emit("getMessage", {
      senderEmail,
      senderId,
      text,
    });
  }
  });

  //when disconnect
  // socket.on("disconnect", () => {
  //   console.log("a user disconnected!");
  //   removeUser(socket.id);
  //   io.emit("getUsers", users);
  // });
});

          
  
        });



