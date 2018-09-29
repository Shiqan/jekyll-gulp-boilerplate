"use strict";
const argv = require("yargs").argv;
const del = require("del");
const gulp = require("gulp");
const when = require("gulp-if");
const paths = require("../paths");

gulp.task("clean:scripts", () => {
  return del([paths.jekyllJsFiles + "index.js"]);
});

gulp.task("clean:styles", () => {
  return when(
    argv.prod,
    del([
      paths.jekyllSassFiles + "bulma.css",
      paths.jekyllSassFiles + "main.css",
      `${paths.jekyllDir}_includes/critical.css`
    ])
  );
});

gulp.task("clean:images", () => {
  return del([paths.jekyllImageFiles]);
});

gulp.task("clean:fonts", () => {
  return del([paths.jekyllFontFiles]);
});

gulp.task("clean:favicons", () => {
  return del(`${paths.jekyllDir}_includes/favicons/**`);
});

gulp.task("clean:serviceworker", () => {
  return del(`${paths.jekyllDir}/service-worker.js`);
});

gulp.task("clean:gzip", () => {
  return del([paths.jekyllDir + "/**/*.gz"]);
});

gulp.task("clean:site", () => {
  return del([paths.jekyllDir]);
});
