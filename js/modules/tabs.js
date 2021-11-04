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

module.exports = tabs;