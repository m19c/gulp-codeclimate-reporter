var gulp = require('gulp');
var sequence = require('gulp-sequence');
var mocha = require('gulp-mocha');
var istanbul = require('gulp-istanbul');
var eslint = require('gulp-eslint');
var reporter = require('./');

gulp.task('lint', function lint() {
  return gulp
    .src(['index.js', 'gulpfile.js', 'test/**/*.test.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
  ;
});

gulp.task('test.instrument', function() {
  return gulp
    .src(['index.js'])
    .pipe(istanbul())
    .pipe(istanbul.hookRequire())
  ;
});

gulp.task('test', ['test.instrument'], function() {
  return gulp
    .src(['test/**/*.test.js'])
    .pipe(mocha())
    .pipe(istanbul.writeReports({
      dir: './dist/report'
    }))
  ;
});

gulp.task('codeclimate', function sendToCodeclimate() {
  return gulp
    .src(['dist/report/lcov.info'], { read: false })
    .pipe(reporter({
      token: '83d1a6741b82ae334cbc797b967958cff1462691fcdb082b222087a63a6d2a5d'
    }))
  ;
});

gulp.task('default', sequence(['lint', 'test'], 'codeclimate'));