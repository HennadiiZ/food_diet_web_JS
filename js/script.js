'use strict';

import tabs  from './modules/tabs'; // no need to write './modules/tabs.js'
import slider  from './modules/slider';
import calculator  from './modules/calculator';
import cards  from './modules/cards';
import timer  from './modules/timer';
import modal  from './modules/modal';

document.addEventListener('DOMContentLoaded', ()=>{

        tabs();
        slider();
        calculator();
        cards();
        timer();
        modal();

});