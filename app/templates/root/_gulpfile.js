var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'), <% if (coffee == 'coffee') { %>
    coffee = require('gulp-coffee'), <% } %>
    gutil = require('gulp-util'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),<% if (cssExtension == 'sass') { %>
    sass = require('gulp-sass'),<% } else if (cssExtension == 'less') { %>
    less = require('gulp-less'), <% } %>
    minifycss = require('gulp-minify-css'),
    del = require('del'),
    inject = require('gulp-inject'),
    ngAnnotate = require('gulp-ng-annotate'),
    gulpsync = require('gulp-sync')(gulp);

    var order = [
      './app/bower_components/**/angular.min.js',
      './app/bower_components/**/angular-ui-router.min.js',
      './app/bower_components/**/angular-route.min.js',
      './app/bower_components/**/angular-animate.min.js',
      './app/bower_components/**/angular-aria.min.js',
      './app/bower_components/**/angular-cookies.min.js',
      './app/bower_components/**/angular-messages.min.js',
      './app/bower_components/**/angular-resource.min.js',
      './app/bower_components/**/angular-route.min.js',
      './app/bower_components/**/angular-sanitize.min.js',
      './app/bower_components/**/angular-touch.min.js',
      'app/app.js',
      'app/js/**/*.js',
      'app/styles/*.css'
    ];
<% if (coffee == 'coffee') { %>
gulp.task('coffee', gulpsync.sync(['coffee_app', 'coffee_scripts']));

gulp.task('coffee_app', function() {
  return gulp.src('./app/app.coffee')
    .pipe(coffee({bare: true}).on('error', gutil.log))
    .pipe(gulp.dest('./app/'))
});
gulp.task('coffee_scripts', function() {
  return gulp.src('./app/js/**/*.coffee')
    .pipe(coffee({bare: true}).on('error', gutil.log))
    .pipe(gulp.dest('./app/js/'))
});
<% } %>

gulp.task('scripts_build', function() {
  return gulp.src(['./app/app.js', './app/js/**/*.js'])
    .pipe(concat('main.js'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(ngAnnotate())
    .pipe(uglify())
    .pipe(gulp.dest('./app/dist/js'));
});
<% if (cssExtension == 'scss') { %>
// Sass
gulp.task('styles_build', function () {
  return gulp.src('./app/styles/*.scss')
  .pipe(rename({ suffix: '.min'}))
  .pipe(sass({outputStyle: 'compressed'}))
  .pipe(gulp.dest('./app/dist/css'));

  gulp.task('styles', function () {
    return gulp.src('./app/styles/*.scss')
    .pipe(sass({outputStyle: 'expanded'}))
    .pipe(gulp.dest('./app/styles'));
});
<% } else if (cssExtension == 'less') { %>
  // Less
gulp.task('styles_build', function () {
  return gulp.src('./app/styles/**/*.less')
    .pipe(less())
    .pipe(rename({ suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('./app/dist/css'));
});
gulp.task('styles', function () {
  return gulp.src('./app/styles/**/*.less')
    .pipe(less())
    .pipe(gulp.dest('./app/styles'));
});
<% } else { %>
// css
gulp.task('styles_build', function () {
  return gulp.src('./app/styles/**/*.less')
    .pipe(rename({ suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('./app/dist/css'));
});
<% } %>

gulp.task('index', function () {
 var target = gulp.src('./app/index.html');
 // var sources = gulp.src(order);
 return target.pipe(inject(gulp.src(order), {read:false, relative: true}))
   .pipe(gulp.dest('./app'));
});

// Clean
gulp.task('clean', function() {
  return del('dist');
});

/////////////////////////////////////////////
gulp.task('express', function() {
  var express = require('express');
  var app = express();
  app.use(require('connect-livereload')({port: 3000}));
  app.use(express.static(__dirname + '/app'));
  app.listen(8000, '0.0.0.0');
});

var tinylr;
gulp.task('livereload', function() {
  tinylr = require('tiny-lr')();
    tinylr.listen(3000);
});

function notifyLiveReload(event) {
  var fileName = require('path').relative(__dirname + '/app', event.path);
  tinylr.changed({
    body: {
      files: [fileName]
    }
  });
}

gulp.task('watch', function() {
  gulp.watch(['./app/styles/*.scss', './app/styles/*.less'], ['styles']);
  gulp.watch('*.html', notifyLiveReload);
  gulp.watch('./app/styles/*.css', notifyLiveReload);<% if (coffee == 'coffee') { %>
  gulp.watch('./app/**/*.coffee', ['coffee']); <% } %>
  gulp.watch('./app/**/*.js', notifyLiveReload);
});

gulp.task('default', gulpsync.sync([<% if (cssExtension != 'css') { %>'styles', <% } %> <% if (coffee == 'coffee') { %> 'coffee', <% } %>'index', 'express', 'livereload', 'watch']));
