///// <binding BeforeBuild='audio, appController, appModule, css' Clean='loading' />
//'use strict';
////https://css-tricks.com/gulp-for-beginners/
//var gulp = require('gulp');
//var concat = require('gulp-concat');
//var clean = require('gulp-clean');
//var minifyCSS = require('gulp-clean-css');
//var autoprefixer = require('gulp-autoprefixer');
//var rename = require('gulp-rename');
//var uglify = require('gulp-uglify');
//var gulpif = require('gulp-if');
//var cssnano = require('gulp-cssnano');
//var imagemin = require('gulp-imagemin');
//var browserSync = require('browser-sync').create();
//var newer = require('gulp-newer');
//var closureCompiler = require('google-closure-compiler').gulp({ requireStreamInput: true });
//var browserSync = require('browser-sync').create();
//var runSequence = require('run-sequence');
////0
//gulp.task('cleanTasks', function () {
//    return [
//        gulp.src('dist', { read: false }).pipe(clean()),
//        gulp.src('audio/audio.js', { read: false }).pipe(clean()),
//        gulp.src('audio/audio.min.js', { read: false }).pipe(clean()),
//        gulp.src('css/style.min.css', { read: false }).pipe(clean()),
//        gulp.src('modules/initial.min.js', { read: false }).pipe(clean()),
//        gulp.src('modules/initial.con.js', { read: false }).pipe(clean()),
//        gulp.src('controllers/firstCtrl.min.js', { read: false }).pipe(clean()),
//        gulp.src('controllers/firstCtrl.con.js', { read: false }).pipe(clean())
//    ];
//});
////1
//gulp.task('images',['cleanTasks'], function () {
//    return gulp.src('images/**/*.+(png|jpg|gif|svg)')
//    .pipe(imagemin())
//    .pipe(gulp.dest('dist/images'));
//});
////2
//gulp.task('audio', ['images'], function () {
//    return gulp.src(['audio/angular.audio.js'])
//        .pipe(concat('audio.js'))
//        .pipe(gulp.dest('audio'))
//        .pipe(rename('audio.min.js'))
//        .pipe(uglify())
//        .pipe(gulp.dest('audio'))
//        .pipe(gulp.dest('dist'));
//});
////3
//gulp.task('css', ['audio'], function () {
//    return [
//      gulp.src('css/digitalclock.css')
//      .pipe(minifyCSS())
//      .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9'))
//      .pipe(concat('style.min.css'))
//      .pipe(gulp.dest('css'))
//      .pipe(gulp.dest('dist'))
//    ];
//});
////4
//gulp.task('appModule', ['css'], function () {
//    return [gulp.src('./modules/initial.js', { base: './' })
//        .pipe(newer('./dist/initial.min.js'))
//        .pipe(closureCompiler({
//            compilation_level: 'WHITESPACE_ONLY',
//            js_output_file: 'initial.min.js'
//        })).pipe(gulp.dest('./dist')),
//        gulp.src('./modules/initial.js', { base: './' })
//        .pipe(newer('./modules/initial.min.js'))
//        .pipe(closureCompiler({
//            compilation_level: 'WHITESPACE_ONLY',
//            js_output_file: 'initial.min.js'
//        }))
//        .pipe(gulp.dest('./modules'))
//    ];
//});
////5
//gulp.task('appController', ['appModule'], function () {
//    return [gulp.src('./controllers/firstCtrl.js', { base: './' })
//        .pipe(newer('./dist/firstCtrl.min.js'))
//        .pipe(closureCompiler({
//            compilation_level: 'WHITESPACE_ONLY',
//            js_output_file: 'firstCtrl.min.js'
//        }))
//        .pipe(gulp.dest('./dist')),
//        gulp.src('./controllers/firstCtrl.js', { base: './' })
//        .pipe(newer('./controllers/firstCtrl.min.js'))
//        .pipe(closureCompiler({
//            compilation_level: 'WHITESPACE_ONLY',
//            js_output_file: 'firstCtrl.min.js'
//        }))
//        .pipe(gulp.dest('./controllers'))
//    ];
//});
////6
//gulp.task('browserSync', ['appController'],function () {
//    browserSync.init({
//        server: {
//            baseDir: "./"
//        }
//    });
//});
////7
//gulp.task('start', function (callback) {
//    runSequence(['appController'],
//        'browserSync');
//});