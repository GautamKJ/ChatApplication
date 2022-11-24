import React, { useContext, useState } from 'react'
import {Link} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import ChatContext from '../context/chatContext';

const Navbar=() => {

  const content=useContext(ChatContext);
  const{userEmail,searchuser,userAdd,newuserAdd}=content;
  const host=`http://localhost:8081`;
  const[safe,setSafe]=("1");
  const navigate=useNavigate();
  const [search,setsearch]=useState("");
  const onchng=(e)=>{
    setsearch(e.target.value);

  }
  const check=async( email)=>{
    const response=await fetch(`${host}/api/chat/fetchfriend`,{
      method:"POST",
      headers:{
          'content-Type':'application/json',
          'auth-token':localStorage.getItem('token')
        },
  })
  
  const json= await response.json();

    if(json[0].user2Email===email)
        setSafe("-1");
      
      
  

  }
  const SearchId=(e)=>{
    e.preventDefault();
    if(search!=userEmail)
    {console.log(search);
      check(search)
      console.log(safe);
      if(safe==="1"){
      searchuser(search);
      newuserAdd(search);
      }
      else if(safe==="-1"){
        console.log("ALready exists");
      }
    
    }
    
    else{
      console.log("IT is U");

    }

    setsearch("");
  }
  const logout=()=>{
    console.log("logout");
    localStorage.clear();
    console.log(localStorage.getItem('token'));
    navigate("/login");
  }
  return (
    <>
    <nav className="navbar navbar-expand-lg bg-success">
  <div className="container-fluid">
    <Link className="navbar-brand" to={'/Chat'}>Gauship</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to={'/Chat'}>Home</Link>
        </li>
      </ul>
      <form className="d-flex" role="search">
        <input className="form-control me-2" type="search" placeholder="Find person..." aria-label="Search" value={search} onChange={onchng}/>
        <button className="btn btn-secondary" type="submit" onClick={SearchId} disabled={search===""} >Find</button>
      </form>
      <li className="nav-item mx-4">
      <button type="button" class="btn btn-primary" onClick={logout}>Log out</button>
      </li>
    </div>
  </div>
</nav>
    </>
  )
}
export default Navbar;