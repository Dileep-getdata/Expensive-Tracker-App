
const Razorpay = require('razorpay');
const Order = require('../models/order')


const purchasepremium =async (req, res) => {
    try {
        var rzp = new Razorpay({
            key_id: process.env.PREMIMUM_KEYID,
            key_secret: process.env.PREMIMUM_KEYSECRET
        })
        const amount = 2500;

        rzp.orders.create({amount, currency: "INR"}, (err, order) => {
            if(err) {
                throw new Error(err);
            }
            const orderCreate=new Order({ 
                orderid: order.id, 
                status: 'PENDING',
                userId:req.user,
            });
                orderCreate.save()
                .then(() => {
                return res.status(201).json({ order, key_id : rzp.key_id});

            }).catch(err => {
                throw new Error(err)
            })
        })
    } catch(err){
        console.log(err);
        res.status(403).json({ message: 'Sometghing went wrong', error: err})
    }
}

 const updateTransactionStatus = (req, res ) => {
    try {
        const { payment_id, order_id} = req.body;
        Order.find({'orderId' : order_id})
        .then(order => {
            console.log('order:-',order)
            order.paymentid=payment_id;
            order.orderid=order_id;
            order.status='SUCCESSFUL';
            order.userId=req.user;
            order.save()
            .then(() => {
                req.user.update({ispremiumuser: true})
                return res.status(202).json({sucess: true, message: "Transaction Successful"});
            }).catch((err)=> {
                throw new Error(err);
            })
        }).catch(err => {
            throw new Error(err);
        })
    } catch (err) {
        console.log(err);
        res.status(403).json({ errpr: err, message: 'Sometghing went wrong' })

    }
}

module.exports = {
    purchasepremium,
    updateTransactionStatus
}