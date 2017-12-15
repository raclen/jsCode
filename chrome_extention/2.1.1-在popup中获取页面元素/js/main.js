/**
 * @Author:  dixiao
 * @Date:   2017/11/27.
 *
 */
function getTitle() {
    var aTitle = document.querySelectorAll('.search_ticket_caption .title');
    var titleList = [];
    [].forEach.call(aTitle, function (item, i) {
        titleList.push(item.innerText);
    })
    return JSON.stringify(titleList)
}

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message == 'Hello') {
        sendResponse(getTitle());
    }
});