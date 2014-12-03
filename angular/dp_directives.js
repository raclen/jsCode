/*
 * Author: OUYANGXIAOCHONG
 * Mail: ouyangxiaochong086@pingan.com.cn
 * Date: 2014-11-01
 */
define(['./module'], function (directives) {
    'use strict';


    // 用户评论打分
    directives.directive('commentrate', function() {
        return {
            restrict: 'EA',
            replace: true,
            scope: {
                rate: '@rate'
            },
            template: '<span class="user-count" ><i class="icon-imgood"></i>{{rateText}}</span>',
            link: function(scope, element, attrs) {
                switch(scope.rate) {
                    case '3' :
                        scope.rateText = '好';
                        break;
                    case '4' :
                        scope.rateText = '很好';
                        break;
                    case '5' :
                        scope.rateText = '非常好';
                        break;
                    default:
                        $(element[0]).hide();
                        break;
                }
            }
        }
    });


    // 顶部回退bar
    // <div nav navback="true" navtitle="首页" navurl="#city" title="团购券详情"></div>
    // @navback:是否打开回退按钮true/false； @回退按钮标题：navtitle；@回退按钮URL：navurl； @标题：title
    directives.directive('nav', function($window) {
        return {
            restrict: 'AE',
            replace: true,
            scope: {
                navback: '@navback',
                navtitle: '@navtitle',
                navurl: '@navurl',
                title: '@title'
            },
            template: '<div class="top-bar"><a class="btn-back">{{navtitle}}</a>{{title}}</div>',
            link: function(scope, element, attr) {

                if(scope.navback === 'true') {
                    if(scope.navtitle === '返回'){
                        $('.btn-back').on('click', function() {
                            $window.history.back();
                        })
                    } else {
                        $('.btn-back').attr('href', scope.navurl);
                    }
                } else {
                    element.find('a').remove();
                }
            }
        }
    });

    // 搜索入口触发
    directives.directive('entersearch', function($location) {
        return {
            restrict: 'AE',
            replace: true,
            template: '<div class="enter-search" ng-click="gotoSearch()"><input type="text" disabled="disabled" ng-focus="gotoSearch()" placeholder="搜索团购商品，商户" class="s"></div>',
            link: function(scope, element, attr) {
                scope.gotoSearch = function() {
                    $location.path('search')
                }
            }
        }
    });

    // 列表页面搜索
    directives.directive('navsearchlist', function($window) {
        return {
            restrict: 'AE',
            replace: true,
            template: '<div class="search-box"><a class="btn-back fixPosi">返回</a><div entersearch></div></div>',
            link: function(scope, element, attr) {

                $('.btn-back').on('click', function() {
                    $window.history.back();
                })
            }
        }
    });
    // 搜索页面
    directives.directive('navsearch', function($window, $timeout) {
        return {
            restrict: 'AE',
            replace: true,
            template: '<div class="search-box solid"><div class="search-box-bar"  angucomplete id="biz" placeholder="搜索团购商品、商户" pause="100" selectedobject="selectedSearch" url="http://mobileappcms.stg2.24money.com/api/act/dianping/st/search_deal_business?callback=JSON_CALLBACK&query_string=" searchfields="title,deal_id" titlefield="title" businesscount="business_count" minlength="1" inputclass="form-control form-control-small"/><a class="btn-search-cannel">取消</a></div>',
            link: function(scope, element, attr) {
                $timeout(function() {

                    element.find('input')[0].focus();
                }, 400);
                $('.btn-search-cannel').on('click', function() {
                    $window.history.back();
                })
            }
        }
    });

    // 城市选择
    directives.directive('city', function() {
        return {
            restrict: 'AE',
            replace: true,
            templateUrl: './views/directive_city_list.shtml',
            link: function(scope, element, attrs) {
                //变量定义区
                //共用函数区
                var iBase={
                    //document.getElementById
                    Id: function(name){return document.getElementById(name)},
                    //通过class获取元素
                    GetByClass: function(name,tagName,elem){
                        var c=[];
                        var re=new RegExp('(^|\\s)'+name+'(|\\s$)');
                        var e=(elem || document).getElementsByTagName(tagName || '*');
                        for(var i=0; i<e.length; i++){
                            if(re.test(e[i].className)){
                                c.push(e[i]);
                            }
                        }
                        return c;
                    },
                    //获取样式属性
                    AttrStyle: function(elem,attr){
                        if(elem.attr){
                            return elem.style[attr];
                        }else if(elem.currentStyle){
                            return elem.currentStyle[attr];
                        }else if(document.defaultView && document.defaultView.getComputedStyle){
                            attr=attr.replace(/([A-Z])/g,'-$1').toLowerCase();
                            return document.defaultView.getComputedStyle(elem,null).getPropertyValue(attr);
                        }else{
                            return null;
                        }
                    },
                    //获取祖辈元素中符合指定样式的元素
                    Parents: function(elem,name){
                        var r=new RegExp('(^|\\s)'+name+'(|\\s$)');
                        elem=elem.parentNode;
                        if(elem!=null){
                            return r.test(elem.className) ? elem : iBase.Parent(elem,name) || null;
                        }
                    },
                    //取索引值
                    Index: function(cur,obj){
                        for(var i=0; i<obj.length; i++){
                            if(obj[i]==cur){
                                return i;
                            }
                        }
                    }

                }

                //变量定义
                var listBox=iBase.GetByClass('city-box','div');
                var navItem=iBase.Id('cityBox').getElementsByTagName('h4');//此处将jQ区块中的h2也取到了,所以页面会有个小小的错误
                var icoItem=null,boxItem=null,boxDisplay=null,elemIndex=null,elemParent=null;
                //初始化展开第一个
                // for(var i=0; i<listBox.length;i++){
                // iBase.GetByClass('city-list-all','div',listBox[i])[0].style.display='block';
                // listBox[i].getElementsByTagName('span')[0].innerHTML='-';
                // listBox[i].getElementsByTagName('span')[0].className='open';
                // }
                //遍历所有点击项
                for(var i=0; i<navItem.length;i++){
                    navItem[i].onclick=function(){
                        elemParent=iBase.Parents(this,'city-box');//获取当前点击所在区块
                        navItem=elemParent.getElementsByTagName('h4');//获取当前区块下的点击项
                        icoItem=elemParent.getElementsByTagName('span');//获取当前区块下的展开关闭
                        boxItem=iBase.GetByClass('city-list-all','div',elemParent);//获取需要控制的区块
                        elemIndex=iBase.Index(this,navItem);//获取当前点击在当前区块点击项中的索引
                        //切换展开关闭图标
                        // icoItem[elemIndex].innerHTML= icoItem[elemIndex].innerHTML=='-' ? '+' : '-';
                        icoItem[elemIndex].className = icoItem[elemIndex].className == 'colse' ? 'open' : 'colse';

                        if(iBase.AttrStyle(boxItem[elemIndex],'display')=='block'){
                            //控制项展开状态下,隐藏当前,展开其他的第一项
                            //此处有个展开0/1的判断,因为当点击第一个时是不能再展开第一个的
                            boxItem[elemIndex].style.display='none';
                            // if(elemIndex==0){
                            //     boxItem[1].style.display='block';
                            //     // icoItem[1].innerHTML='-';
                            //     icoItem[1].className='colse';
                            // }else{
                            //     boxItem[0].style.display='block'
                            //     // icoItem[0].innerHTML='-';
                            //     icoItem[0].className='colse';
                            // }
                        }else{
                            //控制项展开状态下,展开当前,隐藏其他项
                            boxItem[elemIndex].style.display='block';
                            for(var k=0;k<boxItem.length; k++){
                                if(k!=elemIndex){
                                    boxItem[k].style.display='none';
                                    // icoItem[k].innerHTML='+';
                                    icoItem[k].className='colse';
                                }
                            }
                        }
                    }
                }

            }
        }
    });

    // 星级评比
    directives.directive('rating', function() {
        return {
            restrict: 'AE',
            replace: true,
            scope: {
                point: '@point'
            },
            template: '<span class="rating"><i style="width:{{point * 20}}%"></i></span>'
        }
    })

    // 其他团购
    directives.directive('otherdeal', function() {
        return {
            restrict: 'AE',
            replace: true,
            templateUrl: './views/directive_other_deal.shtml',
            link: function(scope, element, attrs) {
                if(scope.itemOtherDealCount < 3) {
                    $(element.children()[0]).addClass('active');
                    $(element.children()[1]).hide();
                } else {
                    $(element.children()[1]).click(function() {
                        $(element.children()[0]).toggleClass('active');
                        $(this).find('i').toggleClass('active');
                        var _text = $(this).find('.more-text').text();
                        if(_text === '展开') {
                            $(this).find('.more-text').text('关闭')
                        } else {
                            $(this).find('.more-text').text('展开')
                        }
                    })
                }

            }

        }
    })

    // 商户其他团购券
    directives.directive('celldeal', function() {
        return {
            restrict: 'AE',
            replace: true,
            templateUrl: './views/directive_cell_deal.shtml',
            link: function(scope, element, attrs) {
                if(scope.business.deals.length < 3) {
                    $(element.children()[0]).addClass('active');
                    $(element.children()[1]).hide();
                } else {
                    $(element.children()[1]).click(function() {
                        $(element.children()[0]).toggleClass('active');
                        $(this).find('i').toggleClass('active');
                        var _text = $(this).find('.more-text').text();
                        if(_text === '展开') {
                            $(this).find('.more-text').text('关闭')
                        } else {
                            $(this).find('.more-text').text('展开')
                        }
                    })
                }



            }

        }
    })

    // 商户评论
    directives.directive('businesscomment', function() {
        return {
            restrict: 'AE',
            replace: true,
            templateUrl: './views/directive_business_comment.shtml',
            link: function(scope, element, attrs) {
                if(scope.itemOtherDealCount < 2) {
                    $(element.children()[1]).addClass('active');
                    $(element.children()[2]).hide();
                } else {
                    $(element.children()[2]).click(function() {
                        $(element.children()[1]).toggleClass('active');
                        $(this).find('i').toggleClass('active');
                        var _text = $(this).find('.more-text').text();
                        if(_text === '展开') {
                            $(this).find('.more-text').text('关闭')
                        } else {
                            $(this).find('.more-text').text('展开')
                        }
                    })
                }

            }

        }
    })

    // 电子券tab
    directives.directive('snav', function () {
        return {
            restrict: 'AE',
            replace: true,
            templateUrl: './views/directive_s_code.shtml',
            link: function (scope, element, attrs) {
                /*    scope.codeResult(0);
                 var Oli = $('.ecode-list>li');
                 var Olist = $("#list-view>div");
                 Oli.on('click', function () {
                 var index = $(this).index();
                 $(this).addClass('activel').siblings().removeClass('activel');
                 $(this).find('a').addClass('active');
                 $(this).siblings().find('a').removeClass('active');
                 Olist.eq(index).show().siblings().hide();
                 })*/


            }

        }
    })




    // 商户查看地图
    directives.directive('map', function() {
        return {
            restrict: 'AE',
            replace: true,
            template: '<div id="allmap"></div>',
            link: function(scope, element, attrs) {
                $('#allmap').css('height', ($(window).height() - 45) + 'px')
                // 百度地图API功能
                var map = new BMap.Map("allmap");
                map.centerAndZoom(new BMap.Point(scope.geolation.lng, scope.geolation.lat), 14);

                map.addControl(new BMap.ZoomControl());  //添加地图缩放控件
                var marker1 = new BMap.Marker(new BMap.Point(scope.geolation.lng, scope.geolation.lat));  //创建标注
                map.addOverlay(marker1);                 // 将标注添加到地图中
            }

        }
    })

    // popup
    directives.directive('popup', function($timeout) {
        return {
            restrict: 'AE',
            replace: true,
            template: '<div id="popup"  ng-if="popup"><p>{{popup}}</p></div>',
            link: function(scope, element, attrs) {
                $timeout(function(){
                    scope.popup = '';
                },4500)
            }

        }
    })

    // 团购券优惠信息
    directives.directive('promotion', function() {
        return {
            restrict: 'AE',
            replace: true,
            template: '<div class="item-tips"><div class="title"><i class="icon-tips"></i>{{itemDetail.info.promotion_desc}}<i class="icon-ex-down"></i></div><div class="con">{{itemDetail.info.promotion_detail}}</div></div>',
            link: function(scope, element, attr) {
                $(element.children()[0]).click(function() {
                    $(element.children()[1]).toggleClass('active');
                    $(this).find('.icon-ex-down').toggleClass('active');
                })

            }
        }
    });




});