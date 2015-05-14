var gulp = require('gulp');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');

var paths = {
  js: [
    './public/app/bower_components/angular/angular.js',
    './public/app/bower_components/angular-bootstrap/ui-bootstrap.min.js',
    './public/app/bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
    './public/app/bower_components/angular-ui-router/release/angular-ui-router.min.js',
    './public/app/bower_components/bignumber.js/bignumber.min.js',
    './public/app/app.js',
    './public/app/components/controllers/*.js',
    './public/app/components/helpers/*.js',
    './public/app/components/filters/*.js',
    './public/app/components/services/*.js',
    './public/app/components/directives/*.js'
  ]
};

gulp.task('js', function () {
  gulp.src(paths.js)
    .pipe(sourcemaps.init())
    .pipe(concat('bundle.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./public/dist'))
});

gulp.task('default', ['js'], function () {
  gulp.watch(paths.js, ['js']);
});