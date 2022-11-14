const signupForm=document.getElementById('signUp_form');

signupForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const nameI=e.target.name.value;
    const email=e.target.email.value;
    const password=e.target.password.value;
    let signup_details={
        name:nameI,
        email:email,
        password:password
    };
    axios.post('http://localhost:4050/user/signup',signup_details)
    .then()
    .catch()
    console.log(nameI);
})