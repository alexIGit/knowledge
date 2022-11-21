'use strict';

const $ = require('gulp-load-plugins')()
  , gulp = require('gulp')
  , combine = require('stream-combiner2').obj
;

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

module.exports = function(options) {

    return function() {
        return combine(
          gulp.src(options.src),
          $.if(isDevelopment, $.sourcemaps.init()),
          $.sass(),

          $.if(!isDevelopment, $.autoprefixer({
              grid: true,
              browsers: ['last 2 versions', 'ie 6-8', 'Firefox > 20'],
              // browsers: ['>1%'],
              cascade: false
          })),
          $.if(isDevelopment, $.sourcemaps.write()),
          gulp.dest(options.dst)
        ).on('error', $.notify.onError());
    };

};
