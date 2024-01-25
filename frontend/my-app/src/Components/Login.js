import React, { useContext, useState } from 'react'
import {Link,useNavigate} from "react-router-dom";
import ChatContext from '../context/chatContext';
const Login = () => {

  const user=useContext(ChatContext);
  const {user_name,setUser_name,setImg,friendChat,setimgurl,imgurl}=user;

  
  let navigate=useNavigate();
  const [showbtn,updateshowbtn]=useState("far fa-eye");
  const [type,updatetype]=useState("password");
  const [credentials,setcredentials]=useState({email:"",password:""});

const showPassword=()=>{


  if(type==='password'){
      updatetype("text");
      updateshowbtn("far fa-eye-slash");
  }
  
  else{
  updatetype("password");

  updateshowbtn("far fa-eye");
  }

}

const setDetail=(e)=>{
  setcredentials({...credentials,[e.target.name]:e.target.value});
}

const onsubmit= async(e)=>{
  e.preventDefault();
  
  try {
    const response=await fetch("https://18.210.61.107/api/login/loginUser",{
      method:"POST",
      headers:{
        'content-Type':'application/json',
      },
      body:JSON.stringify({ email:credentials.email, password:credentials.password})
    });
    const json= await response.json();
    
    if(json.token===undefined){
      window.alert("Wrong credentail");
      setcredentials({email:"",password:""});
      return;
    }
    
    setUser_name(credentials.email);
      console.log(json);
      if(json.token){
          
          localStorage.setItem('token',json.token);
          navigate("/chat");
          
      }
       
    await  setImg(credentials.email);
      console.log("1334657987656223121255")
       friendChat();
      setcredentials({email:"",password:""});
      
      
    
  } catch (error) {
    console.log (error);
  }

  
  }
  document.title = "LogIn";
 
  
  return (  
    <>
  <div class="login-box">
  <h2>Gauship-ChatQ</h2>
  <form onSubmit={onsubmit}>
    <div class="user-box">
      <input type="email" name="email" id="email" value={credentials.email} minLength='3'  onChange={setDetail}/>
      <label>Email</label>
    </div>
    <div class="user-box">
      <input type={type} name="password" className="userpassword" value={credentials.password} minLength='3' onChange={setDetail} />
      <i className={showbtn}id="togglePassword" onClick={showPassword} ></i>
      <label>Password</label>
    </div>
    <button type="submit"  disabled={credentials.email==="" || credentials.password===""} >LOG in</button>
    <p class="info">Don't have an account? <Link to="/signup" id="signup">Sign up</Link> </p>
  </form>
</div>
    </>
  )
}


export default Login;