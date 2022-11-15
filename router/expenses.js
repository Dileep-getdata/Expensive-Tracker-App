
const express=require('express');
const router=express.Router();
const expensesController=require('../controllers/expenses')

router.get('/addExpenses',expensesController.getExpensesDetails);

router.post('/addExpenses',expensesController.postExpensesDetails);

router.post('/deleteId',expensesController.deleteId);

module.exports=router;