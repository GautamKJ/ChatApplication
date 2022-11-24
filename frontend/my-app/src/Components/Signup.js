import React, { useState } from 'react'
import {Link,useNavigate} from "react-router-dom";

const Signup = () => {

    let navigate=useNavigate();
    
    const [showbtn,updateshowbtn]=useState("far fa-eye");
    const [type,updatetype]=useState("password");

    const [credentials,setcredentials]=useState({name:"",email:"",password:""});
    // const [registerDetail,updateregisterDetail]= ({name:"", email:"", password:"" })

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
    const response=await fetch("http://localhost:8081/api/login/create",{
        method:"POST",
        headers:{
          'content-Type':'application/json',
        },
        
        body:JSON.stringify({name:credentials.name , email:credentials.email, password:credentials.password})
      });
      const json= await response.json();
        console.log(json);
        if(json.token){
            console.log("adfasd");
            localStorage.setItem('token',json.token);
            navigate("/login");
            
        }
        setcredentials({name:"",email:"",password:""});
    }
    
    document.title = "SignIn";
    




    

  return (
    <>
   <div className="login-box">

<h2>Gauship-ChatQ</h2>
<form onSubmit={onsubmit} encType="multipart/form-data">
  <div className="user-box">
    <input type="text" name="name" id="name" value={credentials.name} onChange={setDetail} minLength='3' />
      <label>Name</label>
    </div>
  <div className="user-box">
    <input type="email" name="email" id="useremail"value={credentials.email}  onChange={setDetail} minLength='5'/>
    <label>Email</label>
  </div>
  <div className="user-box">
    <input type={type} name="password" className="userpassword" value={credentials.password}  onChange={setDetail} minLength='8'/>
  <i className={showbtn} id="togglePassword" onClick={showPassword}></i>
    <label>Password</label>
  </div>
  
  <button type="submit" >Register</button>

  <p className="alreadyReg">Already register? <Link to="/login">Log in</Link></p>
  
  
  
</form>
</div>


</>
  )
}






export default Signup;