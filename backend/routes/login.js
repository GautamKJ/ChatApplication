
const express= require("express");
const bcrypt=require('bcryptjs');
const User=require('../Schema/User');
const jwt=require('jsonwebtoken');
const router=express.Router();
var fs = require('fs');
var path = require('path');
const {body,validationResult} =require('express-validator');
const middleware= require('../middleware/fetchuser');
const cloudinary=require('cloudinary').v2;
require('dotenv').config();
const JWT_SECRET="ThisIsGautamKumarJha"



const fetchuser = require("../middleware/fetchuser");

cloudinary.config({
  cloud_name:process.env.CLOUD_NAME,
  api_key:process.env.API_KEY,
  api_secret:process.env.CLOUD_API_SECRET
})




router.get('/', (req, res) => {
  console.log ("ASDfasdf");
	User.find({}, (err, items) => {
		if (err) {
			console.log(err);
			res.status(500).send('An error occurred', err);
		}
		else {
      console.log(items);
      res.send(items);
			// res.send('imagesPage', { items: items });
		}
	});
});

// console.log(upload);

// Resgiter user on port /auth/user/create-user

router.post('/create', async (req,res)=>{
   
    // const errors = validationResult(req);
    
    // if (!errors.isEmpty()) {
    //   return res.status(400).json({ errors: errors.array() });
    // }
    console.log("body-- \n",req.body)
    // console.log("req.file ",req);
    console.log("files-- \n",req.files);
    console.log("-----------------------------");
    try{

      
// check whether this email id already exist or not
    let user=await User.findOne({email:req.body.email});
    if(user){
        return res.status(400).json("Email id already exist");
    }
    if(!req.files || Object.keys(req.files).length===0){
      return res.status(400).json({msg:"No files were uploaded"});
  }
  const file=req.files.file;
  if(file.size>1024*1024)
  return res.status(400).json({msg:"Size too large"}); 

  if(file.mimetype!=='image/jpeg' && file.mimetype!=='image/png')
  return res.status(400).json({msg:"File format is incorrect"}); 

  // Hash Password

    const salt= await bcrypt.genSalt(10);
    const secPass=await bcrypt.hash(req.body.password,salt);
    // console.log(req);
  
    // Image upload to cloudinary and database

   
  

 

  cloudinary.uploader.upload(file.tempFilePath,{folder:"image"}, async (err,result)=>{
      if(err)
      throw err;
      console.log("asdfajshdfjhasldfkjasldfnakjsdf ",result);

      // res.json({public_id:result.public_id,url:result.secure_url});
      
    user = await   User.create({
      name: req.body.name,
      password: secPass,
      email:req.body.email,
      image:result.secure_url
    
   
    })
    const data={
      user:{
        id: user.id
      }
    }
    var token = jwt.sign(data, JWT_SECRET);
      
    res.json({token});
  })
     
    }
    catch(errors){
        console.error("errors.message ",errors);
        res.status(500).json("Some error found");
    }
 
})


// Login user on port /auth/user/login

router.post('/loginUser',[
  
  body('password',"Password can't be blank").exists(),
  ],  async (req,res)=>{
 
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try{

      console.log(req.body);
    const {email,password}=req.body;   
    console.log("email  ",req.body.email);

    let user=await User.findOne({email});
  console.log("jhgfdf ",user," ----------");
    if(!user){
    return res.json("Wrong credentials");}

    let passcmp= await bcrypt.compare(password,user.password);
    console.log("passcmp ",passcmp," ----------");
    if(!passcmp){
      return res.json("Wrong credential");
    }
    
  const data={
    user:{
      id: user.id
    }
  }
  var token = jwt.sign(data, JWT_SECRET);
  
res.json({token});
   
  }
  catch(errors){
      console.error(errors.message);
      res.status(500).json("Some error found");
  }

})

router.post("/searchUser",fetchuser,async(req,res)=>{
try {
  let user=await User.find(req.body);
  if(!user){
    return res.json("No member of this email id is found");}
  else{
    res.json(user);
  }    
   
} catch (error) {
    res.status(500).json("Some error found");
}
  
})


router.post("/getloggeddetail",async(req,res)=>{
  try {
    let user=await User.find(req.body);
    console.log(" user user ",user)
    if(!user){
      return res.json("No member of this email id is found");}
    else{
      
      res.json(user[0].image);
    }    
     
  } catch (error) {
      res.status(500).json("Some error found");
  }
    
  })
  
  
  


module.exports=router;