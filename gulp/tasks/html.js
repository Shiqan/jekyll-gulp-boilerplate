"use strict";

const argv = require("yargs").argv;
const gulp = require("gulp");
const gzip = require("gulp-gzip");
const htmlmin = require("gulp-htmlmin");
const prettyData = require("gulp-pretty-data");
const size = require("gulp-size");
const when = require("gulp-if");
const paths = require("../paths");

gulp.task("html", () => {
  return gulp
    .src(paths.jekyllDir + paths.htmlPattern)
    .pipe(
      when(
        argv.prod,
        htmlmin({
          removeComments: true,
          collapseWhitespace: true,
          collapseBooleanAttributes: false,
          removeAttributeQuotes: false,
          removeRedundantAttributes: false,
          minifyJS: true,
          minifyCSS: true
        })
      )
    )
    .pipe(when(argv.prod, size({ title: "optimized HTML" })))
    .pipe(when(argv.prod, gulp.dest(paths.jekyllDir)))
    .pipe(when(argv.prod, gzip({ append: true })))
    .pipe(
      when(
        argv.prod,
        size({
          title: "gzipped HTML",
          gzip: true
        })
      )
    )
    .pipe(when(argv.prod, gulp.dest(paths.jekyllDir)));
});

gulp.task("xml", () => {
  return gulp
    .src([
      paths.jekyllDir + "_includes/test.yml",
      paths.jekyllDir + paths.xmlPattern,
      paths.jekyllDir + paths.dataPattern
    ])
    .pipe(
      when(
        argv.prod,
        prettyData({
          type: "minify",
          preserveComments: true
        })
      )
    )
    .pipe(when(argv.prod, size({ title: "optimized XML" })))
    .pipe(when(argv.prod, gulp.dest(paths.jekyllDir)));
});
