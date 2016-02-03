var gulp = require('gulp');

gulp.task('copy-js', function() {
   gulp.src([
    "node_modules/es6-shim/es6-shim.js",
    "node_modules/systemjs/dist/system.js",
    "node_modules/angular2/bundles/angular2-polyfills.js",
    "node_modules/rxjs/bundles/Rx.js",
    "node_modules/angular2/bundles/angular2.dev.js",
    "node_modules/ng2-bootstrap/bundles/ng2-bootstrap.min.js"  
   ])
   .pipe(gulp.dest('./wwwroot/app/lib'));
});

gulp.task('copy-css', function() {
   gulp.src([
    "node_modules/bootstrap/dist/css/bootstrap.css"
   ]).pipe(gulp.dest('./wwwroot/app/css'));
   
   gulp.src([
    "node_modules/bootstrap/dist/fonts/*"
   ]).pipe(gulp.dest('./wwwroot/app/fonts'));
});


gulp.task('setup',['copy-js', 'copy-css']);