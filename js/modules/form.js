

import {modalOpen,modalClose} from './modal';



function form(formSelector, modalShowUp){               

const forms = document.querySelectorAll(formSelector);
forms.forEach(i=>{
    bindPostData(i)
})
const message = {
    loading: 'img/spinner.svg',
    success: 'Success! Thank You',
    failure: 'Something went wrong...'
};
const postData = async (url, data) => {
    const result = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: data
    });
    return await result.json(); 
}
function bindPostData(form){

    form.addEventListener('submit',(e)=>{
        e.preventDefault();

        const statusMessage = document.createElement('img'); 
         statusMessage.src = message.loading;
         statusMessage.style.cssText = `
             display: block;
             margin: 0 auto;
         `;
         form.insertAdjacentElement('afterend',statusMessage);
        const formData = new FormData(form);
        const json = JSON.stringify(Object.fromEntries(formData.entries())); // syntax is a bit different

        postData('http://localhost:3000/requests', json)
        .then(data=>{
            console.log(data);
            showThanksModal(message.success);
            statusMessage.remove();
        })
        .catch(()=>{
            showThanksModal(message.failure);
        })
        .finally(()=>{
            form.reset()
        })

    })
}
function showThanksModal(message){
    const prevModalDialog = document.querySelector('.modal__dialog');
    prevModalDialog.classList.add('hide');
    modalOpen('.modal', modalShowUp); // +
    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal__dialog');
    thanksModal.innerHTML = `
    <div class="modal__content">
        <div data-close class="modal__close">&times;</div>
        <div data-close class="modal__title">${message}</div>
    </div>
    `;
    document.querySelector('.modal').append(thanksModal); 
    setTimeout(()=> {
        thanksModal.remove();
        prevModalDialog.classList.add('show');
        prevModalDialog.classList.remove('hide');
        modalClose('.modal'); // +
    },2000);
}

// fetch('http://localhost:3000/menu',)
fetch('db.json') 
.then(data => data.json())
.then(res => console.log(res));
}
export default form;