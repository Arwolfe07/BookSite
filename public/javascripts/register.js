const form = document.querySelector('.sign-up');
const username = document.getElementById('sign-user');
const email = document.getElementById('sign-email');
const password = document.getElementById('sign-pass');


const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errDisplay = inputControl.querySelector('.error');
    errDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success');
}

const setSuccess = element => {
    const inputControl = element.parentElement;
    const errDisplay = inputControl.querySelector('.error');

    errDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
}

const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}


const validateInputs = () => {
    const usernameVal = username.value.trim();
    const emailVal = email.value.trim();
    const passVal = password.value.trim();



    if (usernameVal === '') {
        setError(username, '*Username is Required');
    }
    else {
        setSuccess(username);
    }

    if (emailVal === '') {
        setError(email, '*Email is Required');
    }else if(!isValidEmail(emailVal)){
        setError(email,'*Enter correct Email')
    }
    else {
        setSuccess(email);
    }

    if (passVal === '') {
        setError(password, '*Password Required');
    } else if (passVal.length < 8) {
        setError(password, '*Password must be 8 characters long');
    }
    else {
        setSuccess(password);
    }

}
form.addEventListener('submit', (e) => {
    validateInputs();
});