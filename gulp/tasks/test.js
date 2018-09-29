"use strict";

const gulp = require("gulp");
const shell = require("shelljs");

gulp.task("test", callback => {
  shell.exec("gulp build --prod");
  shell.exec("bundle exec rake test");
  callback();
});
