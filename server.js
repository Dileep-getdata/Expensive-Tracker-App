const fs=require('fs');
const path=require('path');
const https=require('https');

const express=require('express');
const helmet=require('helmet');
const compression=require('compression');
const morgan=require('morgan');

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

const accesLoggnigFile=fs.createWriteStream(path.join(__dirname,'access.log'),{flags:'a'});

app.use(express.json());
app.use(helmet());
app.use(compression());
app.use(morgan('combined',{stream:accesLoggnigFile}));
// const privatekey=fs.readFileSync('server.key');
// const certificate=fs.readFileSync('server.cert');

const cors=require('cors');
app.use(cors());

app.use('/user',userRouter);
app.use('/expenses',expensesRouter);
app.use('/purchase',paymentRouter);
app.use('/password',forgotPassRouter);

// app.use('/',(req,res)=>{
//     res.sendFile(path.join(__dirname,`Frontend/${req.url}`));
// })

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
    // https.createServer({key:privatekey,cert:certificate},app)
    app.listen(4050);
})
.catch((err)=>console.log(err));
