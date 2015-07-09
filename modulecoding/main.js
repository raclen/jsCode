/**
 * Created by XIAODI001 on 2015/4/23.
 * 这是一个新代码
 */
require.config({
    paths: {
        'zepto': 'zepto/zepto',
        'parseURL': 'js/parseURL',
        'popup': 'js/popup'
    },
    shim: {
        'zepto': {
            exports: '$'
        }

    }
});
require(['zepto', 'parseURL', 'popup'], function (_z, parseURL, popup) {
    console.log('_z='+_z.trim('ddd  dd '));
    console.log(_z.ajax());
    console.log($.ajax());
    var parseURL = parseURL.parseURL('http://weibo.com/t2275025/home?topnav=1&wvr=5');
    var ourl = parseURL.params();
    console.log(ourl.topnav);
    console.log();
    popup.popup({msg:'success'})
});