'use strict';

const gulp = require('gulp');

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';


module.exports = function(options) {
    return function() {
        return gulp.src(options.src)
            .pipe(gulp.dest(options.dst));
    };
};