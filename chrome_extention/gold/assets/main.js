var QbUrl = 'https://www.g-banker.com/price/query';
var isPopup = false;
var now_price = 0;
window.onload = function () {
    requestData('queryFlag=3', handleQbResponse);
}
setInterval(function () {
    requestData('queryFlag=3', handleQbResponse);

}, 1000);

//当前价格
function requestData(parm, callback) {
    fetch(QbUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: parm
    }).then(function (res) {
        if (res.ok) {
            res.json().then(function (data) {
                callback && callback(data);
            });
        }

    }, function (e) {
        alert("Error submitting form!");
    });
}


//获取黄金钱包的数据
function handleQbResponse(res) {
    var realtime_price = '';
    if (res.success === 'true') {
        realtime_price = (res.data.realtime_price / 100).toFixed(2);

        //设置弹窗
        isPopup &&popup(realtime_price);
        now_price = realtime_price;
        //设置副标题
        chrome.browserAction.setTitle({title: realtime_price});

        //设置Badge
        chrome.browserAction.setBadgeBackgroundColor({color: '#1ab394'});
        chrome.browserAction.setBadgeText({text: realtime_price.split('.')[0]});
    }





}

function popup(price) {

    var min_value = window.localStorage.getItem('min.value'),
        max_value = window.localStorage.getItem('max.value');

    var text = '', _price = '';
    if (Number(price) <= Number(min_value) && min_value !== '-1' && min_value !== '') {
        text = '下跌';
        _price = min_value;
    } else if (Number(price) >= Number(max_value) && max_value !== '-1' && max_value !== '') {
        text = '上涨';
        _price = max_value;
    }
    if (!text) {
        return;
    }
    isPopup = false;
    window.localStorage.setItem('min.value','');
    window.localStorage.setItem('max.value','');
    var notification = chrome.notifications.create('111', {
        type: 'basic',
        iconUrl: 'assets/48.png',
        title: "Gold 提醒:",
        message: `黄金价格已${text}至${_price}`,
        contextMessage: new Date().toLocaleString(),
        requireInteraction: true
    });

}