/**
 * Created by xiaodi001 on 2015/7/9.
 * 这是一个新代码
 */
require.config({
    shim: {
        'zepto-scroll': {
            deps: ['../js/zepto']
        },
        'SimpleSlideView': {
            deps: ['../js/zepto', '../js/zepto.scroll']
        }
    }
})
require(['../js/zepto', '../js/zepto.scroll', '../js/simpleslideview'], function () {
    $('.wrapper').simpleSlideView({duration: 250});
})