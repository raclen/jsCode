/**
 * Created by XIAODI001 on 2015/4/23.
 * 这是一个新代码
 */
({
    baseUrl: "../",
    name: "main",
    paths: {
        'zepto': 'zepto/zepto',
        'parseURL': 'js/parseURL',
        'popup': 'js/popup'
    },
    shim: {
        'zepto': {
            exports: '$'
        }
    },
    out: "main-built.js"
})