import React, { useContext,useEffect,useState,useRef} from 'react'
import FriendList from './FriendList';
import Message from './Message';
import Navbar from './Navbar'
import io from "socket.io-client";
import ChatContext from '../context/chatContext';
import {useNavigate} from "react-router-dom";

const Chat=()=> {
  document.title = "GauShip";

  let navigate=useNavigate();
  // const socket=io.connect('https://18.210.61.107');
    const user=useContext(ChatContext);
    console.log("context  ",user);
    
  const [ans,setans]=useState("");
  const [width, setWidth] = useState(window.innerWidth);
  const socket = useRef();
  const [state,setstate]=useState({});
  const {user_name,chat,imgurl,userAdd,newuserAdd,click,back,setback,checkClick,friendChat,receiverId,senderId,frienddetail,setUser_name,getId,mess,clickUser,userEmail,user2Email,sendMsg,setsendMsg,chatting,chatId,updatemsg,setupdatemsg,setMess}=user;
 
    const updateWidth = () => {
      setWidth(window.innerWidth);
      
    };
    useEffect(() => {
      window.addEventListener("resize", updateWidth);
      return () => window.removeEventListener("resize", updateWidth);
  });
    useEffect(() => {
      console.log("ME");
      socket.current = io("https://18.210.61.107");

      socket.current.on("getMessage", (data) => {
        
        console.log("Data   ",data.senderEmail,"   "+chatId);
        setstate({
          conversationId:chatId,
          senderEmail:data.senderEmail,
          message:data.text,
          createdAt: Date.now(),
        })
      });
      console.log("reach HERE");
      setMess((prev) => [...prev,state]);
      console.log("socket io ",state,"\n"+chatId);
        console.log("123456789---> ",mess)
    }, [state]);
    
    useEffect(()=>{
      
      console.log("user----- ",userEmail+"    "+user2Email);
      
        const em1= getId(userEmail);
        const em2= getId(user2Email);
      
      console.log("sendre-=--=-=-", senderId+"    "+receiverId+"      ");
      chat(chatId);

  

    },[frienddetail])


    useEffect(() => {
      console.log("ADDUSER ",senderId);
      socket.current.emit("addUser", senderId);
      // socket.current.emit("addUser", receiverId);
      
    }, [click]);
    
    
    let newArr=[];

    useEffect(()=>{
      if(localStorage.getItem('token'))
      {
      console.log(user_name);
          
        friendChat();
        console.log("e3e3");
      // setimgurl(imgurl);
        // getId(userEmail)
        // console.log("imgurl ",imgurl);
      }
      else{
        console.log("not logined")
      navigate("/login");
      }
      
    },[])

    // useEffect(()=>{
    //   if(localStorage.getItem('token')){
    //   console.log("SETIMG CALL ")
    //   setImg(userEmail);
    //   }
    //   else{
    //     navigate("/login");
    //   }
    // },[]);

   

    //  socket.emit('privatechatroom', {userEmail});

     const setMsg=(e)=>{
        //  e.preventDefault();
          setsendMsg(e.target.value);
        }

        useEffect(()=>{
          
            console.log("-=-=- ",state);
            // setMessages((prev) => [...prev, state]);
            console.log("update array \n",mess);
            friendChat();
        },[state]);
                
      //   useEffect(()=>{
      //     console.log("IMGURL ",imgurl);
      //     setimgurl(imgurl);
      // },[imgurl]);
              
     const onsubmit=async (e)=>{
      
        e.preventDefault();
        // console.log("sendMsg ----------------------------------------------  ",sendMsg+"      "+chatId+"<<<<<<<<<<<<<<<"+userEmail +"------------"+user2Email);
  console.log("sfjoiasfn ",userEmail+"    "+senderId+"    "+receiverId+"    "+sendMsg);
        socket.current.emit("sendMessage", {
          senderEmail:userEmail,
          senderId: senderId,
          receiverId:receiverId,
          text: sendMsg,
        })

        console.log("----------------------------------------------------");
        console.log(chatId+"  "+userEmail+"   "+user2Email+"   "+sendMsg);
     await    chatting(chatId,userEmail,user2Email,sendMsg);
      
        // setMess((prev) => [...prev, {
        //   conversationId:chatId,
        //   senderEmail:userEmail,
        //   text:sendMsg
        // }]);
     await   friendChat();

      await  chat(chatId);
        
        console.log("MESSSSSSSSSSSSSSSSSSS, ",mess);
        setsendMsg("");
        
      }
      
      const moveBack=()=>{
        setback(false);

      }
  
  return (
 <>
        
            <Navbar></Navbar>
            <div className="bigbox">
        <div className="smallbox">
            {   (!back || width>750) &&  <div className="side">
             
        <div className="about">
            <div className="image">
                {/* <img src="" id="photo"/>  */}
            {/* {<img src={imgurl} alt='profile' id="photo"/> } */}
                
                {<img src={imgurl} id="photo" alt ='profile'/>}
            </div>
                 
                 <div className="about_name">
                  <p>{user_name}</p>
                  </div>
                 <div className="menu">
                    
                 </div>
                
            </div>                
            
      
        <div className="message_container">
       
        {frienddetail.map((note)=>{
            if(note.name.length>0)
        return <FriendList key={note.id} note={note}/>
    })}
                       </div>
        
      

                         </div>
}
            {back &&      <div className="message" >
                    <div className="towhom" > 
                 {width<750 &&   <i class="fa fa-arrow-left" onClick={moveBack} aria-hidden="true"></i>}
                        <div className="image">
                            {/* <img src="./Design/chat.png" id="photo"/>  */}
                        </div>
                             
                            <p className="about_name">{clickUser}</p>
                           
                     </div>
                     
                    <div className="msg_container">

                    {mess.map((note,index)=>{
                       
                      
                      
                  return <Message key={index} note={note}/>
                  
    })}                                     
           
        </div>

        <div>
                <form onSubmit={onsubmit} id="type"  style={{display:clickUser===""?'none':'flex'}}>
                    <input type="text" value={sendMsg} onChange={setMsg}  name="msg" id="msg"/>
                    <button id="send">  <i class="fa fa-paper-plane" aria-hidden="true"></i></button>
                    {/* <!-- <input type="button" value="send" id="send"> --> */}
                
                </form>
            
            </div> 
                           
       
    </div>
}
    </div>
    </div>
    
 </>
  )
}

export default Chat;

