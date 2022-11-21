'use strict';

const $ = require('gulp-load-plugins')()
    ,  gulp = require('gulp')
    , combine = require('stream-combiner2').obj
;

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';


module.exports = function(options) {
    return function() {
        return gulp.src(options.src, {since: gulp.lastRun('php')})
            .pipe($.newer(options.src))
            .pipe(gulp.dest(options.dst));
    };
};

module.exports = function(options) {
    return function() {
        return combine(
            gulp.src(options.src, {since: gulp.lastRun('php')}),
            $.if(isDevelopment, $.sourcemaps.init()),
            $.newer(options.src),
            gulp.dest(options.dst)
        ).on('error', $.notify.onError());
    };
};