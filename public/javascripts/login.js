const form = document.querySelector('.login');
const username = document.getElementById('login-user');
const password = document.getElementById('login-pass');



const setError = (element,message) =>{
    const inputControl = element.parentElement;
    const errDisplay = inputControl.querySelector('.error');
    errDisplay.innerText  = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success');
}

const setSuccess = (element) =>{
    const inputControl = element.parentElement;
    const errDisplay = inputControl.querySelector('.error');

    errDisplay.innerText = '';
    errDisplay.classList.add('success');
    errDisplay.classList.remove('error');
}

const validateInputs = () =>{
    const userVal = username.value.trim();
    const passVal = password.value.trim();

    if(userVal===''){
        setError(username,'*Username is Required');
    }
    else
    {
        setSuccess(username);
    }

    if(passVal==='')
    {
        setError(password,'*Password Required');
    }
    else if(passVal.length <8)
    {
        setError(password,'*Password must be 8 characters long')
    }
    else
    {
        setSuccess(password);
    }

}

form.addEventListener('submit',(e)=>{
    validateInputs();
})