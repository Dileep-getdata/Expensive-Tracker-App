const Users=require('../models/users');

function isString(string){
    if(string==undefined || string.length===0){
        return true;
    }else{
        return false;
    }
}

// <<<<<<<<<  Posting the SIGN-UP details in Database  >>>>>>>>>>
// 
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
        password:password})
    res.status(200).json({message:'Successfully signed Up'})
    }catch(err){
        res.status(500).json({err});
    }
}
// >>>>>>>>>>>>  END     <<<<<<<<<<<<<


// <<<<<<<<<  Posting the LOG-IN details and Autenticate emailUser  >>>>>>>>>>
// 
exports.postLogin=(req,res)=>{
    try{
        const{email,password}=req.body;        
        if(isString(email) || isString(password)){
            return res.status(400).json({err:'Bad Input'});
        }
        Users.findAll({where:{email:email}})
            .then((user)=>{            
                if(user[0]!==undefined){                   
                    if((user[0].password)===password){
                        return  res.status(200).json({message:'Succesfully loged in'});
                    }else{
                        return res.status(401).json({message:'Wrong password'});
                    }
                }else{
                    return res.status(404).json({message:'Not registered Sign Up'});
                }
            })
            .catch(err=>console.log(err));
    }catch(error){
        res.status(500).json({error});
    }
};
// >>>>>>>>>>>>  END     <<<<<<<<<<<<<

// exports.getSignupDetails=(req,res)=>{
//     console.log(req.body);
// }