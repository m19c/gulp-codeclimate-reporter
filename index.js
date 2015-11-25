var pluginName = 'gulp-codeclimate-reporter';
var os = require('os');
var util = require('util');
var gutil = require('gulp-util');
var through2 = require('through2');
var exec = require('mz/child_process').exec;
var merge = require('lodash.merge');
var fs = require('fs');
var path = require('path');

module.exports = function ccm(options) {
  var executablePath = path.join(__dirname, 'node_modules', '.bin', 'codeclimate-test-reporter');

  try {
    fs.lstatSync(executablePath);
  } catch (err) {
    executablePath = path.join(__dirname, '../', '.bin', 'codeclimate-test-reporter');
  }

  options = merge({
    token: null,
    executable: executablePath,
    verbose: true,
    powershell: false
  }, options || {});

  return through2.obj(function handleFile(file, encoding, callback) {
    var stream = this;
    var variable = util.format((os.platform() === 'win32') ? '$env:CODECLIMATE_REPO_TOKEN="%s" &&' : 'CODECLIMATE_REPO_TOKEN=%s', options.token);

    if (file.isStream()) {
      stream.emit('error', new gutil.PluginError({
        plugin: pluginName,
        message: 'Streams are not supported.'
      }));

      return callback();
    }

    exec(util.format('%s %s < "%s"', variable, options.executable, file.path))
      .then(function execCompleted(stdout, stderr) {
        if (stderr) {
          stream.emit('error', new gutil.PluginError({
            plugin: pluginName,
            message: stderr
          }));

          return callback();
        }

        if (options.verbose) {
          gutil.log('Coverage file posted: "%s"', file.path);
        }

        stream.emit('end');
      })
      .catch(function throwPluginError(err) {
        stream.emit('error', new gutil.PluginError({
          plugin: pluginName,
          message: err.message
        }));

        callback();
      });
  });
};