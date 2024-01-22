// const database=require('./db');
const express=require('express');
const database = require('./db');
const http = require('http');
const path=require('path');
var cors = require('cors');
const fileupload = require("express-fileupload");
const port=process.env.PORT || 5000;

var app= express();


// app.use(fileupload());

app.use(cors())

database();
app.use(express.json());
app.use(fileupload({
  useTempFiles:true
}));




app.use("/api/login",require("./routes/login"));
app.use("/api/chat",require("./routes/conversation"));
app.use("/api/upload",require("./routes/upload"));

let httpServer=http.createServer(app);


app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../frontend/my-app/build', 'index.html'));
});

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '../frontend/my-app/build', 'index.html'));
});
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

 
});

          
  
        });



