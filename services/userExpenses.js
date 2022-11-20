const getExpenses=(req,where)=>{
    console.log('services');
    return req.user.getExpenses(where)
}

module.exports={
    getExpenses,
};