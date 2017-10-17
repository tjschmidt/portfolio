var gulp = require('gulp');
var clean = require('gulp-clean');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var cssmin = require('gulp-clean-css');
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
        .pipe(rename('blueprint.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/'));
});

gulp.task('css', function () {
    return gulp.src('src/**/*.css')
        .pipe(gulp.dest('build/'))
        .pipe(cssmin())
        .pipe(rename('blueprint.min.css'))
        .pipe(gulp.dest('dist/'));
});

gulp.task('html', function () {
    return gulp.src('src/blueprint.html')
        .pipe(gulp.dest('build/html/'))
        .pipe(gulp.dest('dist/'));
});

gulp.task('img', function () {
    return gulp.src('src/res/**/*.png')
        .pipe(gulp.dest('build/res/'))
        .pipe(gulp.dest('dist/'));
});

gulp.task('build', ['js', 'css', 'html', 'img'], function () {
});