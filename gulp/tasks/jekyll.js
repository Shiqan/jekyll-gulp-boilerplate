"use strict";

const argv = require("yargs").argv;
const gulp = require("gulp");
const shell = require("shelljs");

// 'gulp jekyll' -- builds site with development settings
// 'gulp jekyll --prod' -- builds site with production settings
gulp.task("build:jekyll", callback => {
  if (!argv.prod) {
    shell.exec(
      "bundle exec jekyll build --incremental --future --config _config.yml,_config.dev.yml"
    );
    callback();
  } else if (argv.prod) {
    shell.exec("bundle exec jekyll algolia");
    shell.exec("bundle exec jekyll build --incremental --future");
    callback();
  }
});
