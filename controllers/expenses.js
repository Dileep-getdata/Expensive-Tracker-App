const Expenses=require('../models/expenses');
const User=require('../models/users');
const jwt=require('jsonwebtoken');
const AWS=require('aws-sdk');
const UserService=require('../services/userExpenses');
const s3Services=require('../services/s3Uplaod');

// exports.getExpenses=async(req,res)=>{
//     try{        
//         const page= +req.query.page;
//         const limt= +req.query.limit;
//         console.log('page:-',typeof limt);
//         const paggination_expenses=await req.user.getExpenses({
//             limit:limt,
//             offset:page*limt,
            
//         });
//         res.status(200).json({data:paggination_expenses});
//     }catch(err){
//         console.log(err);
//         res.status(505).json({success:false,message:'Something went wrong in GET expenses'})
//     }
// }

exports.getAllUserExpenses=async(req,res)=>{
    
    try{        
        const all_expenses=await Expenses.find();
        res.status(200).json(all_expenses);
    }catch(err){
        console.log(err);
        res.status(505).json({success:false,message:'Something went wrong in GET expenses'})
    }
}

exports.postExpensesUser=async(req,res)=>{
        const userId =req.body;
    try{
        const expenseUserName=await User.find({'_id':userId.userId});       
        res.status(200).json({userName:expenseUserName.userName,success:true});
    }catch(err){
        console.log(err);
        res.status(505).json({success:false,message:'Something went wrong in GET expenses'})
    }
}

exports.getExpensesDetails=async(req,res)=>{
    try{
        
         const expenses=await Expenses.find({'userId':req.user});
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
    const creating=await new Expense({
        ammount:ammount,
        description:description,
        category:category,
        userId:req.user
    });
    creating.save().then(()=>{
        res.status(200).json({success:true,message:'Successfully Added Expenses'});
    })
    
    
    }catch(err){
        console.log(err);
        res.status(505).json({success:false,message:'Something went wrong in POST expenses'})
    }
};

exports.deleteId=async(req,res)=>{
    try{
        const id=req.body.id;
        console.log(id)
        await Expenses.findByIdAndRemove(id);
        res.status(200).json({success:true,message:'Successfully Delted Expensive'});
        
    }catch(err){
        console.log(err);
        res.status(505).json({success:false,message:'Something went wrong in POST expenses'})
    }
};

exports.downloadExpense = async (req,res)=>{
    try{
        const expenses=await Expenses.find({'userId':req.user.id});
    console.log('expenses:--',expenses);
    const userId=req.user.id;
    const strinfyExpenses=JSON.stringify(expenses);
    const filename=`day-to-day-Expense${userId}/${new Date()}.txt`;
    const fileURL=await s3Services.upLoadToS3(strinfyExpenses,filename);
    res.status(200).json({fileURL,success:true});
    }catch(err){
        res.status(500).json({fileURL:'',success:false,err:err});
    }
    
}

