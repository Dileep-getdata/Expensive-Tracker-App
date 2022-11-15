const express=require('express');
const app=express();



const dotenv=require('dotenv');
dotenv.config();


const sequelize=require('./util/database');
const bodypraser=require('body-parser');
const userRouter=require('./router/user');


app.use(express.json());

const cors=require('cors');
app.use(cors());

app.use('/user',userRouter);


sequelize
// .sync({force:true})
.sync()
.then((result)=>{
    app.listen(4050);
})
.catch((err)=>console.log(err));
