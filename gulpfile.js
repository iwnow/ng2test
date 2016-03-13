var gulp = require('gulp');
var clean = require('gulp-clean');
var runSequence = require('run-sequence');
var ts = require('gulp-typescript');

// build browser
gulp.task('browser-clean', function () {
	// return gulp.src('app/build/browser', {read: false})
	// 	.pipe(clean());
});

gulp.task('browser-copy-html', function() {
   gulp.src([
    "app/source/browser/index.html"
   ]).pipe(gulp.dest('app/build/browser'));
});

gulp.task('browser-copy-css', function() {
   gulp.src([
    "app/source/browser/css/*.css"
   ]).pipe(gulp.dest('app/build/browser/css'));
});

gulp.task('browser-copy-i18', function() {
   gulp.src([
    "app/source/browser/i18/*.json"
   ]).pipe(gulp.dest('app/build/browser/i18'));
});

gulp.task('browser-copy-img', function() {
   gulp.src([
    "app/source/browser/img/*.*"
   ]).pipe(gulp.dest('app/build/browser/img'));
});

gulp.task('browser-tsc', function () {
    var tsProject = ts.createProject('tsconfig.json');
    var tsResult = tsProject.src(['app/source/browser/ts/**/*.ts']) // instead of gulp.src(...)
        .pipe(ts(tsProject));

    return tsResult.js.pipe(gulp.dest('app/build/browser/js'));
});

// gulp.task('copy-lib', function() {
//    gulp.src([
//     "node_modules/es6-shim/es6-shim.js",
//     "node_modules/systemjs/dist/system.js",
//     "node_modules/angular2/bundles/angular2-polyfills.js",
//     "node_modules/rxjs/bundles/Rx.js",
//     "node_modules/angular2/bundles/angular2.dev.js",
//     "node_modules/angular2/bundles/http.dev.js"
//    ])
//    .pipe(gulp.dest('app/build/browser/lib'));
// });

// for gulp 4
// gulp.task('build-browser', 
//         gulp.series('browser-clean', 
//         gulp.parallel('browser-copy-html, browser-copy-css, browser-copy-i18, browser-copy-img')));

gulp.task('build-browser', function(callback) {
  runSequence('browser-clean', /** the first task in sequence **/
    ['browser-copy-html', 'browser-copy-css', 'browser-copy-i18', 'browser-copy-img', 'browser-tsc'], /** those are run in parallel **/
    callback); /** tell the task to end **/
});
