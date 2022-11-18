const express=require('express');
const app=express();



const dotenv=require('dotenv');
dotenv.config();


const sequelize=require('./util/database');
const bodypraser=require('body-parser');

const userRouter=require('./router/user');
const expensesRouter=require('./router/expenses');
const paymentRouter=require('./router/payment');
const forgotPassRouter=require('./router/forgotpassword');

const Users=require('./models/users');
const Expenses=require('./models/expenses');
const Order=require('./models/order');
const Forgotpass=require('./models/forgotpassword');


app.use(express.json());

const cors=require('cors');
app.use(cors());

app.use('/user',userRouter);
app.use('/expenses',expensesRouter);
app.use('/purchase',paymentRouter);
app.use('/password',forgotPassRouter);

Users.hasMany(Expenses);
Expenses.belongsTo(Users);

Users.hasMany(Order);
Order.belongsTo(Users);

Users.hasMany(Forgotpass);
Forgotpass.belongsTo(Users);

sequelize 
// .sync({force:true})
.sync()
.then((result)=>{
    app.listen(4050);
})
.catch((err)=>console.log(err));
