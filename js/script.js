'use strict';

document.addEventListener('DOMContentLoaded', ()=>{
// tabs - 1
const tabs = document.querySelectorAll('.tabheader__item');
const tabsParent = document.querySelector('.tabcontainer');
const tabcontent = document.querySelectorAll('.tabcontent');

function hideTabContent(){
    tabcontent.forEach(item=>{
        item.classList.add('hide');
        item.classList.remove('show', 'fade');
    });

    tabs.forEach(item=>{
        item.classList.remove('tabheader__item_active');
    });    
};

function showTabContent(i = 0){

    tabcontent[i].classList.add('show', 'fade');
    tabcontent[i].classList.remove('hide');
    tabs[i].classList.add('tabheader__item_active');
};
hideTabContent();
showTabContent();

    // simple version
        // tabs.forEach((item,i)=>{
        //     item. addEventListener('click', (e)=>{
        //         hideTabContent();
        //         showTabContent(i);
        //     });
        // });

//delegation
tabsParent.addEventListener('click', (e)=>{
        
    if(e.target.classList.contains('tabheader__item')){
        tabs.forEach((item,i)=>{
           
            if(e.target == item){   
                hideTabContent();
                showTabContent(i)
            }    
        })
    }
})

//slider - 2
const leftSlider = document.querySelector('.current');
const rightSlider = document.querySelector('.total');
const slides = document.querySelectorAll('.offer__slide')

rightSlider.innerHTML = funcTotal(slides.length);
function funcTotal(n){
    return (n >= 0 && n < 10) ? '0' + n : n;
}
let counter = 1;

showSlides(counter)
function showSlides(n){

    (n > slides.length) && (counter = 1);
    (n < 1) && (counter = slides.length);
     
    slides.forEach((item, i)=>{
        item.style.display = 'none';
    })

    slides[counter - 1].style.display = '';
    slides[counter - 1].classList.add('fade');

    leftSlider.innerHTML = funcCurrent(counter);
    function funcCurrent(n){
        return (n >= 0 && n < 10) ? '0' + n : n;
    };
};

rightSlider.addEventListener('click',()=>{
    showSlides(++counter)
});
leftSlider.addEventListener('click',()=>{
    showSlides(--counter)
})




// calculator - 3
const result = document.querySelector('.calculator__result span');
// let sex = female;
// let height;
// let weight;
// let age; 
// let ratio = 1.375;
let sex, height, weight, age, ratio;

if(localStorage.getItem('sex')){
    sex = localStorage.getItem('sex');
}else{
    sex = 'female';
    localStorage.setItem('sex', 'female');
};
if(localStorage.getItem('ratio')){
    ratio = localStorage.getItem('ratio');
}else{
    ratio = 1.375;
    localStorage.setItem('ratio', 1.375);
};

function initLocalSettings(selector, activeClass){
    const elements = document.querySelectorAll(selector);
    elements.forEach(elem=>{
        elem.classList.remove(activeClass);
        if(elem.getAttribute('id') === localStorage.getItem('sex')){
            elem.classList.add(activeClass);    
        };
        if(elem.getAttribute('data-ratio') === localStorage.getItem('ratio')){
            elem.classList.add(activeClass);    
        };
    });
};
initLocalSettings('#gender button','calculating__choose-item_active');
initLocalSettings('.calculating__choose_big button','calculating__choose-item_active');

function calcTotal(){
    if(!sex || !height || !weight || !age || !ratio){
        result.innerHTML = '______';
        return;
    }

    if(sex === 'female'){
        result.innerHTML = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
    }else{
        result.innerHTML = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
    }
}
calcTotal()

function getStaticInfo(selector, activeClass){
    const buttons = document.querySelectorAll(`${selector} button`);
    
    buttons.forEach((item,index)=>{
        item.addEventListener('click',(e)=>{
            if(e.target.getAttribute('data-ratio')){
                
                ratio = +e.target.getAttribute('data-ratio');
            }else{
                sex = e.target.getAttribute('id');
            }

            buttons.forEach((item,index)=>{
                item.classList.remove(activeClass);
            })

            e.target.classList.add(activeClass);
            calcTotal();
        })
       
    })
};
getStaticInfo('.calculating__choose_small', 'calculating__choose-item_active');
getStaticInfo('.calculating__choose_big', 'calculating__choose-item_active');

function dynamic(selector){
    const input = document.querySelector(selector);
    input.addEventListener('input', (e)=>{
                if(input.value.match(/\D/g)){
                    input.style.border = '1px solid red'
                }else{
                    input.style.border = 'none';
                }
        switch(input.getAttribute('id')){
            case 'height':
                height = input.value;
                break;
            case 'weight':
                weight = input.value;
                break;  
            case 'age':
                age = input.value;
                break;  
        }
        calcTotal();
    });    
}
dynamic('#height');
dynamic('#weight');
dynamic('#age');


// formula
//(447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio;
//(88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio;

//cards - 4
class Cards{
    constructor(src, alt, title, description, price, parentSelector){
        this.src = src;
        this.alt = alt;
        this.title = title;
        this.description = description;
        this.price = price;
        this.cardsWrapper = document.querySelector(parentSelector);
        this.ukrCurrency = 27;
        this.moneyRate()
    }

    moneyRate =()=>{
        this.price = this.price * this.ukrCurrency;
    };

    render(){
        const div = document.createElement('div');
        div.innerHTML = `
            <div class="card__one menu__item">
                <div class="card__image">
                    <img src="${this.src}" alt="${this.alt}" >
                </div>
                <div class="card__info">
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <p class="menu__item-descr">${this.description}</p>
                </div>
                <div class="card__price menu__item-price">
                    <p class="menu__item-cost">price: </p>
                    <p class="menu__item-total"><span>${this.price}</span> UAH/day</p>
                </div>
            </div>    
        `;
        this.cardsWrapper.append(div);
    }
}
const getResource = async (url) => {
    const result = await fetch(url);

    if(!result.ok){
        throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }
    return await result.json(); // it's a promise
};

getResource('http://localhost:3000/menu')
.then(data => {
    data.forEach( ({img, altimg, title, descr, price})=>{
        // new Cards(obj.img, obj.altimg, obj.title, obj.descr, obj.price).render() - it's very long, so we need Destructuring
        new Cards(img, altimg, title, descr, price, '.cards__wrapper').render();
    });
});

// new Cards( - now i don't need it anymore ( I had 3 pieces)
//     'img/tabs/vegy.jpg',
//     'vegy',
//     'Меню "Фитнес"',
//     'Меню "Фитнес" - это новы',
//     9,
//     '.cards__wrapper'
// ).render();



// timer - 5
const deadline = '2021-12-31';
 function getTimeRemaining(endtime){
     const t = Date.parse(endtime) - Date.parse(new Date);
     const days = Math.floor(t/(1000 * 60 * 60 * 24));
     const hours = Math.floor(t/(1000 * 60 * 60 )%24);
     const minutes = Math.floor(t/(1000 * 60 )%60);
     const seconds = Math.floor(t/(1000)%60);
     return {
         'total': t,
         'days' : days,
         'hours' : hours,
         'minutes': minutes,
         'seconds' : seconds
     }
 }
 getTimeRemaining(deadline);
 function setClock(selector, endtime){
     const timer = document.querySelector(selector);
     const days = timer.querySelector('#days');
     const hours = timer.querySelector('#hours');
     const minutes = timer.querySelector('#minutes');
     const seconds = timer.querySelector('#seconds');

     const timeInterval = setInterval(func, 1000);
     func();
     function func(){

         const t = getTimeRemaining(endtime);
         days.innerHTML = addZero(t.days); 
         hours.innerHTML = addZero(t.hours);  
         minutes.innerHTML = addZero(t.minutes);  
         seconds.innerHTML = addZero(t.seconds); 

         if(t.total <= 0){
             clearInterval(timeInterval);
         }
     }

 }
 setClock('.timer', deadline);

 function addZero(num){

     if(num >= 0 && num < 10){
         return `0${num}`
     }else{
         return num
     }
 }

// modal - 6
const btns = document.querySelectorAll('[data-modal]');
const modal = document.querySelector('.modal');
const modalCloseBtn = document.querySelector('[data-close]');

function modalOpen(){
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';
    // clearInterval(modalShowUp)
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
// const modalShowUp = setTimeout(modalOpen, 9000);
// window.addEventListener('scroll', endScrollShowUp);
// function endScrollShowUp(){
//     if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight){
//         modalOpen();
//         window.removeEventListener('scroll', endScrollShowUp);
//     }
// }


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


fetch('http://localhost:3000/menu',)
.then(data => data.json())
.then(res => console.log(res));
























});