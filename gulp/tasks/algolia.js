"use strict";

const argv = require("yargs").argv;
const gulp = require("gulp");
const shell = require("shelljs");
const log = require("fancy-log").info;

// TODO: move to atomic-algolia to reduce queries
gulp.task("algolia", callback => {
  if (argv.prod) {
    shell.exec("bundle exec jekyll algolia");
  } else {
    log("run with --prod to update algolia index");
  }
  callback();
});
