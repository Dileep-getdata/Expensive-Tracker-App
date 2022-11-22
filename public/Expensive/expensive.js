
const token=localStorage.getItem('token'); 
const limit=localStorage.getItem('RowsPerPage');
window.addEventListener('DOMContentLoaded',()=>{
    axios.get(`http://localhost:4050/expenses/getexpenses?page=0&limit=${limit}`,{headers:{'Authentization':token}})
    .then((data)=>{
        displayProducts(data.data.data)      
   
    })
    .catch(err=>{console.log(err)});

    addExpenses();
});

// 
// 
function addExpenses(){
    axios.get('http://localhost:4050/expenses/addExpenses',{headers:{'Authentization':token}})
    .then((response)=>{        
        const listExpenses=response.data.expenses;  
        const ispremium=response.data.ispremiumuser;
        getPaggination(listExpenses);
        if(ispremium){
            isPremium(isPremium); 
            // dayToDayExpense(listExpenses);       
        }
    })
    .catch(err=>console.log(err));

    document.getElementById('no_rows').value=localStorage.getItem('RowsPerPage');
    console.log(localStorage.getItem('RowsPerPage'));

}
// 
// Display list of expenses
function displayProducts(listExpenses){
    const htmlList=document.getElementById('list-Expenses');
    const totalEntery=document.getElementById('totalExpense');
    let totalExpense=0;

    let expensesOrder=``;
    listExpenses.forEach(eachExpenses=>{     
        if(eachExpenses.category==='Income'){
            // totalExpense = totalExpense- parseInt(eachExpenses.ammount);
            console.log(eachExpenses.category,eachExpenses.ammount);
        }else{
            // console.log('No income ');
            expensesOrder += `<li class="expeseList" ">            
        <h4>${eachExpenses.ammount} - ${eachExpenses.description} - ${eachExpenses.category}</h4>            
        <button onclick="expensiveDlt(${eachExpenses.id})" >Delete</button>           
        </li>`
            totalExpense +=parseInt(eachExpenses.ammount);
        }          
         
                   
    })
    htmlList.innerHTML = expensesOrder; 
    totalEntery.innerText=totalExpense;
}


// Pagination data
const pag=document.querySelector('.pagination');
function getPaggination(listExpenses){    
        const lengthOfList=listExpenses.length;
        const pageLimt=limit;
        let j=Math.trunc(lengthOfList/pageLimt)
        // let c=0,cc=1;
        if(lengthOfList%pageLimt==0){
            for(i=0;i<j;i++){
                pag.innerHTML +=`<button class='pageBtn' id='?page=${i}&limit=${pageLimt}'>${i+1}</button>`
            }
        }else{
            j=j+1;
            for(i=0;i<j;i++){
                pag.innerHTML
                += `<button class='pageBtn' id='?page=${i}&limit=${pageLimt}'>${i+1}</button>`
            }
        }
}

pag.addEventListener('click',(e)=>{
    let idBtn=e.target.id;
    axios.get(`http://localhost:4050/expenses/getexpenses${idBtn}`,{headers:{'Authentization':token}})
    .then((data)=>{   
        // console.log(data.data.data);     
        displayProducts(data.data.data)      
   
    })
    .catch(err=>{console.log(err)});
});


// 
// 
function isPremium(result){
    if(result){
    document.getElementById('rzp-button1').style.display='none';
            document.querySelector('.switch').style.display='inline-block';
            document.querySelector('#dayToDay').style.display='flex'
            document.body.classList.toggle('darkMode');
            Leadboard();
    }
}
// 
// 

function dayToDayPage(){
    window.location.href="./day-to-dayExpense.html"
}



// 
// 


// 
// 
const myform=document.getElementById('myform');
myform.addEventListener('submit',(e)=>{
    e.preventDefault();    
    const ammount=document.getElementById('amount');
    const description=document.getElementById('description');
    const category=document.getElementById('category');
    const expensesObj={ammount:ammount.value,description:description.value,category:category.value}
    axios.post('http://localhost:4050/expenses/addExpenses',expensesObj,{headers:{'Authentization':token}})
    .then(response=>{
        
        ammount.value='';
        description.value='';
        category.value='';
    })
    .catch(err=>console.log(err))
});
// 
// 


// 
// 
 function expensiveDlt(id){
    axios.post('http://localhost:4050/expenses/deleteId',{id:id});
    console.log(id);
}
// 
// 

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

function Leadboard(){
    axios.get('http://localhost:4050/expenses/allExpenses',{headers:{'Authentization':token}})
    .then((response)=>{
        let responsLength=response.data.length;
        const leadBoard=document.getElementById('lead-Board');
        var leadBoardData=`<h3>LEAD BOARD</h3><hr>`;
        let userIds={};
        // const sortable
        let arr=[];
        response.data.forEach(data=>{ 
                       
            const Ids=data.userId;            
            axios.post('http://localhost:4050/expenses/userName',{userId:Ids})
            .then(user=>{ 
                if(userIds.hasOwnProperty(user.data.userName)){                    
                    const ammount=parseInt(userIds[user.data.userName]);
                    arr.push(data.ammount);
                    userIds[user.data.userName]=ammount+parseInt(data.ammount);
                }else{ 
                    arr.push(data.ammount);                   
                    userIds[user.data.userName]=parseInt(data.ammount);
                }
                responsLength--;
                if(responsLength<1){
                    const sortable= ObjsortingD(userIds);
                    // console.log(sortable);
                    Object.keys(sortable).forEach(key=>{
                         leadBoardData +=`<li><span>${key}-</span><span>-${sortable[key]}</span></li>`
                        console.log(key,sortable[key]);
                    })
                    leadBoard.innerHTML = leadBoardData;
                }
            })          
        }) 
    })
    .catch(err=>console.log(err))
}

function ObjsortingD(mainObj){
    const sortable = Object.entries(mainObj)
                    .sort(([,a],[,b]) => b-a)
                    .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});
                    return sortable;
}

