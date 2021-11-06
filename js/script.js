'use strict';

import tabs  from './modules/tabs'; // no need to write './modules/tabs.js'
import slider  from './modules/slider';
import calculator  from './modules/calculator';
import cards  from './modules/cards';
import timer  from './modules/timer';

import modal  from './modules/modal';
import form from './modules/form';
import {modalOpen} from './modules/modal'

document.addEventListener('DOMContentLoaded', ()=>{

    const modalShowUp = setTimeout(()=> modalOpen('.modal', modalShowUp), 9000);

        tabs();
        slider();
        calculator();
        cards();
        timer();
        modal('[data-modal]', '.modal', modalShowUp);
        form('form',modalShowUp);

});