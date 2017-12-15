/**
 * @Author:  dixiao
 * @Date:   2017/11/28.
 *
 */
window.onmouseup = function(){
    var selection = window.getSelection();
    if(selection.anchorOffset != selection.extentOffset){
        chrome.runtime.sendMessage({keyword:selection.toString()});
    }
}