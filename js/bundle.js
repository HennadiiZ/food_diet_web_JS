/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calculator.js":
/*!**********************************!*\
  !*** ./js/modules/calculator.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calculator(){
    // calculator - 3
    const result = document.querySelector('.calculator__result span');
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
}

// module.exports = calculator;

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calculator);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function cards(){
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
        const result = await fetch(url); // ЭРРОР!!! fetch('db.json') 
    
        if(!result.ok){
            throw new Error(`Could not fetch ${url}, status: ${result.status}`);
        }
        return await result.json(); // it's a promise
    };
    
    // getResource('http://localhost:3000/menu')
    getResource('db.json')
    .then(data => {
        // data.forEach( ({img, altimg, title, descr, price})=>{
        //     // new Cards(obj.img, obj.altimg, obj.title, obj.descr, obj.price).render() - it's very long, so we need Destructuring
        //     new Cards(img, altimg, title, descr, price, '.cards__wrapper').render();
        // });
        data["menu"].forEach( ({img, altimg, title, descr, price})=>{
            // new Cards(obj.img, obj.altimg, obj.title, obj.descr, obj.price).render() - it's very long, so we need Destructuring
            new Cards(img, altimg, title, descr, price, '.cards__wrapper').render();
        });
    });
};
    
// module.exports = cards;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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




// module.exports = modal;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);

/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider(){
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
}
    
// module.exports = slider;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// const { module } = require("process");

function tabs(){
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
    tabsParent.addEventListener('click', (e)=>{
            
        if(e.target.classList.contains('tabheader__item')){
            tabs.forEach((item,i)=>{
               
                if(e.target == item){   
                    hideTabContent();
                    showTabContent(i)
                }    
            });
        }
    });
}

// module.exports = tabs;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer(){

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
}
// module.exports = timer;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_calculator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/calculator */ "./js/modules/calculator.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");


 // no need to write './modules/tabs.js'






document.addEventListener('DOMContentLoaded', ()=>{

        (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])();
        (0,_modules_slider__WEBPACK_IMPORTED_MODULE_1__["default"])();
        (0,_modules_calculator__WEBPACK_IMPORTED_MODULE_2__["default"])();
        (0,_modules_cards__WEBPACK_IMPORTED_MODULE_3__["default"])();
        (0,_modules_timer__WEBPACK_IMPORTED_MODULE_4__["default"])();
        (0,_modules_modal__WEBPACK_IMPORTED_MODULE_5__["default"])();

});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map