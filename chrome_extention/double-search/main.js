/**
 * @Author:  dixiao
 * @Date:   2016/5/13.
 *
 */
var searchList = {
    "google": "https://www.google.com/#q=",
    "baidu": "https://www.baidu.com/s?wd=",
    "bing": "http://cn.bing.com/search?q=",
    "sougou": "http://www.sogou.com/web?query=",
    "zhihu": "https://www.zhihu.com/search?q=",
    "mdn": "https://developer.mozilla.org/zh-CN/search?q=",
    "github": "https://github.com/search?utf8=✓&q=",
    "ctrip": "http://huodong.ctrip.com/activity/search/?keyword="
}

var search_name = JSON.parse(window.localStorage.getItem('search.name') || '["google", "baidu"]');
window.localStorage.setItem('search.name', JSON.stringify(search_name));
$.each(search_name, function (index, value) {
    $('[name="'+value+'"]').prop('checked',true);
});
$('.search_btn').on('keyup', function (e) {
    if (e.keyCode == '13') {
        var val = encodeURIComponent($(this).val());
        var name = JSON.parse(window.localStorage.getItem('search.name'))
        $.each(name, function (index, value) {
            var search_host = searchList[value];
            window.open(search_host + val);
        });

    }

})
$('.set').on('click', function () {
    var that = $(this);
    $('.right').show();
    $('footer').hide();
})
$('.back').on('click', function () {
    $('.right').hide();
    $('footer').show();
})
$('.submit').on('click', function () {
    var s_name = $('.magic-checkbox:checked').map(function () {
        return $(this).attr('name');
    }).get();
    window.localStorage.removeItem('search.name');
    window.localStorage.setItem('search.name', JSON.stringify(s_name));
    $('.back').click();
})
