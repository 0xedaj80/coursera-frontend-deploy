const jwt = require("jsonwebtoken")



const secretkey = "something"
const secretkeyuser = "nothing"
const generateJwt = (user, role)=>{
     const payload = {username:user.username,role:role};
     return jwt.sign(payload, secretkey, {expiresIn:"1h"}) 
    
}

const generateJwtuser = (user, role)=>{
     const payload = {username:user.username,role:role};
     return jwt.sign(payload, secretkeyuser, {expiresIn:"1h"}) 
    
}

const authenticateJwtuser = (req,res,next)=>{
    const authtoken = req.headers.authorization;

    if(authtoken){
       const token = authtoken.split(' ')[1];
       
       jwt.verify(token, secretkeyuser,(err, user) =>{
           if(err){ 
              return res.status(403).json({msg:"auth failed"})
           } 
           req.user = user; 
           console.log(user)
           next(); 
       });
    }else{ 
         res.status(403).json({msg:"authentication failed"})
    }     
}

const authenticateJwt = (req,res,next)=>{
    const authtoken = req.headers.authorization;

    if(authtoken){
       const token = authtoken.split(' ')[1];
       
       jwt.verify(token, secretkey,(err, user) =>{
           if(err){ 
              return res.status(403).json({msg:"auth failed"})
           } 
           req.user = user; 
           console.log(user)
           next(); 
       });
    }else{ 
         res.status(403).json({msg:"authentication failed"})
    }
     
}

module.exports = {
     generateJwt,
     authenticateJwt,
     generateJwtuser,
     authenticateJwtuser,
     secretkey
}