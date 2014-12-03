
/*
 * Author: OUYANGXIAOCHONG
 * Mail: ouyangxiaochong086@pingan.com.cn
 * Date: 2014-11-01
 */
define(['./module'], function (filters) {
    'use strict';

    // 格式化人民币
    filters.filter('rmb', function() {
        return function(rmb) {
            return '￥' + rmb;
        }
    });

    // 折扣率计算
    filters.filter('off', function() {
        return function(off) {
            return off.toFixed(1);
        }
    });

    // 格式化API传回团购券详情内容的换行符
    filters.filter('huanhang', function() {
        return function(huanhang) {
            if(huanhang) {

                var keyword01 = '购买须知';
                var keyword02 = '团购详情';
                var keyword03 = '有效期';
                var keyword04 = '预约信息';
                var keyword05 = '规则提醒';
                var keyword06 = '温馨提示';
                var re1 = huanhang.replace(new RegExp("(?![^&;]+;)(?!<[^<>]*)("+keyword01.replace(/([\^\$\(\)\[\]\{\}\*\.\+\?\|\\])/gi,"\\$1")+")(?![^<>]*>)(?![^&;]+;)","gi"),"<div class=\"item-title-hidden\" >$1</div>");
                var re2 = re1.replace(new RegExp("(?![^&;]+;)(?!<[^<>]*)("+keyword02.replace(/([\^\$\(\)\[\]\{\}\*\.\+\?\|\\])/gi,"\\$1")+")(?![^<>]*>)(?![^&;]+;)","gi"),"<div class=\"item-title-hidden\" >$1</div>");
                var re3 = re2.replace(new RegExp("(?![^&;]+;)(?!<[^<>]*)("+keyword03.replace(/([\^\$\(\)\[\]\{\}\*\.\+\?\|\\])/gi,"\\$1")+")(?![^<>]*>)(?![^&;]+;)","gi"),"<div class=\"item-title-sub\" >$1</div>");
                var re4 = re3.replace(new RegExp("(?![^&;]+;)(?!<[^<>]*)("+keyword04.replace(/([\^\$\(\)\[\]\{\}\*\.\+\?\|\\])/gi,"\\$1")+")(?![^<>]*>)(?![^&;]+;)","gi"),"<div class=\"item-title-sub\" >$1</div>");
                var re5 = re4.replace(new RegExp("(?![^&;]+;)(?!<[^<>]*)("+keyword05.replace(/([\^\$\(\)\[\]\{\}\*\.\+\?\|\\])/gi,"\\$1")+")(?![^<>]*>)(?![^&;]+;)","gi"),"<div class=\"item-title-sub\" >$1</div>");
                var re6 = re5.replace(new RegExp("(?![^&;]+;)(?!<[^<>]*)("+keyword06.replace(/([\^\$\(\)\[\]\{\}\*\.\+\?\|\\])/gi,"\\$1")+")(?![^<>]*>)(?![^&;]+;)","gi"),"<div class=\"item-title-sub\" >$1</div>");
                return re6.replace(/\n/g, "<br />"); //.replace(/\n/g, "<br />")

            }

        }
    })
    // 日期格式化
    filters.filter('calender', function () {
        return function (c) {

            var w = c.replace('-', '/').replace('-', '/');
            var data = new Date(w);
            var year = data.getFullYear(),
                month = data.getMonth() + 1,
                d = data.getDate();
            return year + '年' + month + '月' + d + '日';
        }
    });
    // 日期相减算过期时间
    filters.filter('datasub', function () {
        return function (d) {
            var w = d.replace('-', '/').replace('-', '/');
            var time = Date.parse(new Date());
            var lasttime = Date.parse(w);
            var day = parseInt((lasttime - time) / (1000 * 60 * 60 * 24));
            return day;

        }
    });
    //文字空格4443
    filters.filter('blank', function () {
        return function (f) {
            var f2=f+'';
            return f2.replace(/(\d{4})/g, '$1 ').replace(/\s*$/, '');
        }
    })
    //文字空格3444
    filters.filter('dpnumber', function () {
        return function (f) {
            var f2=f+'';
            return f2.split('').reverse().join('').replace(/(\d{4})/g, '$1 ').replace(/\s*$/, '').split('').reverse().join('');
        }
    })


});