const express= require("express");
const Chat=require('../Schema/chat');
const User=require("../Schema/User")
const router=express.Router();
const {body,validationResult} =require('express-validator');
const fetchuser= require('../middleware/fetchuser');

// crypto module
const crypto = require("crypto");

const algorithm = "aes-256-cbc"; 

// protected data

// secret key generate 32 bytes of random data
const Securitykey = "@s!8h0ie2#89m-_=~g>{p6./R02A#srk";


// Route fetch all message at /api/chat/fetchmessage

router.post('/fetchmessage/:id',fetchuser, async (req,res)=>{
    try {
        console.log(req.params.id);
        let msg= await Chat.findById(req.params.id);
        let chatDet=[{}];

// the decipher function

        let msgArray=[{
            conversationId:"",
            senderEmail:"",
            text:"",
            iv:"",
            Date:""
        }];
          // the decipher function
          

        for(let i=0;i<msg.message.length;i++){
            // console.log(msg.message[i]);
            let iv=msg.message[i].iv;
            let decipher = crypto.createDecipheriv(algorithm, Securitykey, iv);
            let decryptedData = decipher.update(msg.message[i].text, "hex", "utf-8");

            decryptedData += decipher.final("utf8");

            msgArray.push({
                conversationId:msg.message[i].conversationId,
                senderEmail:msg.message[i].senderEmail,
                text:decryptedData,
                iv:msg.message[i].iv,
                Date:msg.message[i].Date
             });

        }
        
// const decipher = crypto.createDecipheriv(algorithm, Securitykey, initVector);

// let decryptedData = decipher.update(message, "hex", "utf-8");

// decryptedData += decipher.final("utf8");
        res.json(msgArray);
    } catch (error) {
        console.error(error.message);
        res.status(500).json("Some error found");
    }
 
})

// Route to display all friendList


router.post('/fetchfriend',fetchuser, async (req,res)=>{
    try {
    // console.log(req.user.id);
        
        let user= await User.find({_id:req.user.id});

        // console.log(user[0].email);
        let myself=await User.find({email:user[0].email});
        console.log("==============   "+myself);
            user1=myself[0].name;

        let displayContact=[{
            Useremail:user[0].email,
            myName:user1,
            id:"",
            name:"",
            message:"",
            image:user[0].image,
            user2Email:""
        }];
    //    console.log("hereereefe");
    //    He may be friend in some chat room
        let flastmsg= await Chat.find({FriendEmail:user[0].email});
        
    // He may start the chat room
        let    ylastmsg= await Chat.find({YoursEmail:user[0].email});

let myName;
            let naam;
            for(let i=0;i<flastmsg.length;i++){
                let myself=await User.find({email:flastmsg[i].FriendEmail});
                // console.log("==============   "+myself);
                    myName=myself[0].name;
                let messlength=flastmsg[i].message.length;
               let em=flastmsg[i].YoursEmail;
                naam=await User.find({email:em});
                
                console.log("24823u89ru23wfhasjfdvhfj ",messlength) ;
            //    console.log("naam "+naam);
                
                    // the decipher function
                    let iv=flastmsg[i].message[messlength-1].iv;
            let decipher = crypto.createDecipheriv(algorithm, Securitykey, iv);
                    

            let decryptedData = decipher.update(flastmsg[i].message[messlength-1].text, "hex", "utf-8");

            decryptedData += decipher.final("utf8");

            displayContact.push({
                Useremail:user[0].email,
                myName:myName,
                id:flastmsg[i]._id,
                name:naam[0].name,
                message:decryptedData,
                image:naam[0].image,
                user2Email:em

            });
                

            
        }
            for(let i=0;i<ylastmsg.length;i++){
                // user2Email:ylastmsg[i].FriendEmail;
                // console.log("user2Email2  ",user2Email);
                let myself=await User.find({email:ylastmsg[i].YoursEmail});
            

                // console.log("==============   "+myself);
                myName=myself[0].name;
                    let messlength=ylastmsg[i].message.length;
                    let em=ylastmsg[i].FriendEmail;
                    // console.log("em  ",em);
                    naam=await User.find({email:em});
                    // console.log("naam2"+naam+"naam3");
                    // console.log("-------------> ",myName);
                    console.log("asdfghjkl;  ",messlength) ;
                    console.log("MSG  ",ylastmsg[i].message[messlength-1]);

                   // the decipher function
                   let iv=ylastmsg[i].message[messlength-1].iv;
                   let decipher = crypto.createDecipheriv(algorithm, Securitykey, iv);

                    console.log("decrypt msg ");

                    let decryptedData = decipher.update(ylastmsg[i].message[messlength-1].text, "hex", "utf-8");
                    console.log("decrypt 124");
                    decryptedData += decipher.final("utf8");
                        console.log("decrypt ",decryptedData);
                displayContact.push(
                    {   Useremail:user[0].email,  
                        myName:myName,
                          id:ylastmsg[i]._id,
                         name:naam[0].name,
                         message: decryptedData,
                         image:naam[0].image,
                         user2Email:em
                        });
                }
            
            
  
  
        res.json(displayContact);
        
    }
     catch (error) {
        console.error(error.message);
        res.status(500).json("Some error found");
    }
 
})
// Route to add first time message at /api/chat/addmessge

