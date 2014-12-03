
define(['./module'], function (controllers) {
    'use strict';

    controllers.controller('eCodeCtl', ['$scope','$location','getCodeInfo','signServer', function($scope,$location,getCodeInfo,signServer) {
        var userWLT = window.sessionStorage.getItem('wlt.user');
        if(!userWLT) {
            window.location.href = '/wap/login/login.shtml?callback=' + encodeURIComponent($location.absUrl()) + '&source=2';
        }
        $scope.codeResult=function(select){
            var sendData = {
                'authType': 'SHA1_1',
                'msgVersion': '',
                'reqAppId': 'ios_app_wanlitong',
                'custString': '1.29',
                'platform': 'ios',
                'machineNo': '864375028810514',
                'coordinate': '168.49679,28.82855',
                'screenSize': '960*480',
                'reqTime': (new Date()).getTime(),
                'voucherState': select.toString(),
                'memberId' : JSON.parse(userWLT).memberId,
                'token': JSON.parse(userWLT).token,
                'sortFlag' : 'DESC',
                'pageNo' : '1',
                'callback': 'angular.callbacks.dp',
                'pageSize' : '100'

            }
            signServer.sign(sendData);
            /*     $.extend(sendData, {
             sign: (function() {
             var PRIVATE_KEY = '09FB84B1-D90E-4C14-84DB-DEE924A87B51';

             var REQ_TIME = 'reqTime',
             ts;

             var a = arguments,
             o = a[0] || {},
             pk = a.length > 1 ? a[1] : PRIVATE_KEY,
             pks = [];

             for (var k in o) {
             if(k == REQ_TIME) {
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
             })(sendData)  // 加密
             });*/
            var dataJSON=function(o){
                var codeJSON={};
                var used = arguments[1];
                for (var i in o) {
                    codeJSON[o[i].voucherId]={};
                    codeJSON[o[i].voucherId].productId = o[i].productId;
                    codeJSON[o[i].voucherId].couponCode = o[i].couponCode;
                    codeJSON[o[i].voucherId].endTime = o[i].endTime;
                    codeJSON[o[i].voucherId].used = used;
                }
                window.sessionStorage.setItem('codejson',JSON.stringify(codeJSON));
            }
            delete sendData.callback;
            getCodeInfo.query(sendData)
                .$promise.then(function(data) {
                    if(!data.body){
                        $scope.popup = data.head.rspDescription;
                        window.location.href = '/wap/login/login.shtml?callback=' + encodeURIComponent($location.absUrl()) + '&source=2';
                    }
                    switch (select){
                        case 0:
                            $scope.codeDetail0 = data.body.result.list;
                            $scope.codeDetail1 =null;
                            $scope.codeDetail2=null;
                            dataJSON($scope.codeDetail0,'one');
                            break;
                        case 1:
                            $scope.codeDetail1 = data.body.result.list;
                            dataJSON($scope.codeDetail1,'two');
                            $scope.codeDetail0 =null;
                            $scope.codeDetail2=null;
                            break;
                        case 2:
                            $scope.codeDetail2 = data.body.result.list;
                            dataJSON($scope.codeDetail2,'third');
                            $scope.codeDetail0 =null;
                            $scope.codeDetail1=null;
                            break;
                        default :
                            $scope.popup = '网络错误，休息一会吧';
                    }

                })
        }
        $scope.codeResult(0);



    }]);

});
