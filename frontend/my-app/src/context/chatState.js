import React, { useState } from 'react'
import ChatContext from './chatContext';


const ChatState=(props)=>{
    console.log("here chatState ...........");
    const chatinitials=[];
    // let mess=[];
    const [mess,setMess]= useState([]);
    const[userEmail,setuserEmail]=useState("");
    const[userAdd,newuserAdd]=useState("");
    const[user2Email,setuser2Email]=useState("");
    const[user_name,setUser_name]= useState("");
    const [clickUser,setclickUser]=useState("");
    const [sendMsg,setsendMsg]=useState("");
    const [senderId,setSenderId]=useState("");
  const [receiverId,setreceiverId]=useState("");
  const [click,checkClick]=useState("");
    const [back,setback]=useState(false);
    var options=[];
    var [msglist,setmsglist]=useState(options);

    const [updatemsg,setupdatemsg]=useState([]);
    const [chatId,setchatId]=useState("");

    
        console.log("user_name   "+user_name);
    const friend=[];
    const [frienddetail,updatefrienddetail]= useState(friend);
    const host=`http://localhost:8081`;

//  Fetch all friend list

const friendChat= async()=>{
    console.log("FriendChat ");
    const response=await fetch(`${host}/api/chat/fetchfriend`,{
        method:"POST",
        headers:{
            'content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
          },
    })
    
    const json= await response.json();
    console.log("json friendChat ",json);
    updatefrienddetail(json);
    if(json)
    
    setUser_name(json[0].myName);
    setuserEmail(json[0].Useremail);

    if(json.length>1){
        setuser2Email(json[1].user2Email);
    }
    
}


// Establish a room between two user

const createRoom= async (FriendEmail,YoursEmail,message)=>{
    const response = await fetch(`${host}/api/chat/addmessage`,{
        method:"POST",
        headers:{
            'content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
    
          },
        body:JSON.stringify({FriendEmail,YoursEmail,message})

    })
    const json = await response.json();
    console.log("JSON ",json);

}

// Fetch chat between two user

const chat=async(id)=>{
    const response = await fetch(`${host}/api/chat/fetchmessage/${id}`,{
        method:"POST",
        headers:{
            'content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
          },
          
    })
    const json = await response.json();
    // setMess([]);
    console.log("chat between two user   ",json.length);
    console.log(json);
    // for(let i=0;i<json.length;i++ ){
    //     console.log(json[i]);
    setMess(json);
    // }
    setchatId(id);
    
    

    console.log(mess);
}

// Chat between user 

const chatting=async(id,YoursEmail,FriendEmail,message)=>{


        console.log("LLLLLLLLLLL  ",id+"        "+YoursEmail+"      "+FriendEmail+"         "+message);
    try {
        
    const response = await fetch(`${host}/api/chat/morechat/${id}`,{
        method:"PUT",
        headers:{
            'content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
    
          },
          body:JSON.stringify({FriendEmail,YoursEmail,message})
    })
    const json = await response.json();
}
    catch (error) {
        console.log("chatting error ",error);
    }
}

const getId= async (email)=>{
    console.log("getID  ",email);

    const response=await fetch(`${host}/api/chat/getUser`,{
        method:"POST",
        headers:{
            'content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
    
          },
          body:JSON.stringify({email})
    })
    const json = await response.json();
    console.log(json);
    if(email===userEmail){
        console.log("USERADDJSON ",userEmail+"      "+json);
        setSenderId(json);
    }
    else {
        setreceiverId(json);
        console.log("GetID ",email,"    "+user2Email+"        "+ json);
    }


    // return json;



    

}

const searchuser= async(email)=>{

    const response=await fetch(`${host}/api/login/searchUser`,{
        method:"POST",
        headers:{
            'content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
    
          },
          body:JSON.stringify({email})
    })
    const json = await response.json();
    if(json.length!=0)
  await  createRoom(userEmail,email,"Create At ");
    await friendChat();
    console.log(json);
    

}


    return(
        <ChatContext.Provider value={{click,checkClick,userAdd,newuserAdd,back,setback,senderId,searchuser,setSenderId,receiverId,setreceiverId,msglist,friendChat,getId,chat,chatting,frienddetail,user_name,setUser_name,mess,userEmail,clickUser,setclickUser,sendMsg,setsendMsg,chatId,user2Email,setuser2Email,updatemsg,setupdatemsg,setMess}}>
        {props.children}
        </ChatContext.Provider>

    )

}
export default  ChatState;

