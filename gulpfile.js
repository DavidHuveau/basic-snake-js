const gulp = require("gulp");
const concat = require("gulp-concat");

const JS_SOURCES_FILES = "assets/scripts/**/*.js";
const JS_BUILD_FOLDER = "public/build/scripts";

gulp.task("default", function () {

});

gulp.task("scripts", function() {
  return gulp.src(JS_SOURCES_FILES)
      .pipe(concat("scripts.js"))
      .pipe(gulp.dest(JS_BUILD_FOLDER));
});
