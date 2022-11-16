
const express=require('express');
const router=express.Router();
const expensesController=require('../controllers/expenses')
const userAuthenticate=require('../middleware/auth');

router.get('/addExpenses',userAuthenticate.authenticate ,expensesController.getExpensesDetails);

router.post('/addExpenses',expensesController.postExpensesDetails);

router.post('/deleteId',expensesController.deleteId);

module.exports=router;