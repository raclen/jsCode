/**
 * Created by XIAODI001 on 2015/3/6.
 * gulp dome
 */
console.log('begin ...');
var gulp = require('gulp'),
    notify = require('gulp-notify');//提示信息

/**
 * 需要使用什么插件当然要先引入它的模块啦
 */
var imagemin = require('gulp-imagemin');
/**
 * 一般事件的定义放在事件调用的上面，这里我们也把'任务'写到前面
 * 下面是一个压缩图片的任务（task）
 */
gulp.task('img',function(){
    return gulp.src('src/img/event_life/*')
        .pipe(imagemin({
            progressive: true

        }))
        .pipe(gulp.dest('./dest/img/event_life'))
        .pipe(notify({ message: 'img task ok' }));

});
/**
 *gulp 命令会执行defalut
 *我们只需要把要执行执行的函数都放在这个函数（或者事件，就像jquery的ready）里面
 *
 */
gulp.task('default',function(){
    console.log('common in default');
    gulp.run('img');

})
console.log('end ...');//