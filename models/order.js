const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const orderSchema=Schema({
    paymentid: {
        type:String},
    orderid: {type:String},
    status: {type:String},
    userId:{type:Schema.Types.ObjectId,required:true,ref:'Users'}
})

module.exports=mongoose.model('Oders',orderSchema);



// const Sequelize = require('sequelize');
// const sequelize = require('../util/database');

// //id, name , password, phone number, role

// const Order = sequelize.define('order', {
//     id: {
//         type: Sequelize.INTEGER,
//         autoIncrement: true,
//         allowNull: false,
//         primaryKey: true
//     },
//     paymentid: Sequelize.STRING,
//     orderid: Sequelize.STRING,
//     status: Sequelize.STRING
// })

// module.exports = Order;