"use strict";

const gulp = require("gulp");
const size = require("gulp-size");
const paths = require("../paths");

gulp.task("build:fonts", () => {
  return gulp
    .src(paths.fontFiles + "/**/*")
    .pipe(gulp.dest(paths.jekyllFontFiles))
    .pipe(size({ title: "fonts" }));
});
