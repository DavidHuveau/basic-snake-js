const gulp = require("gulp");
const concat = require("gulp-concat");
const minify = require("gulp-minify");

const JS_SOURCES_FILES = "assets/scripts/**/*.js";
const JS_BUILD_FOLDER = "public/build/scripts";

gulp.task("default",function(){
});

gulp.task("pack-js", function() {
  // return gulp.src(JS_SOURCES_FILES)
  //   .pipe(concat("scripts.js"))
  //   .pipe(gulp.dest(JS_BUILD_FOLDER));
  return gulp.src(JS_SOURCES_FILES)
    .pipe(concat("app.bundle.js"))
    .pipe(minify())
    .pipe(gulp.dest(JS_BUILD_FOLDER));
});
