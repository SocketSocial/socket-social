"use strict";

var babelify   = require('babelify'),
    browserify = require('browserify'),
    buffer     = require('vinyl-buffer'),
    gulp       = require('gulp'),
    gutil      = require('gulp-util'),
    livereload = require('gulp-livereload'),
    merge      = require('merge'),
    rename     = require('gulp-rename'),
    sass       = require('gulp-sass'),
    source     = require('vinyl-source-stream'),
    sourceMaps = require('gulp-sourcemaps'),
    watchify   = require('watchify');

var config = {
    js: {
        src: './src/js/main.js',       // Entry point.
        outputDir: './public/js/',  // Directory to save bundle to
        outputFile: 'bundle.js' // Name to use for bundle
    },
    css: {
        src: 'src/sass/style.scss',
        outputDir: './public/css/',
        outputFile: 'style.css'
    }
};

// This method makes it easy to use common bundling options in different tasks
function bundle (bundler) {
    // Add options to add to "base" bundler passed as parameter
    bundler
      .bundle()                                    // Start bundle
      .pipe(source(config.js.src))                 // Entry point
      .pipe(buffer())                              // Convert to gulp pipeline
      .pipe(rename(config.js.outputFile))          // Rename output from 'main.js'
      .pipe(sourceMaps.init({ loadMaps : true }))  // Strip inline source maps
      .pipe(sourceMaps.write(config.js.mapDir))    // Save source maps
      .pipe(gulp.dest(config.js.outputDir))        // Save 'bundle' to build/
      .pipe(livereload());                         // Reload browser if relevant
}

gulp.task('bundle', function () {
    var bundler = browserify(config.js.src)  // Pass browserify the entry point
                    .transform(babelify, { presets : [ 'es2015' ] });  // Then, babelify, with ES2015 preset

    bundle(bundler);  // Chain other options -- sourcemaps, rename, etc.
});

gulp.task('sass', function () {
    return gulp.src('./src/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(config.css.outputDir));
});

gulp.task('default', ['sass'], function () {
    gulp.start('sass', 'bundle');
});
