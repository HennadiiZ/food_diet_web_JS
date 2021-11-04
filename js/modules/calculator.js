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

export default calculator;