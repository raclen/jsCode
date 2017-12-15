/**
 * @Author:  dixiao
 * @Date:   2017/11/27.
 *
 */
let number = 0;
let timer = setInterval(function(){
    number++;
    if(number===100){
        clearInterval(timer);
    }
    //设置Badge
    chrome.browserAction.setBadgeBackgroundColor({color: '#1ab394'});
    chrome.browserAction.setBadgeText({text: ''+number});
},1000)
