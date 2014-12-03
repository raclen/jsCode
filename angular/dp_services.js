/*
 * Author: OUYANGXIAOCHONG
 * Mail: ouyangxiaochong086@pingan.com.cn
 * Date: 2014-11-01
 */
define(['./module'], function (services) {
    'use strict';

    // 百度获取经纬度接口
    var GET_SERVICE_IP_API = 'http://api.map.baidu.com/location/ip?ak=F454f8a5efe5e577997931cc01de3974&coor=bd09ll&_=1413272018297'
    // 获取点评券信息CMS接口
    var GET_SERVICE_DP_API = 'http://mobileappcms.stg2.24money.com/api/act/dianping/st/';
    // 团购订单列表接口
    var GET_SERVICE_DP_DEAL_API = 'http://lpms-cust-p5.dmzstg.pingan.com.cn:4080/mobileapi/m2/mine/ordercentre/searchMobileClientOrders.do';
    // 点评CPS购买接口
    var GET_SERVICE_DP_BUY_API = 'http://lpms-cust-p5.dmzstg.pingan.com.cn:4080/mobileapi/m2/dp/';
    // 电子券接口
    var GET_SERVICE_CODE_BUY_API = 'http://lpms-cust-p5.dmzstg.pingan.com.cn:4080/mobileapi/m2/mine/myVouchers.do';
    // 获取万里通用户信息
    var GET_SERVICE_ACCOUNT_API = 'http://lpms-cust-p5.dmzstg.pingan.com.cn:4080/mobileapi/m2/member/initMemberInfo.do';

    // 通过百度服务器获取用户IP
    services.factory('getServiceIp', ['$resource', function($resource) {
        return $resource(GET_SERVICE_IP_API, {}, {query: {method:'JSONP', params:{callback: 'JSON_CALLBACK'}}});
    }]);

    // 获取用户积分信息
    services.factory('accountService', ['$resource',
        function($resource){
            return $resource(GET_SERVICE_ACCOUNT_API, {}, {
                query: {method:'JSONP', params:{callback: 'JSON_CALLBACK(dp)'}} //, isArray:true
            });
        }]);


    // 监听请求数据loading
    services.factory('dianpingHttpInterceptor', ['$q', '$window', function($q, $window) {
        return function(promise) {
            return promise.then(function (response) {
                $("#spinner").hide();
                return response;
            }, function (response) {
                $("#spinner").hide();
                return $q.reject(response);
            });
        }
    }]);

    // 点评订单统一请求接口
    services.factory('dpBuy', ['$resource',
        function($resource){
            return $resource(GET_SERVICE_DP_BUY_API + ':dpBuyApi', {}, {
                query: {method:'JSONP', params:{dpItemApi:'tobuy.do', callback: 'JSON_CALLBACK(dp)'}} //, isArray:true
            });
        }]);

    // 点评团购订单列表请求接口
    services.factory('dpOrderList', ['$resource',
        function($resource){
            return $resource(GET_SERVICE_DP_DEAL_API, {}, {
                query: {method:'JSONP', params:{callback: 'JSON_CALLBACK(dp)'}} //, isArray:true
            });
        }]);

    // 获取电子卷信息
    services.factory('getCodeInfo', ['$resource',
        function($resource) {
            return $resource(GET_SERVICE_CODE_BUY_API, {}, {
                query: {method:'JSONP', params:{callback: 'JSON_CALLBACK(dp)'}} //, isArray:true
            });
        }]);

    // 点评CMS API统一请求接口
    services.factory('dpServies', ['$resource',
        function($resource){
            return $resource(GET_SERVICE_DP_API + ':dpItemApi', {}, {
                query: {method:'JSONP', params:{dpItemApi:'city_list', callback: 'JSON_CALLBACK'}} //, isArray:true
            });
        }]);

    // 判断登录验证接口
    services.factory('authenticationSvc', ['$location',
        function($location){

            var userInfo = window.sessionStorage.getItem('wlt.user');

            var login = {
                'userInfo': userInfo,
                'gotoLogin': function gotoLogin() {
                    window.location.href = '/wap/login/login.shtml?callback=' + encodeURIComponent($location.absUrl()) + '&source=2';
                }
            }

            return login;

        }]);

    // 获取URL参数集合服务
    services.factory('getParamsService', ['$location',
        function($location){
            var searchObject = $location.search();

            window.sessionStorage.setItem('dpParams', JSON.stringify(searchObject));

            var params = {
                getSource: function() {
                    var _params = JSON.parse(window.sessionStorage.getItem('dpParams'));

                    if(_params.source) {
                        return _params.source;
                    } else {
                        return ''
                    }
                }
            }

            return params

        }]);
//加签验证
    services.factory('signServer', [function () {
        var rsign = {
            sign: function(o) {
                $.extend(o, {
                    sign: (function () {
                        var PRIVATE_KEY = '09FB84B1-D90E-4C14-84DB-DEE924A87B51';

                        var REQ_TIME = 'reqTime',
                            ts;

                        var a = arguments,
                            o = a[0] || {},
                            pk = a.length > 1 ? a[1] : PRIVATE_KEY,
                            pks = [];

                        for (var k in o) {
                            if (k == REQ_TIME) {
                                ts = o[k];
                                continue;
                            }
                            pks.push(k);
                        }
                        pks.sort();

                        var sign = '';
                        for (var i in pks) {
                            var k = pks[i],
                                v = o[k];
                            sign += v + ts;
                        }
                        sign += pk;

                        var oSign = CryptoJS.SHA1(sign);

                        return oSign.toString();
                    })(o)  // 加密
                });
            }
        }

        return rsign;
    }]);


});