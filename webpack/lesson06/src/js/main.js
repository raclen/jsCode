/**
 * Created by XIAODI001 on 2015/4/2.
 * 这是一个新代码
 */

require('../css/style.scss');
require('../css/main.css');
var jquery = require('./jquery-latest.js');
var app = require('./app.js');
var Zepto = require('./zepto.js');
var base = require('./base.js');
base.name = '八戒';
console.log(Zepto.trim);
console.log(app.get());

console.log(jquery.ajax);


//第一个lazy表示延迟加载，第二个是模块的名字（不写打包出来的没名字）
var loadlazy = require("bundle?lazy&name=lazy!./lazy.js");

// 只有在调用load的时候才会真正加载
jquery('.test').on('click',function(){
    loadlazy(function(m) {
        console.log(m.get())

    });
});

function htmlTpl(tpl, data) {
    return tpl.replace(/{{(\w+)}}/g, function() {
        return data[arguments[1]];
    });

}
var infoTpl = require('../tpl/info.html');
var data = {
    name: "<h3>你好2221</h3>",
    address: 'shanghai.'
}
$('#test_tpl').html(htmlTpl(infoTpl,data));
