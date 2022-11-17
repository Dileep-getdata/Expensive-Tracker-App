const token=localStorage.getItem('token'); 
window.addEventListener('DOMContentLoaded',()=>{
       
    axios.get('http://localhost:4050/expenses/addExpenses',{headers:{'Authentization':token}})
    .then((response)=>{
        const listExpenses=response.data.expenses;        
        const htmlList=document.getElementById('list-Expenses');
        const totalEntery=document.getElementById('totalExpense');
        let totalExpense=0;
        listExpenses.forEach(eachExpenses=>{
            
            totalExpense +=parseInt(eachExpenses.ammount);
            
            const expensesOrder=`<li class="expeseList" ">            
            <h4>${eachExpenses.ammount} - ${eachExpenses.description} - ${eachExpenses.category}</h4>            
            <button onclick="expensiveDlt(${eachExpenses.id})" >Delete</button>           
            </li>`            
            
            htmlList.innerHTML += expensesOrder;            
        })
        totalEntery.innerText=totalExpense;
        const ispremium=response.data.ispremiumuser;
        console.log(ispremium);
        if(ispremium){
            document.getElementById('rzp-button1').style.display='none';
            document.querySelector('.switch').style.display='inline-block';
            document.body.classList.toggle('darkMode');
            
        //     document.body.style.backgroundColor='black';
        //     document.body.style.color='white';
        }
        
       
    })
    .catch(err=>console.log(err));

    document.getElementById('no_rows').value=localStorage.getItem('RowsPerPage');
    console.log(localStorage.getItem('RowsPerPage'));

});

const myform=document.getElementById('myform');
myform.addEventListener('submit',(e)=>{
    e.preventDefault();
    
    const ammount=document.getElementById('amount');
    const description=document.getElementById('description');
    const category=document.getElementById('category');
    const expensesObj={ammount:ammount.value,description:description.value,category:category.value}
    axios.post('http://localhost:4050/expenses/addExpenses',expensesObj,{headers:{'Authentization':token}})
    .then(response=>{
        // console.log(response.data.message);
        ammount.value='';
        description.value='';
        category.value='';
    })
    .catch(err=>console.log(err))
});

 function expensiveDlt(id){
    axios.post('http://localhost:4050/expenses/deleteId',{id:id});
    console.log(id);
}

// PREMIMUM BUTTTON
document.getElementById('rzp-button1').onclick = async function (e) {
    const response  = await axios.get('http://localhost:4050/purchase/premiummembership', {headers:{'Authentization':token}});
    console.log(response);
    var options =
    {
     "key": response.data.key_id, // Enter the Key ID generated from the Dashboard
     "name": "Test Company",
     "order_id": response.data.order.id, // For one time payment
     "prefill": {
       "name": "Test User",
       
       
     },
     "theme": {
      "color": "#3399cc"
     },
     // This handler function will handle the success payment
     "handler": function (response) {
         console.log('post:',response);
         axios.post('http://localhost:4050/purchase/updatetransactionstatus',{
             order_id: options.order_id,
             payment_id: response.razorpay_payment_id,
         }, {headers:{'Authentization':token}}).then(() => {
             alert('You are a Premium User Now')
         }).catch(() => {
             alert('Something went wrong. Try Again!!!')
         })
     },
  };
  const rzp1 = new Razorpay(options);
  rzp1.open();
  e.preventDefault();

  rzp1.on('payment.failed', function (response){
  alert(response.error.code);
  alert(response.error.description);
  alert(response.error.source);
  alert(response.error.step);
  alert(response.error.reason);
  alert(response.error.metadata.order_id);
  alert(response.error.metadata.payment_id);
 });
}


// 


const dropDownForm=document.getElementById('dropDownForm');
dropDownForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    localStorage.setItem('RowsPerPage',e.target.no_rows.value);
    
});

// Dark Mode
const darkmode=document.querySelector('#darkmode');
darkmode.addEventListener('change',()=>{
    document.body.classList.toggle('darkMode');
})


