const Users=require('../models/users');

function isString(string){
    if(string==undefined || string.length===0){
        return true;
    }else{
        return false;
    }
}

exports.postSignupDetails= async(req,res)=>{
    try{
    const {name,email,password}=req.body;
    console.log(typeof name);
    if(isString(name) || isString(email) || isString(password)){        
       return  res.status(400).json({err:'Bad Input data'});
    }    
    await Users.create({
        userName:name,
        email:email,
        passowrd:password})
    res.status(201).json({message:'Successfully signed Up'})
    }catch(err){
        res.status(500).json({err});
    }
}

// exports.getSignupDetails=(req,res)=>{
//     console.log(req.body);
// }