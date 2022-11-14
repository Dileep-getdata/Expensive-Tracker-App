const express=require('express');
const router=express.Router();
const userController=require('../controllers/user')

// router.get('/signup',userController.getSignupDetails);

router.post('/signup',userController.postSignupDetails);

module.exports=router;