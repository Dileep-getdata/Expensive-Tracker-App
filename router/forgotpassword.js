const express = require('express');

const router = express.Router();

const forgotpasController=require('../controllers/forgotpassword')


router.use('/forgotpassword',  forgotpasController.forgotPassword);


module.exports=router;
