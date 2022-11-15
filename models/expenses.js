const Sequelize=require('sequelize');

const sequelize=require('../util/database');

const Expenses=sequelize.define('expenses',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true

    },
    ammount:{
        type:Sequelize.STRING,
        allowNull:false

    },
    description:{
        type:Sequelize.STRING,        
        
    },
    category:{
        type:Sequelize.STRING,
        allowNull:false
    }

});
module.exports=Expenses;