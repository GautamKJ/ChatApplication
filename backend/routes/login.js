
const express= require("express");
const bcrypt=require('bcryptjs');
const User=require('../Schema/User');
const jwt=require('jsonwebtoken');
const router=express.Router();
var fs = require('fs');
var path = require('path');
const {body,validationResult} =require('express-validator');
const middleware= require('../middleware/fetchuser');

const JWT_SECRET="ThisIsGautamKumarJha"

// Step 5 - set up multer for storing uploaded files

var multer = require('multer');
const fetchuser = require("../middleware/fetchuser");

var storage = multer.diskStorage({
  
	destination: (req, file, cb) => {
		cb(null, 'uploads')
	},
	filename: (req, file, cb) => {
		cb(null, file.fieldname + '-' + Date.now())
	}
});

var upload = multer({ storage: storage });

// Step 7 - the GET request handler that provides the HTML UI

router.get('/', (req, res) => {
  console.log ("ASDfasdf");
	User.find({}, (err, items) => {
		if (err) {
			console.log(err);
			res.status(500).send('An error occurred', err);
		}
		else {
      console.log(items);
			res.render('imagesPage', { items: items });
		}
	});
});

// console.log(upload);

// Resgiter user on port /auth/user/create-user
router.post('/upload',upload.single('avatar'),
(req,res,next)=>{
  const file=req.file;
  const data= req.body;

  res.send.status(200).send("Success");


})
router.post('/create',[
    body('name').isLength({ min: 2}),  
    body('email').isEmail(),
    body('password').isLength({ min: 2}),
    ], async (req,res)=>{
   
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    console.log(req.body)
    try{

// check whether this email id already exist or not
    let user=await User.findOne({email:req.body.email});
    if(user){
        return res.status(400).json("Email id already exist");
    }
    const salt= await bcrypt.genSalt(10);
    const secPass=await bcrypt.hash(req.body.password,salt);
    // console.log(req);
  

  

    user = await   User.create({
        name: req.body.name,
        password: secPass,
        email:req.body.email,
     
      })
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


// Login user on port /auth/user/login

router.post('/loginUser',[
  
  body('password',"Password can't be blank").exists(),
  ],  async (req,res)=>{
 
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try{


    const {email,password}=req.body;
    
  let user=await User.findOne({email});
  if(!user){
    return res.json("Wrong credentials");}

    let passcmp= await bcrypt.compare(password,user.password);
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



module.exports=router;