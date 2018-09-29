"use strict";

const gulp = require("gulp");
const favicons = require("favicons").stream;
const log = require("fancy-log").error;
const directoryExists = require("directory-exists");
const paths = require("../paths");

gulp.task("build:favicons", callback => {
  directoryExists(
    `./${paths.sourceDir}_includes/favicons/`,
    (error, result) => {
      if (!result) {
        gulp
          .src("icon.png")
          .pipe(
            favicons({
              appName: "My PWApp",
              appDescription: "This is my application",
              developerName: "Shiqan",
              developerURL: "https://www.github.com/Shiqan",
              background: "#FFFFFF",
              path: "/favicons/",
              url: "https://www.website.com/",
              display: "standalone",
              orientation: "portrait",
              start_url: "/",
              version: 1.0,
              logging: false,
              html: "_favicons.html",
              pipeHTML: true,
              replace: true,
              icons: {
                yandex: false,
                coast: false
              }
            })
          )
          .on("error", log)
          .pipe(gulp.dest(`${paths.sourceDir}_includes/favicons/`))
          .on("end", () => callback());
      } else {
        callback();
      }
    }
  );
});
