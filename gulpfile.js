var gulp = require('gulp');
var mocha = require('gulp-mocha');
var coverage = require('gulp-coverage');
var eslint = require('gulp-eslint');

gulp.task('lint', function lint() {
  return gulp
    .src(['index.js', 'gulpfile.js', 'test/**/*.test.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
  ;
});

gulp.task('test', function test() {
  return gulp
    .src(['index.js'], { read: false })
    .pipe(coverage.instrument({
      pattern: ['**/test*'],
      debugDirectory: 'dist/debug'
    }))
    .pipe(mocha())
    .pipe(coverage.gather())
    .pipe(coverage.format([
      { reporter: 'html', outFile: 'coverage.html' },
      { reporter: 'lcov', outFile: 'coverage.lcov' }
    ]))
    .pipe(gulp.dest('dist/report'))
  ;
});

gulp.task('default', ['lint', 'test']);