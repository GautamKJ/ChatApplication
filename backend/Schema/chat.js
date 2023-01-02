const mongoose=require('mongoose');
const {Schema}=mongoose;

const chatSchema= new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
        FriendEmail:{
            type:String,
            required:true
        },
        YoursEmail:{
            type:String,
            required:true
        },
        message:[{

            conversationId: { type: String},
            senderEmail: { type: String,  },
            text: { type: String},
            iv:{type:Buffer},
            Date:{
                type:Date,
                default:new Date()

            }

           
        }],
        
    },
      )

module.exports=mongoose.model("Conversation",chatSchema);