router.post('/addmessage',fetchuser,async (req,res)=>{
    try {
        
        const {FriendEmail,YoursEmail,message}=req.body;

        let friend=await User.findOne({email:YoursEmail});
        
// my chat
let initVector = crypto.randomBytes(16);
let cipher = crypto.createCipheriv(algorithm, Securitykey, initVector);
       
// Chat room
let encryptedData = cipher.update(message, "utf-8", "hex");
encryptedData += cipher.final("hex");
let msg=[];
msg.push(YoursEmail+" :"+ encryptedData+ new Date);

        let chat = new Chat ({
            // user:req.user.id,
            FriendEmail:FriendEmail  ,
            YoursEmail:YoursEmail,
            message: {
                conversationId:'100',
                senderEmail:YoursEmail,
                text:encryptedData,
                iv:initVector
            }
        })


        const savechat=await chat.save();
        res.json(savechat);

    } catch (error) {
        console.error(error.message);
        res.status(500).json("Some error found");   
    }
})

// Route to chatting at /api/chat/morechat

router.put("/morechat/:id", async (req,res)=>{

    const {FriendEmail,YoursEmail,message}=req.body;
  
    let msg= await Chat.findById(req.params.id);

   
    if(!msg){
        return res.status(404).send("Not found");
    }
    // the cipher function
    let initVector = crypto.randomBytes(16);
        let cipher = crypto.createCipheriv(algorithm, Securitykey, initVector);
        // console.log("YoursEmail "+YoursEmail);
        var encryptedData = cipher.update(message, "utf-8", "hex");
        encryptedData += cipher.final("hex");

    const updatedmsg={};
    msg.message.push({
        conversationId:req.params.id,
        senderEmail:YoursEmail,
        text:encryptedData,
        iv:initVector
    })

        // console.log("message  ",msg);
    
    
        if(message){updatedmsg.message=msg.message};
            updatedmsg.date=new Date
            
    msg= await Chat.findByIdAndUpdate(req.params.id,{$set:updatedmsg},{new:true}) 
    res.json(msg);
 


})


// Get Friend details name photot

router.post('/getUser',fetchuser,async (req,res)=>{
    
    
    try {
        const {email}=req.body;
        // console.log("Email ",email);
    let msg= await User.find({email});

   
    if(!msg){
        return res.status(404).send("Not found");
    }
    res.json(msg[0]._id);
}
    catch (error) {
        console.error(error.message);
        res.status(500).json("Some error found");   
    }
});

// Get chat room user details

module.exports=router;