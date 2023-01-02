import React, { useContext, useState } from 'react'
import ChatContext from '../context/chatContext';

const  FriendList=(props)=> {
  const context=useContext(ChatContext);
  const {chat,setclickUser,setuser2Email,mess,back,setback,msglist,setmsglist,click,checkClick}=context;
  const {note,status}=props;
  console.log("NOTES ",note);

const onclick=(id)=>{
  console.log(id);
  console.log("USER  ",note);
  chat(id);
  console.log("afasd");
  setuser2Email(note.user2Email);
  setclickUser(note.name);
  checkClick(id);
  setback(true);
  // setmsglist(mess);
  // console.log("mess-----------------------");
  // console.log(mess);
}
  return (
    <>
       <div className="item1"  onClick={()=>{onclick(note.id)}}>
     <div className="user_detail" >
     <img src={note.image} alt='profile' id="user_img"/> 
                            {/* <img src='C:\Users\gauta\OneDrive\Documents\ReactJS\ChatQ\frontend\my-app\Design\chat.png' id='user_img'></img> */}
                        </div>
                        <div className="naam">{note.name}</div>
                        
                        <div className="getmessage">{note.message}</div>
                        </div>
    </>
  )
}

export default FriendList;
