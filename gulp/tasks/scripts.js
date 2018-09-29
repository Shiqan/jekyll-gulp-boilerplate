"use strict";

const argv = require("yargs").argv;
const concat = require("gulp-concat");
const gulp = require("gulp");
const gzip = require("gulp-gzip");
const newer = require("gulp-newer");
const rev = require("gulp-rev");
const size = require("gulp-size");
const sourcemaps = require("gulp-sourcemaps");
const uglify = require("gulp-uglify");
const when = require("gulp-if");
const log = require("fancy-log").error;
const paths = require("../paths");

gulp.task("build:scripts:global", () => {
  return (
    gulp
      .src(["node_modules/jquery/dist/jquery.min.js", paths.jsFilesGlob])
      .pipe(when(!argv.prod, sourcemaps.init()))
      .pipe(concat("main.js"))
      .pipe(size({ showFiles: true }))
      // minify for production
      .pipe(when(argv.prod, when("*.js", uglify({ preserveComments: "some" }))))
      // output sourcemap for development
      .pipe(when(!argv.prod, sourcemaps.write(".")))
      .pipe(gulp.dest(paths.jekyllJsFiles))
      // hash JS for production
      .pipe(when(argv.prod, rev()))
      .pipe(when(argv.prod, size({ showFiles: true })))
      // output hashed files
      .pipe(when(argv.prod, gulp.dest(paths.jekyllJsFiles)))
      // generate manifest of hashed JS files
      .pipe(rev.manifest("js-manifest.json"))
      .pipe(gulp.dest(paths.sourceDir + paths.dataDir))
      .pipe(when(argv.prod, size({ showFiles: true })))
      .on("error", log)
  );
});

gulp.task("build:scripts:gzip", () => {
  return gulp
    .src([
      paths.jekyllJsFiles + "/*.js"
    ])
    .pipe(when(argv.prod, when("*.js", gzip({ append: true }))))
    .pipe(
      when(
        argv.prod,
        size({
          gzip: true,
          showFiles: true
        })
      )
    )
    .pipe(when(argv.prod, gulp.dest(paths.jekyllJsFiles)));
});

gulp.task(
  "build:scripts",
  ["build:scripts:global", "build:scripts:gzip"],
  callback => {
    callback();
  }
);
