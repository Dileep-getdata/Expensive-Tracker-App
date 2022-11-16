const Expenses=require('../models/expenses');
const jwt=require('jsonwebtoken');

exports.getExpensesDetails=async(req,res)=>{
    try{
         const expenses=await req.user.getExpenses();
         console.log(expenses);
         res.status(200).json(expenses);

    }catch(err){
        console.log(err);
        res.status(505).json({success:false,message:'Something went wrong in GET expenses'})
    }
    
}

exports.postExpensesDetails=async (req,res,next)=>{
    try{
        const {ammount,description,category}=req.body;
    await Expenses.create({ammount,description,category})
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