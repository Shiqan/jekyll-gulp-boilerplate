"use strict";

const argv = require("yargs").argv;
const gulp = require("gulp");
const swPrecache = require("sw-precache");
const paths = require("../paths");
const log = require("fancy-log").error;
const when = require("gulp-if");
const uglify = require("gulp-uglify");
const packageJson = require("../../package.json");

gulp.task("build:serviceworker", callback => {
  let config = {
    cacheId: packageJson.name,
    /*
    dynamicUrlToDependencies: {
      'dynamic/page1': [
        path.join(rootDir, 'views', 'layout.jade'),
        path.join(rootDir, 'views', 'page1.jade')
      ],
      'dynamic/page2': [
        path.join(rootDir, 'views', 'layout.jade'),
        path.join(rootDir, 'views', 'page2.jade')
      ]
    },
    */
    // If handleFetch is false (i.e. because this is called from generate-service-worker-dev), then
    // the service worker will precache resources but won't actually serve them.
    // This allows you to test precaching behavior without worry about the cache preventing your
    // local changes from being picked up during the development cycle.
    handleFetch: argv.prod,
    logger: log,
    runtimeCaching: [
      {
        // See https://github.com/GoogleChrome/sw-toolbox#methods
        urlPattern: "/",
        handler: "cacheFirst",
        // See https://github.com/GoogleChrome/sw-toolbox#options
        options: {
          cache: {
            maxEntries: 1,
            name: "runtime-cache"
          }
        }
      }
    ],
    staticFileGlobs: [
      paths.sassSwGlob,
      paths.jsSwGlob,
      paths.imageSwGlob,
      paths.htmlSwGlob
    ],
    stripPrefix: `${paths.jekyllDir}/`,
    // verbose defaults to false, but for the purposes of this demo, log more.
    verbose: true
  };

  swPrecache.write(`${paths.jekyllDir}/service-worker.js`, config, callback);
});
