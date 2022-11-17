'use strict'

import tabs from './modules/tabs';
import calc from './modules/clac';
import forms from './modules/forms';
import modal from './modules/modal';
import timer from './modules/timer';
import slider from './modules/slider';
import card from './modules/card';


window.addEventListener('DOMContentLoaded', () =>{
    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    calc();
    forms('form');
    modal('[data-modal]', '.modal');
    timer('.timer', '2022-11-19');
    slider({
        container: '.offer__slider',
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner',
        slide:'.offer__slide',
    });
    card();
});