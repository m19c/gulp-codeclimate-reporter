var reporter = require('../');
var util = require('gulp-util');
var array = require('stream-array');
var File = util.File;

function stream(file) {
  return array([file || new File({
    cwd: process.cwd(),
    base: '/test',
    path: 'test.lcov',
    contents: new Buffer('')
  })]);
}

describe('gulp-codeclimate-reporter', function gulpCodeclimateReporter() {
  it('should throw an error if one of the obtained stream files does not exist', function noContent(done) {
    stream()
      .pipe(reporter())
      .on('error', function expectedError() {
        done();
      })
      .on('end', function handleEnd() {
        done(new Error('Wrong event'));
      })
    ;
  });
  it('should support path with spaces', function withSpaces(done) {
    var file = new File({
      cwd: process.cwd(),
      path: 'test/coverage-with-spaces.lcov',
      contents: new Buffer('')
    });

    stream(file)
      .pipe(reporter())
      .on('error', done)
      .on('end', done)
    ;
  });
});
