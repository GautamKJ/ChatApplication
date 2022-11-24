const jwt=require('jsonwebtoken');
const JWT_SECRET="ThisIsGautamKumarJha";
const fetchuser=(req,res,next)=>{
   
    // if(!token){
    //     res.status(401).send({error: "Please authenticate using a valid token"});

    // }
    try{
        const token=req.header('auth-token');
        console.log(token);
        // JSON.stringify(token);
        // console.log(typeof(token));
        // const data= jwt.decode(token,JWT_SECRET);
        const data=jwt.decode(token);
    // const data=jwt.verify(token,JWT_SECRET);
    console.log ({data});
    req.user=data.user;
    next();
    }
    catch(error){
        console.log("-----------------------------");
        res.status(401).send({error: "Please authenticate using a valid tokennnnn"});
    }
}

module.exports=fetchuser;