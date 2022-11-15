const express=require('express');
const app=express();



const dotenv=require('dotenv');
dotenv.config();


const sequelize=require('./util/database');
const bodypraser=require('body-parser');
const userRouter=require('./router/user');
const expensesRouter=require('./router/expenses');
const Users=require('./models/users');
const Expenses=require('./models/expenses');


app.use(express.json());

const cors=require('cors');
app.use(cors());

app.use('/user',userRouter);
app.use('/expenses',expensesRouter);

Expenses.belongsTo(Users);
Users.hasMany(Expenses);

sequelize
// .sync({force:true})
.sync()
.then((result)=>{
    app.listen(4050);
})
.catch((err)=>console.log(err));
