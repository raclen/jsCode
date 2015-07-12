/**
 * Created by xiaodi001 on 2015/7/12.
 * 这是一个新代码
 */
var through = require('through2');
module.exports = function () {
    return through.obj(function (file, enc, cb) {
        if (file.isNull()) {
            this.push(file);
            return cb();
        }

        if (file.isStream()) {
            this.emit('error', new gutil.PluginError(PLUGIN_NAME, 'Streaming not supported'));
            return cb();
        }
        var reg=/(\d+)px/ig;
        function med(){
            var s1=arguments[1];
            return parseFloat(s1)/100+'rem'
        }
        var content=file.contents.toString().replace(reg,med);
        file.contents = new Buffer(content);

        this.push(file);

        cb();
    });
};