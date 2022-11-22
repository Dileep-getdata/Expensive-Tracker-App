{/* <script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.21.1/axios.min.js" integrity="sha512-bZS47S7sPOxkjU/4Bt0zrhEtWx0y0CRkhEp8IckzK+ltifIIE9EMIMTuT/mEzoIMewUINruDBIR/jJnbguonqQ==" crossorigin="anonymous" referrerpolicy="no-referrer" ></script> */}

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
                // console.log(response.data);
                localStorage.setItem('token',response.data.token);                
                errorSHow(response.data.message,'green');
                alert('Ding');  
                window.location.href="../Expensive/expensive.html";       
            }else{
                console.log(response.data); 
                errorSHow(response.data.message); 
            }
        })
        .catch(err=>{
            console.log(err.response.data.message)
            errorSHow(err.response.data.message);
        })
   
   
    
})
function errorSHow(err,color='red'){
    const error=document.getElementById('error');
    const notification=document.createElement('h3');
    notification.innerHTML=err;
    notification.style.color=color;
    error.appendChild(notification);
    setTimeout(()=>{
        notification.remove();
    },3000);
}
