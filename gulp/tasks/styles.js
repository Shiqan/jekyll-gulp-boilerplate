"use strict";

const argv = require("yargs").argv;
const autoprefixer = require("autoprefixer");
const browserSync = require("browser-sync").create();
const cssnano = require("gulp-cssnano");
const gulp = require("gulp");
const gzip = require("gulp-gzip");
const postcss = require("gulp-postcss");
const rev = require("gulp-rev");
const sass = require("gulp-sass");
const size = require("gulp-size");
const sourcemaps = require("gulp-sourcemaps");
const when = require("gulp-if");
const paths = require("../paths");
const log = require("fancy-log").error;

function buildStyles(srcPath, destPath) {
  return (
    gulp
      .src(srcPath)
      .pipe(when(!argv.prod, sourcemaps.init()))
      // preprocess Sass
      .pipe(
        sass({
          style: "compressed",
          precision: 10
        }).on("error", sass.logError)
      )
      // add-remove vendor prefixes
      .pipe(
        postcss([
          autoprefixer({
            grid: true
          })
        ])
      )
      // minify for production
      .pipe(when(argv.prod, cssnano({ autoprefixer: false })))
      .pipe(size({ showFiles: true }))
      // output sourcemap for development
      .pipe(when(!argv.prod, sourcemaps.write(".")))
      .pipe(when(argv.prod, gulp.dest(destPath)))
      // hash CSS for production
      .pipe(when(argv.prod, rev()))
      .pipe(when(argv.prod, size({ showFiles: true })))
      // output hashed files
      .pipe(gulp.dest(destPath))
      // generate manifest of hashed CSS files
      .pipe(rev.manifest("css-manifest.json"))
      .pipe(gulp.dest(paths.sourceDir + paths.dataDir))
      .pipe(when(argv.prod, size({ showFiles: true })))
      .pipe(when(!argv.prod, browserSync.stream()))
      .on("error", log)
  );
}

gulp.task("build:styles:main", () => {
  return buildStyles([paths.sassFiles + "core.scss"], paths.jekyllSassFiles);
});

gulp.task("build:styles:critical", () => {
  return buildStyles([paths.sassFiles + "critical.scss"], paths.sourceDir + "_includes");
});

gulp.task("build:styles:amp", () => {
  return buildStyles([paths.sassFiles + "ampcore.scss"], paths.sourceDir + "_includes");
});

gulp.task("build:styles:gzip", () => {
  return gulp
    .src(["_includes/*.css", paths.jekyllSassFiles + paths.cssPattern])
    .pipe(when(argv.prod, when("*.css", gzip({ append: true }))))
    .pipe(
      when(
        argv.prod,
        size({
          gzip: true,
          showFiles: true
        })
      )
    )
    .pipe(when(argv.prod, gulp.dest(paths.jekyllSassFiles)));
});

gulp.task(
  "build:styles",
  ["build:styles:main", "build:styles:gzip"],
  callback => {
    callback();
  }
);
