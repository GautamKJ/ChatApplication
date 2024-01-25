import React, { useState } from 'react'
import {Link,useNavigate} from "react-router-dom";
import axios from "axios";

const Signup = () => {

    let navigate=useNavigate();
    const [image,setimage]=useState("");
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

  const setfile=async(e)=>{
    console.log("file ");
    console.log(e.target.files);
    setimage(e.target.files[0]);
    try{

    
    const file=e.target.files[0];

    if(!file){
      return alert("FIle not exists");
    }
    if(file.size>1024*1024)
    return alert("Too big size");
    

    }
    catch(error){
      console.log(error);
    }
  }

const onsubmit= async(e)=>{
  e.preventDefault();

  let formData = new FormData();
   
  formData.append('file', image);
  formData.append('name',credentials.name);
  formData.append('email',credentials.email);
  formData.append('password',credentials.password);


  console.log(formData);

  const response = await axios.post("https://18.210.61.107/api/login/create", formData,{
      
      headers:{
        'content-type':'multipart/form-data',
      },
      
      
    });
    console.log(" image ",image);
    // const json= await response.json();
      console.log(response.data);
        if(response.data){
          window.alert("Successfully Added");
            console.log("adfasd");
            localStorage.setItem('token',response.token);
            navigate("/login");
            
        }
        else{
          window.alert(response.data);
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
  <div className="user-image">
      <p id="img">Select image:</p>
      <input type="file" id="img" name="file" value={credentials.img}  onChange={setfile}  accept="image/*"/>
  </div>
  <button type="submit"  >Register</button>

  <p className="alreadyReg">Already register? <Link to="/login">Log in</Link></p>
  
  
  
</form>
</div>


</>
  )
}






export default Signup;