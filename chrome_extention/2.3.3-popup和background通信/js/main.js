/**
 * @Author:  dixiao
 * @Date:   2017/11/27.
 *
 */

let oAdd = document.querySelector('#add');
let oCut = document.querySelector('#cut');
let oText = document.querySelector('#text');

function render() {
    chrome.runtime.sendMessage('render', function (response) {
        oText.value = response;
    });
}

render();

function sendMessage() {
    let type = this.dataset.type;
    chrome.runtime.sendMessage(type, function (response) {
        console.log(response)
    });
    render();
}

oAdd.addEventListener('click', function () {
    sendMessage.call(this);

})
oCut.addEventListener('click', function () {
    sendMessage.call(this);

})

