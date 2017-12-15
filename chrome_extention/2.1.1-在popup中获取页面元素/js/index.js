/**
 * @Author:  dixiao
 * @Date:   2017/11/27.
 *
 */

    chrome.tabs.getSelected(null, function(tab) {
        chrome.tabs.sendMessage(tab.id, 'Hello', function(response) {
            let titleList = JSON.parse(response);
            let li = '';
            titleList.forEach(function(item,i){
                li += `<li>${item}</li>`;
            })
            document.querySelector('#content').innerHTML = li;
        });
    });
