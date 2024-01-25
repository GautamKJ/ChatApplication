
import './App.css';
import {BrowserRouter , Route,Routes} from "react-router-dom";
import Signup from './Components/Signup';
import Login from './Components/Login';
import Chat from './Components/Chat';
import ChatState from './context/chatState';
import io from "socket.io-client";
import { useEffect } from 'react';

function App() {
  const socket=io.connect('https://18.210.61.107');
//   useEffect(() => {
  
//     const socket = socketIOClient('https://18.210.61.107');
//     console.log("socket  ",socket );
//  }, []);
  return (
    <>
  {
    <ChatState>
      <div>
    <BrowserRouter>
          
          
       <Routes>
       
       
         < Route exact path="/" element={<Login/>}/> 
        < Route exact path="/chat" element={<Chat/>}/>  
        < Route exact path="/login" element={<Login />}/> 
        < Route exact path="/signup" element={<Signup/>}/> 
        

        </Routes>
        
        </BrowserRouter>
        </div>
        </ChatState>
}
    </>
  );
}

export default App;

