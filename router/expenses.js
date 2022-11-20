
const express=require('express');
const router=express.Router();
const expensesController=require('../controllers/expenses')
const userAuthenticate=require('../middleware/auth');

router.get('/allExpenses', userAuthenticate.authenticate, expensesController.getAllUserExpenses);

router.post('/userName',expensesController.postExpensesUser);

router.get('/addExpenses', userAuthenticate.authenticate , expensesController.getExpensesDetails);

router.get('/getexpenses', userAuthenticate.authenticate , expensesController.getExpenses);

router.get('/download',userAuthenticate.authenticate, expensesController.downloadExpense);

router.post('/addExpenses', userAuthenticate.authenticate, expensesController.postExpensesDetails);

router.post('/deleteId',expensesController.deleteId);

module.exports=router;