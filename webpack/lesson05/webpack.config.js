/**
 * Created by XIAODI001 on 2015/4/3.
 * 这是一个新代码
 */
var webpack = require('webpack');
module.exports = {
    entry: {
        app: "./main.js",
        vendor: ["./jquery-latest.js"]
    },

    output: {
        filename: "bundle.js"
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"vendor", /* filename= */"common.js")
    ]

};