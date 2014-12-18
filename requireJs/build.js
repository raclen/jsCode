({
    appDir: './',
    baseUrl: './common',
    dir: './dist',
    modules: [
        {
            name: 'index'
        }
    ],
    fileExclusionRegExp: /^(r|build)\.js$/,
    optimizeCss: 'standard',
    removeCombined: true,
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

})