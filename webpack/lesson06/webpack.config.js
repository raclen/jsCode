/**
 * Created by XIAODI001 on 2015/4/3.
 * 对于没有模块定义的js 可以使用数组打包，也可以使用exports插件
 * 数组的方式 等于把没有模块规范的和当前代码合并到一起
 * 使用exports会在没有模块定位的文件后面把你写的变量挂载到 module.exports上，这样就成了commonjs规范
 * 例如
 * /*** EXPORTS FROM exports-loader ***/
//module.exports = Zepto;
//因此使用exports-loader更符合webpack的加载思想

var webpack = require('webpack');
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('dist/js/common.js');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        // main: ["./src/js/zepto.js", './src/js/main.js'],
        main: "./src/js/main.js",
        app: "./src/js/app.js",
    },
    output: {
        path:'./',
        // filename: "./dist/js/[name]_[hash:6].js"
        filename: "dist/js/[name].min.js",
        publicPath: "",
        chunkFilename: "dist/js/[name].chunk.js"//延迟加载的模块名字
    },
    plugins: [
        commonsPlugin,
        new ExtractTextPlugin('dist/css/[name].min.css'),//把css作为单独文件导出
        new webpack.BannerPlugin('This file is created by '+ new Date().toLocaleString())//设置文件头
    ],
    module: {
      //加载器配置
      loaders: [
          { test: /\.css$/,exclude: /^node_modules$/, loader:ExtractTextPlugin.extract('style-loader','css-loader') },
          { test: /\.scss$/, exclude: /^node_modules$/,loader: ExtractTextPlugin.extract('style',["css", "sass"])},
          { test: /\.(png|jpg)$/, exclude: /^node_modules$/,loader: 'url-loader?limit=8192&name=/dist/img/[name][hash:6].[ext]'},
          { test: require.resolve('./src/js/zepto.js'),exclude: /^node_modules$/, loader: "exports?Zepto" },
          { test: /\.html/,exclude: /^node_modules$/,loader: "html-loader"}
      ]
  },
  resolve: {
       root: 'D:/raclen/jsCode/webpack/lesson06/', //绝对路径
       extensions: ['', '.js', '.json', '.scss']
   }

};
