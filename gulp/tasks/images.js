"use strict";

const changed = require("gulp-changed");
const filter = require("gulp-filter");
const glob = require("glob");
const gulp = require("gulp");
const gulpif = require("gulp-if");
const newer = require("gulp-newer");
const notify = require("gulp-notify");
const rename = require("gulp-rename");
const responsive = require("gulp-responsive");
const size = require("gulp-size");
const imagemin = require("gulp-imagemin");
const paths = require("../paths");

gulp.task("images:optimize", () => {
  return gulp
    .src([paths.imageFilesGlob])
    .pipe(newer(paths.jekyllImageFiles))
    .pipe(
      imagemin(
        [
          imagemin.gifsicle({ interlaced: true }),
          imagemin.jpegtran({ progressive: true }),
          imagemin.optipng(),
          imagemin.svgo({ plugins: [{ cleanupIDs: false }] })
        ],
        { verbose: true }
      )
    )
    .pipe(gulp.dest(paths.jekyllImageFiles))
    .pipe(size({ title: "images" }));
});

gulp.task("images:lazyload", () => {
  return gulp
    .src([
      paths.jekyllImageFiles + "/lazyload" + paths.imagePattern,
      "!" + paths.jekyllImageFiles + "/lazyload/**/*.{gif,svg}"
    ])
    .pipe(changed(paths.jekyllImageFiles))
    .pipe(
      responsive(
        {
          // resize all images
          "*.*": [
            {
              width: 20,
              rename: { suffix: "-lq" }
            },
            {
              // copy original image
              width: "100%",
              rename: { suffix: "" }
            }
          ]
        },
        {
          // global configuration for all images
          errorOnEnlargement: false,
          withMetadata: false,
          errorOnUnusedConfig: false
        }
      )
    )
    .pipe(gulp.dest(paths.jekyllImageFiles));
});

gulp.task("images:feature", () => {
  return gulp
    .src([
      paths.jekyllImageFiles + "/feature" + paths.imagePattern,
      "!" + paths.jekyllImageFiles + "/feature/**/*.{gif,svg}"
    ])
    .pipe(changed(paths.jekyllImageFiles))
    .pipe(
      responsive(
        {
          // resize all images
          "*.*": [
            {
              width: 20,
              rename: { suffix: "-lq" }
            },
            {
              width: 320,
              rename: { suffix: "-320" }
            },
            {
              width: 768,
              rename: { suffix: "-768" }
            },
            {
              width: 1024,
              rename: { suffix: "-1024" }
            },
            {
              width: 1920,
              rename: { suffix: "" }
            }
          ]
        },
        {
          // global configuration for all images
          errorOnEnlargement: false,
          withMetadata: false,
          errorOnUnusedConfig: false
        }
      )
    )
    .pipe(gulp.dest(paths.jekyllImageFiles));
});

// Builds all scripts.
gulp.task(
  "images",
  ["images:optimize", "images:lazyload", "images:feature"],
  callback => {
    callback();
  }
);
