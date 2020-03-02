const gulp = require('gulp');
var nunjucksRender = require('gulp-nunjucks-render');
var browserSync = require("browser-sync").create();

function njk(cb) {
  return gulp.src('tpl/*.njk')
    // Renders template with nunjucks
    .pipe(nunjucksRender({
      path: ['tpl/', 'layout/']
    }))
    // output files in app folder
    .pipe(gulp.dest('./')),
    cb();
}

function style(cb) {
  return gulp.src('css/*.css')
    // Renders template with nunjucks
    .pipe(nunjucksRender({
      path: ['css/']
    })),
    cb();
}

function scripts(cb) {
  return gulp.src('js/*.js')
    // Renders template with nunjucks
    .pipe(nunjucksRender({
      path: ['js/']
    })),
    cb();
}

function watch() {
  browserSync.init({
    // You can tell browserSync to use this directory and serve it as a mini-server
    server: {
      baseDir: "./"
    }
    // If you are already serving your website locally using something like apache
    // You can use the proxy setting to proxy that instead
    // proxy: "yourlocal.dev"
  });
  gulp.watch("**/*.njk", njk);
  // gulp.watch("**/*.njk").on('change', browserSync.reload);
  gulp.watch("./*.html").on('change', browserSync.reload);
  gulp.watch("./css/*.css").on('change', browserSync.reload);
  gulp.watch("./js/*.js").on('change', browserSync.reload);
}

exports.default = gulp.series(gulp.parallel(njk), watch);