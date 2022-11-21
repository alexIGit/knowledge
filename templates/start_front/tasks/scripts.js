'use strict';

const $ = require('gulp-load-plugins')()
    , gulp = require('gulp')
    , combine = require('stream-combiner2').obj
;

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';
const isLocal = process.env.NODE_ENV == 'loc';


module.exports = function(options) {
    return function() {
        return combine(
            gulp.src([
                'node_modules/babel-polyfill/dist/polyfill.js',
                options.src
            ]),
            $.if(isDevelopment, $.sourcemaps.init()),
            $.babel({
                presets: ['@babel/env']
                // presets: ['es2016']
            }),
            $.if(isDevelopment, $.sourcemaps.write()),
            gulp.dest(options.dst)
        ).on('error', $.notify.onError());
    };
};