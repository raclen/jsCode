/**
 * @Author:  dixiao
 * @Date:   2017/11/27.
 *
 */

let oAdd = document.querySelector('#add');
let oCut = document.querySelector('#cut');
let oText = document.querySelector('#text');

//在popup.js 中调用 backgourd.js 中的变量和方法，很重要
let bg = chrome.extension.getBackgroundPage();

oText.value = bg.number;

oAdd.addEventListener('click',function(){
    bg.number++;
    oText.value = bg.number;

})
oCut.addEventListener('click',function(){
    bg.number--;
    oText.value = bg.number;

})

