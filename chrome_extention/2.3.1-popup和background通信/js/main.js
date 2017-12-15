/**
 * @Author:  dixiao
 * @Date:   2017/11/27.
 *
 */

let oAdd = document.querySelector('#add');
let oCut = document.querySelector('#cut');
let oText = document.querySelector('#text');

var number = 10;
oText.value = number;
oAdd.addEventListener('click', function () {
    number++;
    oText.value = number;

})
oCut.addEventListener('click', function () {
    number--;
    oText.value = number;

})

