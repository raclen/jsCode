/**
 * @Author:  dixiao
 * @Date:   2017/11/28.
 *
 */
chrome.contextMenus.create({
    'type':'normal',
    'title':'查找相关玩乐产品',
    'contexts':['selection'],
    'id':'ttd',
    'onclick':search
});

function search(info, tab){
    var url = 'http://huodong.ctrip.com/activity/search/?keyword='+info.selectionText ;
    window.open(url, '_blank');
}

chrome.runtime.onMessage.addListener(function(obj, sender, sendResponse){
    chrome.contextMenus.update('ttd',{
        'title':`查找"${obj.keyword}"相关产品`
    });
});