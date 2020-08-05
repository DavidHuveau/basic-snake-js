const gulp = require("gulp");
const concat = require("gulp-concat");
const minify = require("gulp-minify");
const cleanCss = require("gulp-clean-css");
const del = require('del');

const JS_SOURCES_FOLDER = "assets/scripts";
const JS_BUILD_FOLDER = "public/build/scripts";

const CSS_SOURCES_FILES = "assets/styles/**/*.css";
const CSS_BUILD_FOLDER = "public/build/styles";

const jsSourcesFiles = [
  "utilities",
  "cell",
  "board",
  "snake",
  "listenForInput",
  "game",
  "index"
];

gulp.task("pack-js", function() {
  const sourcesFilesOrdered = jsSourcesFiles.map(fileName => `${JS_SOURCES_FOLDER}/${fileName}.js`);
  return gulp.src(sourcesFilesOrdered)
    .pipe(concat("app.bundle.js"))
    .pipe(minify())
    .pipe(gulp.dest(JS_BUILD_FOLDER));
});

gulp.task("pack-css", function () {
  return gulp.src(CSS_SOURCES_FILES)
      .pipe(concat("stylesheet.css"))
      .pipe(cleanCss())
      .pipe(gulp.dest(CSS_BUILD_FOLDER));
});

gulp.task("clean-js", function() {
  return del([JS_BUILD_FOLDER + "/*.js"]);
});

gulp.task("clean-css", function () {
  return del([CSS_BUILD_FOLDER + "/*.css"]);
});

// gulp.task(
//   "default",
//   gulp.series(
//     gulp.parallel("clean-js", "clean-css"),
//     gulp.parallel("pack-js", "pack-css")
//   )
// );

gulp.task("watch", function () {
  gulp.watch(JS_SOURCES_FOLDER + "/**/*.js", gulp.series("clean-js", "pack-js"));
  gulp.watch(CSS_SOURCES_FILES, gulp.series("clean-css", "pack-css"));
});

gulp.task("default", gulp.series("watch"));
