const Sequelize=require('sequelize');


const sequelize=new Sequelize('expenses','root','VSsd@45337',{
    dialect:'mysql',
    host:'localhost'
});

module.exports=sequelize;