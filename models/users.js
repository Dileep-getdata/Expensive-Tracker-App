const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const userSchema=Schema({

    userName:{
                type:String,
                required:true
        
            },
            email:{
                type:String,
                unique:true,
                required:true
            },
            password:{
                type:String,
                required:true
            },
            ispremiumuser: {type:Boolean},
})
module.exports=mongoose.model('Users',userSchema);

// const Sequelize=require('sequelize');

// const sequelize=require('../util/database');

// const Users=sequelize.define('users',{
//     id:{
//         type:Sequelize.INTEGER,
//         autoIncrement:true,
//         allowNull:false,
//         primaryKey:true

//     },
//     userName:{
//         type:Sequelize.STRING,
//         allowNull:false

//     },
//     email:{
//         type:Sequelize.STRING,
//         unique:true,
//         allowNull:false
//     },
//     password:{
//         type:Sequelize.STRING,
//         allowNull:false
//     },
//     ispremiumuser: Sequelize.BOOLEAN,

// });
// module.exports=Users;