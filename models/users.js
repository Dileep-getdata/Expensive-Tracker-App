const Sequelize=require('sequelize');

const sequelize=require('../util/database');

const Users=sequelize.define('users',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true

    },
    userName:{
        type:Sequelize.STRING,
        allowNull:false

    },
    email:{
        type:Sequelize.STRING,
        unique:true,
        allowNull:false
    },
    password:{
        type:Sequelize.STRING,
        allowNull:false
    },
    ispremiumuser: Sequelize.BOOLEAN,

});
module.exports=Users;