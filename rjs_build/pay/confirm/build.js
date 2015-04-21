({
    baseUrl: '../../../app_js/wanlitong/v40/wap/',
    out: 'confirm-build.js',
    name: 'pay/v1.0/confirm',
    paths: {
        'Zepto': 'vendor/zepto/dist/zepto.min',
        'sha1': 'vendor/CryptoJS/rollups/sha1',
        // wlt
        'wlt': 'vendor/WLT/wlt',
        'popup': 'vendor/WLT/wlt.popup',
        'payDialog': 'pay/v1.0/wlt.payDialog',
        //wlt.util
        'wlt.util': 'vendor/WLT/wlt.util',
        'wlt.util.sign': 'vendor/WLT/util/sign',
        'parseURL': 'vendor/WLT/util/parseURL',
        'track': 'vendor/WLT/util/track',
        'm2': 'vendor/WLT/util/sign/m2'
    },
    shim: {
        'Zepto': {
            exports: '$'
        },
        'sha1': {
            exports: 'CryptoJS'
        },
        'wlt': {
            deps: ['Zepto']
        },
        'popup': {
            deps: ['wlt']
        },
        'payDialog': {
            deps: ['wlt']
        },
        'wlt.util': {
            deps: ['wlt']
        },

        'wlt.util.sign': {
            deps: ['wlt.util']
        },
        'track': {
            deps: ['wlt.util']
        },
        'm2': {
            deps: ['wlt.util.sign', 'sha1']
        },
        'parseURL': {
            deps: ['wlt.util']
        }
    }

})