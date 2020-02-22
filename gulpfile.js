// gulpfile.js
const gulp = require('gulp');
const webserver = require('gulp-webserver');
const inject = require('gulp-inject');
const clean = require('gulp-clean');

const htmlclean = require('gulp-htmlclean');
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;

const vendor = require('./vendor');

const paths = {
  src: 'src/**/*',
  srcHTML: 'src/**/*.html',
  srcCSS: 'src/**/*.css',
  srcJS: 'src/**/*.js',
  srcVendorJS: vendor.js,
  srcVendorCSS: vendor.css,
  srcImage: 'src/**/*.{png,jpg,gif}',

  dev: 'build/dev',
  devIndex: 'build/dev/index.html',
  devCSS: 'build/dev/**/*.css',
  devJS: 'build/dev/**/*.js',

  devVendor: 'build/dev/vendor',
  devVendorCSS: 'build/dev/vendor/**/*.css',
  devVendorJS: 'build/dev/vendor/**/*.js',

  dist: 'build/dist',
  distIndex: 'build/dist/index.html',
  distCSS: 'build/dist/**/*.css',
  distJS: 'build/dist/**/*.js'
};

gulp.task('default', function () {
  console.log('Hello World!');
});

gulp.task('clean', function() {
  return gulp.src(paths.dev)
      .pipe(clean());
});

gulp.task('html', function () {
  return gulp.src(paths.srcHTML).pipe(gulp.dest(paths.dev));
});

gulp.task('css', function () {
  return gulp.src(paths.srcCSS).pipe(gulp.dest(paths.dev));
});

gulp.task('js', function () {
  return gulp.src(paths.srcJS).pipe(gulp.dest(paths.dev));
});

gulp.task('image', function () {
  return gulp.src(paths.srcImage).pipe(gulp.dest(paths.dev));
});

gulp.task('vendor-js', function() {
  return gulp.src(paths.srcVendorJS)
    .pipe(concat('vendor.min.js'))
    .pipe(gulp.dest(paths.devVendor));
});

gulp.task('vendor-css', function() {
  return gulp.src(paths.srcVendorCSS)
    .pipe(concat('vendor.min.css'))
    .pipe(gulp.dest(paths.devVendor));
});

gulp.task('copy', ['html', 'css', 'js', 'image', 'vendor-css', 'vendor-js']);

gulp.task('inject', ['copy'], function () {
  const css = gulp.src([paths.devVendorCSS, paths.devCSS]);
  const js = gulp.src([paths.devVendorJS, paths.devJS]);

  return gulp.src(paths.devIndex)
    .pipe(inject( css, { relative:true } ))
    .pipe(inject( js, { relative:true } ))
    .pipe(gulp.dest(paths.dev));
});

gulp.task('serve', ['inject'], function () {
  return gulp.src(paths.dev)
    .pipe(webserver({
      port: 3000,
      livereload: true
    }));
});

gulp.task('watch', ['serve'], function () {
  gulp.watch(paths.src, ['inject']);
});

gulp.task('clean:dist', function() {
  return gulp.src(paths.dist)
    .pipe(clean({ force: true }));
});

gulp.task('html:dist', function () {
  return gulp.src(paths.srcHTML)
    .pipe(htmlclean({
      protect: /<!--(.*?)-->/g,
    }))
    .pipe(gulp.dest(paths.dist));
});

gulp.task('css:dist', function () {
  return gulp.src(paths.srcCSS)
    .pipe(concat('lib-2.app.min.css'))
    .pipe(cleanCSS())
    .pipe(gulp.dest(paths.dist));
});

gulp.task('js:dist', function () {
  return gulp.src([
    paths.srcJS,
    'src/app/app.js'
  ]).pipe(concat('lib-2.app.min.js'))
    .pipe(uglify({
      mangle: false
    }))
    .pipe(gulp.dest(paths.dist));
});

gulp.task('image:dist', function () {
  return gulp.src(paths.srcImage).pipe(gulp.dest(paths.dist));
});

gulp.task('vendor-css:dist', function () {
  return gulp.src(paths.srcVendorCSS)
    .pipe(concat('lib-1.vendor.min.css'))
    .pipe(cleanCSS())
    .pipe(gulp.dest(paths.dist));
});

gulp.task('vendor-js:dist', function () {
  return gulp.src(paths.srcVendorJS)
    .pipe(concat('lib-1.vendor.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(paths.dist));
});

gulp.task('copy:dist', ['html:dist', 'css:dist', 'js:dist', 'vendor-css:dist', 'vendor-js:dist', 'image:dist']);

gulp.task('inject:dist', ['copy:dist'], function () {
  const css = gulp.src(paths.distCSS);
  const js = gulp.src(paths.distJS);
  return gulp.src(paths.distIndex)
    .pipe(inject( css, { relative:true } ))
    .pipe(inject( js, { relative:true } ))
    .pipe(gulp.dest(paths.dist));
});

gulp.task('build', ['inject:dist']);

gulp.task('serve:dist', ['inject:dist'], function () {
  return gulp.src(paths.dist)
    .pipe(webserver({
      port: 3000,
      livereload: true
    }));
});

gulp.task('watch:dist', ['serve:dist'], function () {
  gulp.watch(paths.src, ['inject:dist']);
});
