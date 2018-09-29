'use strict';

const gulp = require('gulp');
const requireDir = require('require-dir');
const runSequence = require('run-sequence');
const tasks = requireDir('./gulp/tasks', {recurse: true});

gulp.task('optimize', ['images', 'html', 'xml'], (callback) => {
  callback();
});

// Builds site anew.
gulp.task('build', (callback) => {
  runSequence('clean:site', 'build:favicons', 'build:styles:amp', 'build:jekyll', ['build:scripts', 'build:styles', 'build:fonts', 'build:serviceworker'], 'optimize', 'algolia', callback);
});

gulp.task('default', ['build', 'serve']);
