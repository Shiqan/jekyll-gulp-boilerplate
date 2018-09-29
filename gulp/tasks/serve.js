"use strict";

const browserSync = require("browser-sync").create();
const gulp = require("gulp");
const paths = require("../paths");

function reload(callback) {
  browserSync.reload();
  callback();
}

gulp.task("serve", callback => {
  browserSync.init({
    server: paths.jekyllDir,
    ghostMode: false,
    logFileChanges: true,
    logLevel: "debug",
    open: true
  });
  callback();

  gulp.watch(["_config.yml"], ["build:jekyll"], () => {
    reload();
  });

  gulp.watch(paths.sassFilesGlob, ["build:styles"], () => {
    reload();
  });

  gulp.watch(paths.jsFilesGlob, ["build:scripts"], () => {
    reload();
  });

  gulp.watch(paths.imageFilesGlob, ["build:images"], () => {
    reload();
  });

  gulp.watch(paths.jekyllPostFilesGlob, ["build:jekyll"], () => {
    reload();
  });

  if (module.exports.drafts) {
    gulp.watch(paths.jekyllDataFilesGlob, ["build:jekyll"], () => {
      reload();
    });
  }

  gulp.watch([paths.markdownPattern, "!_site/**/*.*"], ["build:jekyll"], () => {
    reload();
  });

  gulp.watch("**.xml", ["build:jekyll"], () => {
    reload();
  });

  gulp.watch(paths.dataFilesGlob, ["build:jekyll"], () => {
    reload();
  });

  gulp.watch("favicon.png", ["build:jekyll"], () => {
    reload();
  });
});
