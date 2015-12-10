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
    livereload = require('gulp-livereload'),
    server = require('gulp-server-livereload'),
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
  'app/dist/js/*.min.js',
  'app/dist/css/*.min.cs'
];
<% if (coffee) { %>
gulp.task('coffee', function() {
  gulp.src(['./app/app.coffee', './app/js/**/*.coffee'])
    .pipe(coffee({bare: true}).on('error', gutil.log))
    .pipe(gulp.dest('./app/'))
});
<% } %>

gulp.task('scripts', function() {
  return gulp.src(['./app/app.js', './app/js/**/*.js'])
    .pipe(concat('main.js'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(ngAnnotate())
    .pipe(uglify())
    .pipe(gulp.dest('./app/dist/js'));
});
<% if (cssExtension == 'scss') { %>
// Sasss
gulp.task('styles', function () {
  gulp.src('./app/styles/*.scss')
  .pipe(rename({ suffix: '.min'}))
  .pipe(sass({outputStyle: 'compressed'}))
  .pipe(gulp.dest('./app/dist/css'));
});
<% else if (cssExtension == 'less') { %>
  // Less
gulp.task('styles', function () {
  return gulp.src('./app/styles/**/*.less')
    .pipe(less())
    .pipe(rename({ suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('./app/dist/css'));
});
<% } else %>
// Less
gulp.task('styles', function () {
  return gulp.src('./app/styles/**/*.less')
    .pipe(rename({ suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('./app/dist/css'));
});
<% } %>


gulp.task('inject', function () {
  var target = gulp.src('./app/index.html');
  var sources = gulp.src(angular_order, {read:false}, {relative: true});
  return target.pipe(inject(sources))
    .pipe(gulp.dest(''));
});

// Default task
gulp.task('default', [], function() {
  gulp.start('styles', 'scripts', 'inject', 'images');
});

gulp.task('webserver', function() {
  gulp.src('./app')
    .pipe(server({
      livereload: true,
      directoryListing: false,
      path: './app',
      open: true
    }));
});
// Watch
gulp.task('watch', function() {

  // Watch .scss files
  gulp.watch('./app/styles/**/*.less', ['less']);

  // Watch .js files
  gulp.watch('./app/**/*.js', ['scripts']);

  // Watch image files
  // gulp.watch('src/images/**/*', ['images']);

  // Create LiveReload server
  livereload.listen();

  // Watch any files in dist/, reload on change
  gulp.watch(['./app/**']).on('change', livereload.changed);

});
