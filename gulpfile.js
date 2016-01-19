var browserify = require('browserify'),
    watchify = require('watchify'),
    gulp = require('gulp'),
    source = require('vinyl-source-stream'),
    sourceFile = './js/main.js',
    destFolder = './js/',
    destFile = 'findem.js';