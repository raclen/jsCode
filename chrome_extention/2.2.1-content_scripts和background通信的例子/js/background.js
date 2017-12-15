/**
 * @Author:  dixiao
 * @Date:   2017/11/27.
 *
 */

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message == 'Hello') {
        sendResponse('我来自backgroung_scripts');
    }
});