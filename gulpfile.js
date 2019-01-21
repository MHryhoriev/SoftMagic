'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var minify = require('gulp-minify');
var rename = require('gulp-rename');
var cssNano = require('gulp-cssnano');
var del = require('del');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var concat = require('gulp-concat');
var uglyfly = require('gulp-uglyfly');

/*TASK FOR DIST START*/
gulp.task("mini-css", () => {
    return gulp.src('./src/scss/**/*.scss')
        .pipe(sass())
        .pipe(cssNano())
        .pipe(autoprefixer({
            browsers: ['last 3 versions'],
            cascade: false
        }))
        .pipe(rename('styles.min.css'))
        .pipe(gulp.dest('./app/css'));
});

gulp.task("mini-js", () => {
    return gulp.src('./src/js/scripts.js')
        .pipe(uglyfly())
        .pipe(rename('scripts.min.js'))
        .pipe(gulp.dest('./app/js'));
});

gulp.task("copy-js", () => {
    return gulp.src(['./src/js/*.js', '!src/js/scripts.js'])
        .pipe(gulp.dest('./app/js'));
});

gulp.task('mini-img', () => {
    gulp.src('./src/img/**/*')
        .pipe(imagemin({
          interlaced: true,
          progressive: true,
          svgoPlugins: [{removeViewBox: false}],
          use: [pngquant()]
        }))
        .pipe(gulp.dest('./app/img'));
});

gulp.task('del', () => {
    return del.sync('app');
});

gulp.task('build:app', ['del', 'mini-css', 'copy-js', 'mini-js', 'mini-img'], () => {
    gulp.dest('./app/');
});

/*TASK FOR DIST END*/

gulp.task('serve', () => {
   browserSync.init({
       server: ''
   });

   gulp.watch('./src/scss/**/*.scss', ['mini-css']).on('change', browserSync.reload);
   gulp.watch('./**/*.html').on('change', browserSync.reload);
   gulp.watch('./src/img/**/*.*', ['mini-img']).on('change', browserSync.reload);
   gulp.watch('./src/js/**/*.*', ['mini-js']).on('change', browserSync.reload);
});

gulp.task('default', ['serve']);
