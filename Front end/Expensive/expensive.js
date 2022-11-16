
window.addEventListener('DOMContentLoaded',()=>{

    const token=localStorage.getItem('token');
    
    axios.get('http://localhost:4050/expenses/addExpenses',{headers:{'Authentization':token}})
    .then((response)=>{
        const listExpenses=response.data;
        const htmlList=document.getElementById('list-Expenses');
        listExpenses.forEach(eachExpenses=>{
            const expensesOrder=`<li class="expeseList">
            <p>${localStorage.getItem('Name')}</P>
            <h4>${eachExpenses.ammount} - ${eachExpenses.description} - ${eachExpenses.category}</h4> 
            <form>
            <input type="hidden" id="expensesID" name="expensesID" value=${eachExpenses.id}>
            <button onclick="expensiveDlt(${eachExpenses.id})">Delete</button>
            </form>
            </li>`
            
            
            htmlList.innerHTML += expensesOrder;
            console.log(eachExpenses);
        })
       
    })
    .catch(err=>console.log(err));

    document.getElementById('no_rows').value=localStorage.getItem('RowsPerPage');
    console.log(localStorage.getItem('RowsPerPage'));

});

const myform=document.getElementById('myform');
myform.addEventListener('submit',(e)=>{
    e.preventDefault();
    const ammount=document.getElementById('amount').value;
    const description=document.getElementById('description').value;
    const category=document.getElementById('category').value;
    const expensesObj={ammount:ammount,description:description,category:category};
    axios.post('http://localhost:4050/expenses/addExpenses',expensesObj)
    .then(response=>{
        console.log(response.data.message);
        ammount='';
        description='';
        category='';
    })
    .catch(err=>console.log(err))
});

 function expensiveDlt(id){
    axios.post('http://localhost:4050/expenses/deleteId',{id:id});
    console.log(id);
}

const dropDownForm=document.getElementById('dropDownForm');
dropDownForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    localStorage.setItem('RowsPerPage',e.target.no_rows.value);
    
});