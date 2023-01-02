const router=require('express').Router()
const cloudinary=require('cloudinary').v2;
require('dotenv').config();
// upload image on cloudinary

cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.CLOUD_API_SECRET
})

router.post('/uploadimg',(req,res)=>{
    try{

        console.log("req.files ",req.files);
        if(!req.files || Object.keys(req.files).length===0){
            return res.status(400).json({msg:"No files were uploaded"});
        }
        const file=req.files.file;

        if(file.size>1024*1024)
        return res.status(400).json({msg:"Size too large"}); 
        console.log("here1  ");
        if(file.mimetype!=='image/jpeg' && file.mimetype!=='image/png')
        return res.status(400).json({msg:"File format is incorrect"}); 
            console.log("here  ");
        cloudinary.uploader.upload(file.tempFilePath,{folder:"image"}, async (err,result)=>{
            if(err){
                console.log("errror ",err);
                throw err;

            }
            console.log("asdfajshdfjhasldfkjasldfnakjsdf ",result);

            res.json({public_id:result.public_id,url:result.secure_url});
        })
        console.log("here2  ");
        


    }
    catch(err){
        res.status(500).json({ msg:err.message});
    }
})

module.exports=router;