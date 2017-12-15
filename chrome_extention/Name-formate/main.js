/**
 * @Author:  dixiao
 * @Date:   2016/5/13.
 *
 */
var oText = document.querySelector('#text');
var oResult = document.querySelector('.js_result');

oText.addEventListener('input',function(){

    var str = oText.value;
    var result;
    var p =/\w+([\u4e00-\u9fa5]+)/g;
    var nameList = [];
    while (result = p.exec(str)){
        nameList.push(result[1]);

    }
    oResult.innerText = nameList.join('、');

});

