const express= require("express");
const Chat=require('../Schema/chat');
const User=require("../Schema/User")
const router=express.Router();
const {body,validationResult} =require('express-validator');
const fetchuser= require('../middleware/fetchuser');

// Route fetch all message at /api/chat/fetchmessage

router.post('/fetchmessage/:id',fetchuser, async (req,res)=>{
    try {
        
        let msg= await Chat.findById(req.params.id);
        let chatDet=[{}];
        // for(let i=0;i<msg.message.length;i++){
        //     msg.message[i]=msg.message[i].split("\n")[0];
        // //     `chatDet({
        // //         YoursEmail:YoursEmail,
        // //         FriendEmail:FriendEmail
        // //  `   })
        // }
        res.json(msg.message);
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
        // console.log("==============   "+myself);
            user1=myself[0].name;

        let displayContact=[{
            Useremail:user[0].email,
            myName:user1,
            id:"",
            name:"",
            message:"",
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
                
            //    console.log("naam "+naam);
                
               
            displayContact.push({
                Useremail:user[0].email,
                myName:myName,
                id:flastmsg[i]._id,
                name:naam[0].name,
                message:flastmsg[i].message[messlength-1].text,
                user2Email:em

            }
                
                );
                

            
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
                displayContact.push(
                    {   Useremail:user[0].email,  
                        myName:myName,
                          id:ylastmsg[i]._id,
                         name:naam[0].name,
                         message: ylastmsg[i].message[messlength-1].text,
                         user2Email:em
                        });
                }
            
            
    //   console.log("display");
            
            // const sortBydate=arr=>{
            //     const sorter= (a,b)=>{
            //         return new Date(b.message.split("\n")[1]).getTime()-new Date(a.message.split("\n")[1]).getTime();
            //     }
            //     arr.sort(sorter);
            // }
            // sortBydate(displayContact);
            // for(let i=0;i<displayContact.length;i++){
            //         displayContact[i].message=displayContact[i].message.split("\n")[0];
            // }
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
       
// Chat room
let msg=[];
msg.push(YoursEmail+" :"+ message+ new Date);

        let chat = new Chat ({
            // user:req.user.id,
            FriendEmail:FriendEmail  ,
            YoursEmail:YoursEmail,
            message: {
                conversationId:'100',
                senderEmail:YoursEmail,
                text:message
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

router.put("/morechat/:id",fetchuser, async (req,res)=>{

    const {FriendEmail,YoursEmail,message}=req.body;
  
    let msg= await Chat.findById(req.params.id);

   
    if(!msg){
        return res.status(404).send("Not found");
    }
        // console.log("YoursEmail "+YoursEmail);

    const updatedmsg={};
    msg.message.push({
        conversationId:req.params.id,
        senderEmail:YoursEmail,
        text:message
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
})

// Get chat room user details

module.exports=router;