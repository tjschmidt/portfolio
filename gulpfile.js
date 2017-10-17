var gulp = require('gulp');
var clean = require('gulp-clean');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var cssmin = require('gulp-clean-css');
var sass = require('gulp-sass');
var ts = require('gulp-typescript');
var tsProject = ts.createProject('tsconfig.json');

gulp.task('clean', function () {
    return gulp.src(['build/*', 'dist/*'], {read: false})
        .pipe(clean());
});

gulp.task('js', function () {
    return gulp.src('src/**/*.ts')
        .pipe(tsProject())
        .pipe(gulp.dest('build/js/'))
        .pipe(rename('portfolio.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/'));
});

gulp.task('css', function () {
    return gulp.src('src/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('build/'))
        .pipe(cssmin())
        .pipe(rename('portfolio.min.css'))
        .pipe(gulp.dest('dist/'));
});

gulp.task('html', function () {
    return gulp.src('src/**/*.html')
        .pipe(gulp.dest('build/html/'))
        .pipe(gulp.dest('dist/'));
});

gulp.task('img', function () {
    return gulp.src('src/res/*')
        .pipe(gulp.dest('build/res/'))
        .pipe(gulp.dest('dist/'));
});

gulp.task('dist', ['js', 'css', 'html', 'img'], function () {
});

gulp.task('default', function () {
});

gulp.watch('./src/**/*.scss', ['css']);
gulp.watch('./src/**/*.ts', ['js']);
gulp.watch('./src/**/*.html', ['html']);
gulp.watch('./src/res/*', ['img']);