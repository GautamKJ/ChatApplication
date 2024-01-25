import React, { useContext, useEffect, useRef, useState } from 'react'
import io from "socket.io-client";
import { format } from "timeago.js";
import ChatContext from '../context/chatContext';
const socket=io.connect('http://18.210.61.107');
const Message=(props)=> {
  const {note}=props;

  console.log("note  ",note);
  const [count,setcount]=useState(-1);
  const [receivemsg,setreceivemsg]=useState([]);
  let array=[];
  
  const scrollRef=useRef(null);
 
  const context=useContext(ChatContext);
  const {userEmail,clickUser,sendMsg,setsendMsg,chatId,user2Email,chatting}=context;

  useEffect(() => {
    // console.log("scrollREf ",scrollRef.current);
    if(scrollRef.current)
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [note]);

  if(chatId!==note.conversationId && note.conversationId!='100'){
    console.log("return ",note.conversationId +"      "+chatId);
    return;
  }
  let right,left;
  
  
  // console.log("socket  ",socket);


    
    if(userEmail===note.senderEmail)
      {    right=note.text;
      }
    else{
      // setreceivemsg("")
      left=note.text;
      // setreceivemsg(left);
    }    
  


    
 
    if(left!=undefined){
  return (
    <div  >
      
                          
                            <div className="user_message left" ref={scrollRef} >{left}
                           
                            </div>
                           
                            
                            {/* <div className="user_message right"style={{display:right===undefined?'none':'block'}}>{right}</div> */}
                           


                         
                            
    </div>
    
  )}
  if(right!=undefined){
    return (
      <div >
        
                            
                              {/* <div className="user_message left" style={{display:left===undefined?'none':'block'}} >{left}</div> */}
                              
                              <div className="user_message right" ref={scrollRef}>{right}
                           
                              </div>
                              
                             
  
  
                              
                              
      </div>
      
    )
  }
}
export default Message;
