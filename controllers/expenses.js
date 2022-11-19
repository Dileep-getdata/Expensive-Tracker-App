const Expenses=require('../models/expenses');
const User=require('../models/users');
const jwt=require('jsonwebtoken');
const AWS=require('aws-sdk');


exports.getAllUserExpenses=async(req,res)=>{
    
    try{        
        const all_expenses=await Expenses.findAll();
        res.status(200).json(all_expenses);
    }catch(err){
        console.log(err);
        res.status(505).json({success:false,message:'Something went wrong in GET expenses'})
    }
}

exports.postExpensesUser=async(req,res)=>{
        const userId =req.body;
    try{
        const expenseUserName=await User.findByPk(userId.userId);       
        res.status(200).json({userName:expenseUserName.userName,success:true});
    }catch(err){
        console.log(err);
        res.status(505).json({success:false,message:'Something went wrong in GET expenses'})
    }
}

exports.getExpensesDetails=async(req,res)=>{
    try{
        
         const expenses=await req.user.getExpenses();
        //  console.log(expenses);
         res.status(200).json({expenses,ispremiumuser:req.user.ispremiumuser});

    }catch(err){
        console.log(err);
        res.status(505).json({success:false,message:'Something went wrong in GET expenses'})
    }
    
}

exports.postExpensesDetails=async (req,res,next)=>{
    try{
        const {ammount,description,category}=req.body;        
    const creating=await req.user.createExpense({ammount,description,category,});
    
    res.status(200).json({success:true,message:'Successfully Added Expenses'});
    }catch(err){
        console.log(err);
        res.status(505).json({success:false,message:'Something went wrong in POST expenses'})
    }
};

exports.deleteId=async(req,res)=>{
    try{
        const id=req.body.id;
        console.log(id)
        await Expenses.destroy({where:{id:id}});
        res.status(200).json({success:true,message:'Successfully Delted Expensive'});
        
    }catch(err){
        console.log(err);
        res.status(505).json({success:false,message:'Something went wrong in POST expenses'})
    }
};

exports.downloadExpense = async (req,res)=>{
    try{
        const expenses=await req.user.getExpenses();
    console.log(expenses);
    const userId=req.user.id;
    const strinfyExpenses=JSON.stringify(expenses);
    const filename=`day-to-day-Expense${userId}/${new Date()}.txt`;
    const fileURL=await upLoadToS3(strinfyExpenses,filename);
    res.status(200).json({fileURL,success:true});
    }catch(err){
        res.status(500).json({fileURL:'',success:false,err:err});
    }
    
}

function upLoadToS3(data,filename){
    const BUCKET_NAME=process.env.BUCKET_NAME;
    const IAM_USER_KEY= process.env.IAM_USER_KEY;
    const IAM_USER_SECRET=process.env.IAM_USER_SECRET;

    let s3bucket=new AWS.S3({
        accessKeyId: IAM_USER_KEY,
        secretAccessKey:IAM_USER_SECRET,
    })
   
        var params= {
            Bucket:BUCKET_NAME,
            Key:filename,
            Body:data,
            ACL:'public-read',
        }
        return new Promise((resolve,reject)=>{
            s3bucket.upload(params,(err,s3response) =>{
                if(err){
                    console.log('Something went wrong in uplaod S3-Bucket',err)
                    reject(err);
                }else{
    
                    console.log('success',s3response);
                    resolve(s3response.Location);
                }
    
            })
        })
        
   
}