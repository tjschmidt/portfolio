var gulp = require('gulp');
var clean = require('gulp-clean');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var cssmin = require('gulp-clean-css');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var ts = require('gulp-typescript');
var tsProject = ts.createProject('tsconfig.json');


var jsGlob = './src/ts/*.ts';
var cssGlob = './src/scss/*.scss';
var htmlGlob = './src/html/*.html';
var resGlob = './src/res/*';


gulp.task('clean', function () {
    return gulp.src(['build/*', 'dist/*'], {read: false})
        .pipe(clean());
});

gulp.task('js', function () {
    return gulp.src(jsGlob)
        .pipe(plumber())
        .pipe(tsProject())
        .pipe(gulp.dest('build/js/'))
        .pipe(rename('portfolio.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/'));
});

gulp.task('css', function () {
    return gulp.src(cssGlob)
        .pipe(plumber())
        .pipe(sass())
        .pipe(gulp.dest('build/'))
        .pipe(cssmin())
        .pipe(rename('portfolio.min.css'))
        .pipe(gulp.dest('dist/'));
});

gulp.task('html', function () {
    return gulp.src(htmlGlob)
        .pipe(plumber())
        .pipe(gulp.dest('build/html/'))
        .pipe(gulp.dest('dist/'));
});

gulp.task('res', function () {
    return gulp.src(resGlob)
        .pipe(plumber())
        .pipe(gulp.dest('build/res/'))
        .pipe(gulp.dest('dist/'));
});

gulp.task('dist', ['js', 'css', 'html', 'res'], function () {
});

gulp.task('default', function () {
});

gulp.watch(cssGlob, ['css']);
gulp.watch(jsGlob, ['js']);
gulp.watch(htmlGlob, ['html']);
gulp.watch(resGlob, ['res']);