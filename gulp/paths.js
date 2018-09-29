"use strict";

let paths = {};

// Directory locations.
paths.sourceDir = "src/";
paths.assetsDir = "_assets/";
paths.dataDir = "_data/";
paths.jekyllAssetsDir = "assets/";
paths.siteDir = "_site/";
paths.stylesDir = "styles/";
paths.scriptsDir = "js/";
paths.imageDir = "images/";
paths.fontDir = "fonts/";

// Source asset files locations.
paths.sassFiles = paths.sourceDir + paths.assetsDir + paths.stylesDir;
paths.jsFiles = paths.sourceDir + paths.assetsDir + paths.scriptsDir;
paths.imageFiles = paths.sourceDir + paths.assetsDir + paths.imageDir;
paths.fontFiles = paths.sourceDir + paths.assetsDir + paths.fontDir;

// Site asset files locations.
paths.jekyllDir = 
  paths.sourceDir + paths.siteDir;
paths.jekyllSassFiles =
  paths.sourceDir + paths.siteDir + paths.jekyllAssetsDir + paths.stylesDir;
paths.jekyllJsFiles =
  paths.sourceDir + paths.siteDir + paths.jekyllAssetsDir + paths.scriptsDir;
paths.jekyllImageFiles =
  paths.sourceDir + paths.siteDir + paths.jekyllAssetsDir + paths.imageDir;
paths.jekyllFontFiles =
  paths.sourceDir + paths.siteDir + paths.jekyllAssetsDir + paths.fontDir;

// Glob patterns by file type.
paths.sassPattern = "/**/*.scss";
paths.cssPattern = "/**/*.css";
paths.jsPattern = "/**/*.js";
paths.imagePattern =
  "/**/*.+(jpg|JPG|jpeg|JPEG|png|PNG|svg|SVG|gif|GIF|webp|WEBP|tif|TIF)";
paths.mdPattern = "/**/*.+(md|MD|markdown|MARKDOWN)";
paths.htmlPattern = "/**/*.html";
paths.xmlPattern = "/**/*.xml";
paths.dataPattern = "/**/*.*+(yml|yaml|csv|json)";

// File globs
paths.htmlFilesGlob = paths.jekyllDir + paths.htmlPattern;
paths.imageFilesGlob = paths.imageFiles + paths.imagePattern;
paths.jsFilesGlob = paths.jsFiles + paths.jsPattern;
paths.mdFilesGlob = paths.jekyllDir + paths.markdownPattern;
paths.sassFilesGlob = paths.sassFiles + paths.sassPattern;
paths.txtFilesGlob = paths.jekyllDir + paths.txtPattern;
paths.xmlFilesGlob = paths.jekyllDir + paths.xmlPattern;
paths.ymlFilesGlob = paths.jekyllDir + paths.ymlPattern;

// Service Worker globs
paths.sassSwGlob = paths.jekyllSassFiles + paths.cssPattern;
paths.jsSwGlob = paths.jekyllJsFiles + paths.jsPattern;
paths.imageSwGlob = paths.jekyllImageFiles + paths.imagePattern;
paths.htmlSwGlob = paths.jekyllDir + paths.htmlPattern;

module.exports = paths;
