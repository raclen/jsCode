/**
 * @Author:  dixiao
 * @Date:   2017/11/27.
 *
 */

chrome.runtime.sendMessage('Hello', function(response){
    console.log(response)
});