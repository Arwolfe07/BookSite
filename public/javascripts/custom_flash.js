let alertBody = document.querySelector('.cus');

let clsBtn = document.querySelector('.close-btn');



clsBtn.addEventListener('click',()=>{
    alertBody.classList.remove('show');
    alertBody.classList.add('hide');
})

