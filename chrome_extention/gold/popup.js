/**
 * @Author:  dixiao
 * @Date:   2017/10/19.
 *
 */
// 先获取background页面
var bg = chrome.extension.getBackgroundPage();
//再在返回的对象上调用background.js 里面的函数
var min_value = window.localStorage.getItem('min.value'),
    max_value = window.localStorage.getItem('max.value');
document.querySelector('#max').value = max_value;
document.querySelector('#min').value = min_value;

document.querySelector('#btn')&&document.querySelector('#btn').addEventListener('click',function(){
    bg.isPopup = true;

    var oMax = document.querySelector('#max'),
        oMin = document.querySelector('#min');
    window.localStorage.setItem('min.value',oMin.value);
    window.localStorage.setItem('max.value',oMax.value);



})



document.querySelector('#now_price').innerHTML = `当前价格:<em style="color:#ff6913 ">${bg.now_price}</em>`;
bg.requestData('queryFlag=2', function(res){
    console.log(res);
    var xdata = [],ydata= [];
    var _priceArr = res.data.priceArray;
    _priceArr.forEach(function(item,i){
        xdata.push(item.date);
        ydata.push((item.price / 100).toFixed(2));
    })
    // 图表实例化------------------
    // srcipt标签式引入
    var myChart = echarts.init(document.getElementById('main'));

    // 过渡---------------------
    myChart.showLoading({
        text: '正在努力的读取数据中...', //loading话术
    });

    // ajax getting data...............
    var min = Math.min(...ydata);
    var max = Math.max(...ydata);

    // ajax callback
    myChart.hideLoading();
    var option = {
        title: {
            text: '单位:元/克'
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: []
        },
        toolbox: {
        },

        dataZoom: {
            show: true,
            realtime: true,
            start: 0,
            end: 100
        },
        xAxis: [{
            type: 'category',
            boundaryGap: false,
            data: xdata
        }],
        yAxis: [{
            type: 'value',
            scale:true//不从0开始
        }],
        series: [{
            showSymbol: false,
            hoverAnimation: false,
            name: '价格',
            type: 'line',
            data:ydata
        }]
    };
    myChart.setOption(option);

});