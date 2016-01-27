/**
 * Created by XIAODI001 on 2015/3/6.
 * gulp
 */
console.log('begin ...');
var gulp = require('gulp');


/**
 * 需要使用什么插件当然要先引入它的模块啦
 */
var imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    pngcrush = require('imagemin-pngcrush'),
    cache = require('gulp-cache'),
    px2rem = require('./gulp-pxtworem.js'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-minify-css'),
    sourcemaps = require('gulp-sourcemaps'),
    concat= require('gulp-concat'),
    notify = require('gulp-notify');//提示信息
/**
 * 一般事件的定义放在事件调用的上面，这里我们也把'任务'写到前面
 * 下面是一个压缩图片的任务（task）
 */
gulp.task('buildcss', function() {
    return gulp.src('src/img/event_life/css/*.css')
        .pipe(minifyCss())
        .pipe(gulp.dest('./dest/img/event_life/css'))
        .pipe(notify({message: 'buildcss task ok'}));
});
gulp.task('imagemin', function () {
    return gulp.src('src/img/event_life/img/*')
        .pipe(imagemin({
            progessive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('./dest/img/event_life/img'))
        .pipe(notify({message: 'img task ok'}));
});

gulp.task('pxtworem', function () {
    return gulp.src('src/img/event_life/css/*.css')
        .pipe(px2rem({number: 100}))
        .pipe(gulp.dest('./dest/img/event_life/css'))
        .pipe(notify({message: 'pxtworem task ok'}));

});
gulp.task('buildjs', function() {
    return gulp.src('src/img/event_life/js/*.js')
        .pipe(sourcemaps.init())
        .pipe(concat('main.min.js'))
        .pipe(uglify({
            mangle: true, //类型：Boolean 默认：true 是否修改变量名
            compress: true //类型：Boolean 默认：true 是否完全压缩
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dest/img/event_life/js'))
        .pipe(notify({
            message: 'js task ok'
        }));
});



/**
 *gulp 命令会执行defalut
 *我们只需要把要执行执行的函数都放在这个函数（或者事件，就像jquery的ready）里面
 *
 */
gulp.task('default', function () {
    console.log('common in default');
    gulp.run('img');
    //gulp.run('pxtworem');

})
console.log('end ...');//
