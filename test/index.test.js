var gulp = require('gulp');
var reporter = require('../');
var util = require('gulp-util');
var File = util.File;
var array = require('stream-array');

function stream(file) {
  return array([file || new File({
    cwd: process.cwd(),
    base: '/test',
    path: 'test.lcov',
    contents: new Buffer('')
  })]);
}

describe('gulp-codeclimate-reporter', function gulpCodeclimateReporter() {
  it('throws an error if one of the obtained stream files does not exist', function noContent(done) {
    stream()
      .pipe(reporter()
        .on('error', function expectedError() {
          done();
        })
        .on('end', function handleEnd() {
          done(new Error('Wrong event'));
        })
      )
    ;
  });
});