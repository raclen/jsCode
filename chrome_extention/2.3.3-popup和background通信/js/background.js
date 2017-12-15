/**
 * @Author:  dixiao
 * @Date:   2017/11/27.
 *
 */


var number = 10;


chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message == 'render') {
        sendResponse(number);
    }else if(message == 'cut'){
        number--;
        sendResponse('减少操作成功');
    }else if(message == 'add'){
        number++;
        sendResponse('增加操作成功');
    }

});