{/* <script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.21.1/axios.min.js" integrity="sha512-bZS47S7sPOxkjU/4Bt0zrhEtWx0y0CRkhEp8IckzK+ltifIIE9EMIMTuT/mEzoIMewUINruDBIR/jJnbguonqQ==" crossorigin="anonymous" referrerpolicy="no-referrer" ></script> */}

const signupForm=document.getElementById('signUp_form');
console.log(signupForm);
signupForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    console.log('signup:---')
    const nameI=e.target.name.value;
    const email=e.target.email.value;
    const password=e.target.password.value;
    const signup_details={
        name:nameI,
        email:email,
        password:password,
    } 
    axios.post('http://3.89.220.159:4050/user/signup',signup_details)
    .then(response=>{        
            console.log(response.data.message); 
        if(response.status===200){
            MesageShow(response.data.message,'green');
            document.getElementById('name').value='';
            document.getElementById('email').value='';
            document.getElementById('password').value='';
            window.location.href="../Login/login.html";
        }else{
            throw new Error('Aleary exits');
        }       
        
    })
    .catch(err=>{
        console.log(err);
        MesageShow(err.response.data.message,'red');
    })     
   
    
})
function MesageShow(msg,color){    
        const message=document.getElementById('message');
        const notification=document.createElement('h3');
        notification.innerHTML=msg;
        notification.style.color=color;
        message.appendChild(notification);
        setTimeout(()=>{
                 notification.remove() },3000);
    
}