/**
 * Created by XIAODI001 on 2015/4/2.
 * 这是一个新代码
 */
var jquery = require('./jquery-latest.js')
// var app = require('./app.js');
 require('../css/style.scss');
require('../css/main.css');
var Zepto = require('./zepto.js');
console.log(Zepto.trim)
// console.log(app.get())
console.log(jquery.ajax);
var loadlazy = require("bundle?lazy!./lazy.js");

// 只有在调用load的时候才会真正加载
jquery('.test').on('click',function(){
    loadlazy(function(m) {
        console.log(m.get())

    });
})
