/**
 * Created by xiamu on 2014/10/25.
 * 入口文件
 */
require.config({
    //配置路径
    baseUrl:'common/',

    paths:{
        'Zepto':'zepto/zepto.min',
        'fx' : 'zepto/fx',

        //seven
        'seven':'seven/seven',
        'SE.util':'seven/SE.util',
        'popup':'seven/SE.popup',
        //SE.util
        'parseURL':'seven/util/parseURL'
    },
    //配置依赖关系
    shim:{

        'Zepto':{
            exports:'$'//起别名
        },
        'fx' :{
            deps :['Zepto']
        },
        'seven' :{
            deps :['Zepto','fx']
        },
        'SE.util':{
            deps:['seven']
        },
        'popup':{
            deps:['seven']
        },
        'parseURL':{
            deps:['SE.util']
        }
    }
});
define(function(require,exports,module){
    var $ = require('Zepto');
    require('popup');
    require('parseURL');
    //alert("hello");
    $('#btn').click(function(){
        SE.popup({msg:"hello requirejs"});

    })
})