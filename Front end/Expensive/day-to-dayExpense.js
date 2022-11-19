const token=localStorage.getItem('token'); 
window.addEventListener('DOMContentLoaded',()=>{
    
    addExpenses();
})
function addExpenses(){
    axios.get('http://localhost:4050/expenses/addExpenses',{headers:{'Authentization':token}})
    .then((response)=>{        
        const listExpenses=response.data.expenses;  
        const ispremium=response.data.ispremiumuser; 
        
        
        if(ispremium){
            isPremium(isPremium); 
            dayToDayExpense(listExpenses);      
        }
    })
    .catch(err=>console.log(err));    

}

// 
// 
function dayToDayExpense(listExpenses){
    const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
    let yearlyExpense=0;
    let yearlyIncome=0;
    let yearlySavings=0;
    const yearlyTable=document.getElementById('yearly');

    const dayToDay=document.getElementById('dayToDay');
    
    var leadBoardData=`<tr><th>Date</th><th>Description</th><th>Category</th><th>Income</th><th>Expense</th></tr>`;
    const presentDate=new Date();
    let totalExpense=0;
    let totalIncome=0;
    let savingsM=0;
    document.getElementById('presntMntYer').innerHTML=`${monthNames[presentDate.getMonth()] }-${ presentDate.getFullYear()}`;
   
    
    listExpenses.forEach(eachExpen=>{ 
        const expenseDate=new Date(eachExpen.updatedAt);
        //   Yearly data gather
        if(presentDate.getFullYear()===expenseDate.getFullYear()){
            if(eachExpen.category!=='Income'){
                yearlyExpense += parseInt(eachExpen.ammount);
            }else{
                yearlyIncome += parseInt(eachExpen.ammount);
            }
            
            
        }
        if(presentDate.getMonth()===expenseDate.getMonth()){
            if(eachExpen.category=='Income'){
                totalIncome += parseInt(eachExpen.ammount);
            leadBoardData += `<tr>
            <td>${expenseDate.getDate()}-${expenseDate.getMonth()}-${expenseDate.getFullYear()}</td>
            <td>${eachExpen.description}</td><td>${eachExpen.category}</td><td>${eachExpen.ammount}</td><td></td>
            </tr>`
            }else{
            totalExpense += parseInt(eachExpen.ammount);
            leadBoardData += `<tr>
            <td>${expenseDate.getDate()}-${expenseDate.getMonth()}-${expenseDate.getFullYear()}</td>
            <td>${eachExpen.description}</td><td>${eachExpen.category}</td><td></td><td>${eachExpen.ammount}</td>
            </tr>`
            }
            
            
        }
    })
    dayToDay.innerHTML=leadBoardData;
    savingsM=totalIncome-totalExpense
    dayToDay.innerHTML += `<tr><td></td><td></td><td></td><td style="color:#1ad69e;"><strong>₹ ${totalIncome}</strong></td><td style="color:#e97d7d;"><strong>₹ ${totalExpense}</strong></td></tr>
    <tr><td style="color:#a1b2e9;"><strong>SAVINGS = ₹ ${savingsM}</strong></td></tr>`;

    yearlySavings=yearlyIncome-yearlyExpense;
    yearlyTable.innerHTML =`<tr><th>Month</th><th>Income</th><th>Expense</th><th>Savings</th></tr>
    <tr><td></td><td style="color:#1ad69e;"><strong>₹ ${yearlyIncome}</strong></td><td style="color:#e97d7d;"><strong>₹ ${yearlyExpense}</strong></td><td style="color:#a1b2e9;"><strong>₹ ${yearlySavings}</strong></td></tr>` 
}

function isPremium(result){
    if(result){    
            document.querySelector('.dayToDayC').style.display='flex'
            document.body.classList.toggle('darkMode');
            
    }
}