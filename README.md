# gulp-codeclimate-reporter
[![Build Status](https://travis-ci.org/MrBoolean/gulp-codeclimate-reporter.svg)](https://travis-ci.org/MrBoolean/gulp-codeclimate-reporter)
[![Code Climate](https://codeclimate.com/github/MrBoolean/gulp-codeclimate-reporter/badges/gpa.svg)](https://codeclimate.com/github/MrBoolean/gulp-codeclimate-reporter)
[![Version](https://img.shields.io/npm/v/gulp-codeclimate-reporter.svg?style=flat-square)](https://www.npmjs.com/package/gulp-codeclimate-reporter)

## Install
```bash
npm i --save-dev gulp-codeclimate-reporter
```

## Usage
```javascript
var gulp     = require('gulp');
var reporter = reuqire('gulp-codeclimate-reporter');

gulp.task('codeclimate', function() {
  return gulp
    .src(['path/to/your/lcov.info'], { read: false })
    .pipe(reporter({ token: '...' }))
  ;
});
```

## Available options
Option        | Description
------------- | -------------
`token`       | Your codeclimate token
`executable`  | The path to the [`codeclimate-test-reporter`](https://www.npmjs.com/package/codeclimate-test-reporter)
`verbose`     | Verbose output

## License
The MIT License (MIT)

Copyright (c) 2015 Marc Binder <marcandrebinder@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
