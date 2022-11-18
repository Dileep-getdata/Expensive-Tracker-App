const Expenses=require('../models/expenses');
const User=require('../models/users');
const jwt=require('jsonwebtoken');



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