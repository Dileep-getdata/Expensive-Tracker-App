const jwt=require('jsonwebtoken');
const Users = require('../models/users');


exports.authenticate=(req,res,next)=>{
    try{   
          
        const token=req.headers.authentization;                
        const user=(jwt.verify(token,process.env.TOKEN_SECREATKEY));
        console.log(user.name);          
        Users.findByPk(user.id).then(user=>{           
            req.user=user;            
            next();
        }).catch(err=>console.log(err))
    }catch(err){
        res.status(500).json(err);
    }
}
