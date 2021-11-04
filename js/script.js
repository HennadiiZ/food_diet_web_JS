'use strict';

document.addEventListener('DOMContentLoaded', ()=>{

    const tabs = require('./modules/tabs'); // no need to write './modules/tabs.js'
    const slider = require('./modules/slider');
    const calculator = require('./modules/calculator');
    const cards = require('./modules/cards');
    const timer = require('./modules/timer');
    const modal = require('./modules/modal');

        tabs();
        slider();
        calculator();
        cards();
        timer();
        modal();


});