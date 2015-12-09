var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    coffee = require('gulp-coffee'),
    gutil = require('gulp-util'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    sass = require('gulp-sass'),
    less = require('gulp-less'),
    minifycss = require('gulp-minify-css'),
    livereload = require('gulp-livereload'),
    del = require('del'),
    inject = require('gulp-inject'),
    ngAnnotate = require('gulp-ng-annotate');

var angular_order = [
  'app/bower_components/**/angular.min.js',
  'app/bower_components/**/angular-animate.min.js',
  'app/bower_components/**/angular-aria.min.js',
  'app/bower_components/**/angular-cookies.min.js',
  'app/bower_components/**/angular-messages.min.js',
  'app/bower_components/**/angular-resource.min.js',
  'app/bower_components/**/angular-route.min.js',
  'app/bower_components/**/angular-sanitize.min.js',
  'app/bower_components/**/angular-touch.min.js',
  'dist/*.min.js'
];

gulp.task('coffee', function() {
  gulp.src(['./app/**/*.coffee'])
    .pipe(coffee({bare: true}).on('error', gutil.log))
    .pipe(gulp.dest('./app/'))
});

gulp.task('concat', function() {
  return gulp.src(['./app/**/*.js'])
    .pipe(concat('main.js'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(ngAnnotate())
    .pipe(uglify())
    .pipe(gulp.dest('./app/dist/js'));
});

gulp.task('sass', function () {
gulp.src('./app/styles/*.scss')
  .pipe(rename({ suffix: '.min'}))
  .pipe(sass({outputStyle: 'compressed'}))
  .pipe(gulp.dest('./app/dist/css'));
});

gulp.task('less', function () {
  return gulp.src('./app/styles/**/*.less')
    .pipe(less())
    .pipe(rename({ suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('./app/dist/css'));
});

gulp.task('inject', function () {
  var target = gulp.src('index.html');
  var sources = gulp.src(angular_order, {read:false}, {ignorePath: '/app'});
  return target.pipe(inject(sources))
    .pipe(gulp.dest(''));
});
