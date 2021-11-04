function modal(){

    // modal - 6
        const btns = document.querySelectorAll('[data-modal]');
        const modal = document.querySelector('.modal');
        const modalCloseBtn = document.querySelector('[data-close]');
        
        function modalOpen(){
            modal.classList.add('show');
            modal.classList.remove('hide');
            document.body.style.overflow = 'hidden';
            clearInterval(modalShowUp)
        }
        
        function modalClose(){
            modal.classList.add('hide');
            modal.classList.remove('show');
            document.body.style.overflow = '';
        }
        btns.forEach((btn, i)=>{
            btn.addEventListener('click',()=>{
                modalOpen()
            })
        });
        modalCloseBtn.addEventListener('click',()=>{
            modalClose()
        })
        modal.addEventListener('click',(e)=>{
            if(e.target.classList.contains('modal')){
                modalClose()
            }
        })
        document.addEventListener('keydown',(e)=>{
            if(e.code === 'Escape'){
                modalClose()
            }
        });
        const modalShowUp = setTimeout(modalOpen, 9000);
        window.addEventListener('scroll', endScrollShowUp);
        function endScrollShowUp(){
            if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight){
                modalOpen();
                window.removeEventListener('scroll', endScrollShowUp);
            }
        }
        
        // + post form

              
//post form - 7  fetch
const forms = document.querySelectorAll('form');
forms.forEach(i=>{
    bindPostData(i)
})
const message = {
    loading: 'img/spinner.svg',
    success: 'Success! Thank You',
    failure: 'Something went wrong...'
};
// async/ await
const postData = async (url, data) => {
    const result = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: data
    });
    return await result.json(); // it's a promise
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

        // const object = {};
        // formData.forEach((item,i)=>{
        //     object[i] = item;
        // }); // just rewriting
        const json = JSON.stringify(Object.fromEntries(formData.entries())); // syntax is a bit different
        // const obj = {a: 23, b: 50}; // just a silly example
        // console.log(Object.entries(obj)) //[['a', 23], ['b', 50]]

        // const json = JSON.stringify(object);
        // fetch('server.php', {
        //     method: 'POST',
        //     headers: {
        //         'Content-type': 'application/json'
        //     },
        //     body: json
        // }) // this part i have rewrited in function postData  
        postData('http://localhost:3000/requests', json)
        // postData('server.php', JSON.stringify(object))
        //  http://localhost:3000/requests instead of 'server.php'
        // .then(data=> data.text()) - we don't need it anymore
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
    modalOpen();
    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal__dialog');
    thanksModal.innerHTML = `
    <div class="modal__content">
        <div data-close class="modal__close">&times;</div>
        <div data-close class="modal__title">${message}</div>
    </div>
    `;
    document.querySelector('.modal').append(thanksModal); 
    //modal.append(thanksModal); // m version
    setTimeout(()=> {
        thanksModal.remove();
        prevModalDialog.classList.add('show');
        prevModalDialog.classList.remove('hide');
        modalClose();
    },2000);
}

// fetch('db.json',)
// .then(data => data.json())
// .then(res => console.log(res));


// fetch('http://localhost:3000/menu',)
fetch('db.json')  // ЭРРОР!!
.then(data => data.json())
.then(res => console.log(res));
}




module.exports = modal;