/*
 * Author: OUYANGXIAOCHONG
 * Mail: ouyangxiaochong086@pingan.com.cn
 * Date: 2014-11-01
 */

define(['./app'], function (app) {
    'use strict';
    return app.config(['$routeProvider', '$httpProvider',   function ($routeProvider, $httpProvider) {

        $httpProvider.responseInterceptors.push('dianpingHttpInterceptor');

        // $httpProvider.interceptors.push(function($q, $timeout, $window) {
        //     return {
        //         // On request success
        //           request: function (config) {
        //             if (config.method === 'JSONP') {
        //                 var callbackId = angular.callbacks.counter.toString(36);
        //                 config.callbackName = 'angular_callbacks_' + callbackId;
        //                 config.url = config.url.replace('JSON_CALLBACK', config.callbackName);

        //                 $timeout(function() {
        //                   $window[config.callbackName] = angular.callbacks['_' + callbackId];
        //                 }, 0, false);
        //               }
        //             console.log(config); // Contains the data about the request before it is sent.

        //             // Return the config or wrap it in a promise if blank.
        //             return config || $q.when(config);
        //           },

        //           // On request failure
        //           requestError: function (rejection) {
        //             console.log(rejection); // Contains the data about the error on the request.

        //             // Return the promise rejection.
        //             return $q.reject(rejection);
        //           },

        //           // On response success
        //           response: function (response) {

        //             var config = response.config;
        //               if (config.method === 'JSONP') {
        //                 delete $window[config.callbackName]; // cleanup
        //               }
        //             console.log(response); // Contains the data from the response.

        //             // Return the response or promise.
        //             return response || $q.when(response);
        //           },

        //           // On response failture
        //           responseError: function (rejection) {
        //             var config = rejection.config;
        //               if (config.method === 'JSONP') {
        //                 delete $window[config.callbackName]; // cleanup
        //               }
        //             console.log(rejection); // Contains the data about the error.

        //             // Return the promise rejection.
        //             return $q.reject(rejection);
        //           }
        //     }
        // });

        var spinnerFunction = function spinnerFunction(data, headersGetter) {
            $("#spinner").show();
            return data;
        };

        $httpProvider.defaults.transformRequest.push(spinnerFunction);

        $routeProvider.when('/city', {
            templateUrl: 'views/city.shtml',
            controller: 'cityList'
        });

        $routeProvider.when('/city/:cityId', {
            templateUrl: 'views/index_tuan.shtml',
            controller: 'cityIndex'
        });

        $routeProvider.when('/item/:itemId', {
            templateUrl: 'views/item_detail.shtml',
            controller: 'dealDetail'
        });

        $routeProvider.when('/comment/:itemId', {
            templateUrl: 'views/item_comment.shtml',
            controller: 'dealComment'
        });

        $routeProvider.when('/business/:itemId', {
            templateUrl: 'views/business_list.shtml',
            controller: 'businessList'
        });

        $routeProvider.when('/map', {
            templateUrl: 'views/map.shtml',
            controller: 'mapBusiness'
        });

        $routeProvider.when('/account', {
            templateUrl: 'views/account.shtml',
            controller: 'accountView',
            resolve: {
                auth: ['authenticationSvc', function(authenticationSvc) {
                    if(!authenticationSvc.userInfo) {
                        authenticationSvc.gotoLogin()
                    }
                }]
            }
        });
        //电子券列表
        $routeProvider.when('/ecode', {
            templateUrl: 'views/e_code.shtml',
            controller: 'eCodeCtl'
        });
        //电子券详情
        $routeProvider.when('/ecode_list/:voucherId', {
            templateUrl: 'views/e_code_list.shtml',
            controller: 'eCodeList'
        });
        //团购订单详情
        $routeProvider.when('/order_detail/:orderId', {
            templateUrl: 'views/order_detail.shtml',
            controller: 'orderDetail'
        });

        $routeProvider.when('/business_detail/:businessId', {
            templateUrl: 'views/business_detail.shtml',
            controller: 'businessDetail'
        });

        $routeProvider.when('/item_list', {
            templateUrl: 'views/item_list.shtml',
            controller: 'itemList'
        });

        $routeProvider.when('/order_list', {
            templateUrl: 'views/order_list.shtml',
            controller: 'orderList',
            resolve: {
                auth: ['authenticationSvc', function(authenticationSvc) {
                    if(!authenticationSvc.userInfo) {
                        authenticationSvc.gotoLogin()
                    }
                }]
            }
        });

        $routeProvider.when('/search', {
            templateUrl: 'views/search.shtml',
            controller: 'searchCtl'
        });

        $routeProvider.otherwise({
            redirectTo: '/city/shanghai'
        });

    }]);

});