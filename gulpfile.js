"use strict";

var gulp = require("gulp");
var plumber = require("gulp-plumber");
var sourcemap = require("gulp-sourcemaps");
var rename = require("gulp-rename");
var imagemin = require("gulp-imagemin");
var svgstore = require("gulp-svgstore");
var posthtml = require("gulp-posthtml");
var include = require("posthtml-include");
var del = require("del");
var webp = require("gulp-webp");
var jsmin = require('gulp-jsmin');
var rename = require('gulp-rename');


var sass = require("gulp-sass");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var csso = require("gulp-csso");
var server = require("browser-sync").create();

gulp.task("css", function () {
  return gulp.src("source/scss/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

gulp.task("images", function() {
  return gulp.src("source/img/**/*.{png,jpg,svg}")
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.mozjpeg({quality: 75, progressive: true}),
      imagemin.svgo({
        plugins: [
          {removeViewBox: true},
          {cleanupIDs: false},
          {removeUselessStrokeAndFill: true},
          {removeStyleElement: true}
      ]
      })
    ]))
    .pipe(gulp.dest("source/img"));
});

gulp.task("sprite", function() {
  return gulp.src("source/img/*.svg")
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"));
});

gulp.task("html", function() {
  return gulp.src("source/*.html")
    .pipe(posthtml([
      include()
    ]))
    .pipe(gulp.dest("build"));
})

gulp.task("server", function () {
  server.init({
    server: "build/",
  });

  gulp.watch("source/scss/**/*.scss", gulp.series("css"));
  gulp.watch("source/img/icon-*.svg", gulp.series("sprite", "html", "refresh"));
  gulp.watch("source/*.html", gulp.series("html", "refresh"));
});

gulp.task("copy", function() {
  return gulp.src([
    "source/fonts/**",
    "source/img/**",
    "source/js/**.min.js",
    "source/*.ico",
    "source/css/*.css"
  ], {
    base: "source"
  })
  .pipe(gulp.dest("build"));
});

gulp.task("clean", function() {
  return del("build");
});

gulp.task("refresh", function(done) {
  server.reload();
  done();
});

gulp.task("webp", function () {
  return gulp.src("source/img/**/*.{png,jpg}")
  .pipe(webp({quality: 90}))
  .pipe(gulp.dest("sourse/img"));
});

gulp.task('jsmin', function () {
  return gulp.src('source/js/**.js')
  .pipe(jsmin())
  .pipe(rename({suffix: '.min'}))
  .pipe(gulp.dest('build/js'));
});

gulp.task("build", gulp.series("clean", "jsmin", "copy", "css", "sprite", "html"));
gulp.task("start", gulp.series("build", "server"));
