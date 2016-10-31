/**
 * Created by XIAODI001 on 2015/4/2.
 * 这是一个新代码
 */
var jquery = require('./jquery-latest.js');
module.exports = {
    get:function(){
        console.log(jquery.each);
        return 'webpack-dev-server这东西有点不稳定，有时候刷新有时候不刷新'
    }

}
