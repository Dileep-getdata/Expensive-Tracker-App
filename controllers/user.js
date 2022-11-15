
const Users=require('../models/users');
const bcrypt=require('bcrypt');

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
        if(isString(name) || isString(email) || isString(password)){        
            return  res.status(400).json({err:'Bad Input data'});
        }
        const saltrounds=10;
        bcrypt.hash(password,saltrounds, async(err,hash)=>{   
            const userEmail=await Users.findAll({where:{email}});             
            if(email===userEmail[0].email){                
                return res.status(404).json({success:false,message:'Exiting Email Id'}); 
            }                
                await Users.create({
                    userName:name,
                    email:email,
                    password:hash});
                res.status(200).json({success:true,message:'Successfully signed Up'});        
        
        })    
    }
    catch(err){
        res.status(500).json({message:err,success:false});
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
                    bcrypt.compare(password,user[0].password,(err,result)=>{
                        if(err){
                            throw new Error('Something went wrong inLogin bcrypt compare');
                        }
                        console.log(result);
                        if(result===true){
                            
                            return  res.status(200).json({success:true,message:'Succesfully loged in'});
                        }else{
                            return res.status(401).json({success:false,message:'Wrong password'});
                        }
                    })                  
                   
                }else{
                    return res.status(404).json({success:false,message:'Not registered Sign Up'});
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