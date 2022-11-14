const logInForm=document.getElementById('logIn_form');

logInForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    
    const email=e.target.email.value;
    const password=e.target.password.value;
    const logIn_details={
        
        email:email,
        password:password
    };   
        axios.post('http://localhost:4050/user/login',logIn_details)
    .then(response=>{  
        if(response.status==200)  {
            alert('ding');
        }else{
            console.log(response.data); 
            errorSHow(response.data.message); 
        }    
                  
        
    })
    .catch(err=>{
        console.log(err.response.data.message)
        errorSHow(err.response.data.message);
    })
    // console.log(nameI);  
   
    
})
function errorSHow(err){
    const error=document.getElementById('error');
    error.innerHTML=err;
    error.style.color='red';
}
