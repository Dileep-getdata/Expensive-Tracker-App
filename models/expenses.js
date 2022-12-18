const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const expensiveSchema=Schema({
    ammount:{
        type:String,
        required:true        
            },
            description:{
                type:String, 
            },
            category:{
                type:String,
                required:true
            },
            userId:{
                type:Schema.Types.ObjectId,
                required:true,
                ref:'Users'
            }


})
module.exports=mongoose.model('Expenses',expensiveSchema);

// const Sequelize=require('sequelize');

// const sequelize=require('../util/database');

// const Expenses=sequelize.define('expenses',{
//     id:{
//         type:Sequelize.INTEGER,
//         autoIncrement:true,
//         allowNull:false,
//         primaryKey:true

//     },
//     ammount:{
//         type:Sequelize.STRING,
//         allowNull:false

//     },
//     description:{
//         type:Sequelize.STRING,        
        
//     },
//     category:{
//         type:Sequelize.STRING,
//         allowNull:false
//     }

// });
// module.exports=Expenses;