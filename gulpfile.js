var gulp = require('gulp');
var clean = require('gulp-clean');
var runSequence = require('run-sequence');
var ts = require('gulp-typescript');

var pathsBrowser = {
    tsSource: 'app/source/browser/ts/**/*.ts',
    tsOutput: 'app/build/browser/js',
    tsDef: 'typings/**/*.d.ts'
};
var pathsServer = {
    tsSource: 'app/source/server/**/*.ts',
    tsOutput: 'app/build/server',
    tsDef: 'typings/**/*.d.ts'
};
 
var tsCompilerConfig = ts.createProject('tsconfig.json');

//------------------------------------------ build browser
gulp.task('browser-clean', function () {
	return gulp.src('app/build/browser', {read: false}).pipe(clean());
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
    var tsResult = gulp.src(pathsBrowser.tsSource)
        .pipe(ts(tsCompilerConfig));
    return tsResult.js.pipe(gulp.dest(pathsBrowser.tsOutput));
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

//--------------------------server

gulp.task('server-tsc', function () {
    var tsProject = ts.createProject('tsconfig.json', { noExternalResolve: true });
    var tsResult = gulp.src([pathsServer.tsSource, pathsServer.tsDef])
        .pipe(ts(tsProject));
    return tsResult.js.pipe(gulp.dest(pathsServer.tsOutput));
});

gulp.task('server-clean', function () {
	return gulp.src('app/build/server', {read: false}).pipe(clean());
});

gulp.task('build-server', function(callback) {
    runSequence('server-clean', 'server-tsc', callback);
});


// default build
gulp.task('default', function(callback) {
    runSequence('build-server', 'build-browser', callback); /** tell the task to end **/
});

