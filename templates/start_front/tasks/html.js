'use strict';

let gulp = require('gulp')
  , $ = require('gulp-load-plugins')()
  , combine = require('stream-combiner2').obj
;

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';


module.exports = function(options) {
    return function() {
      return combine(
        gulp.src(options.src),
        $.newer(options.src),
        $.rigger(),

        $.if(!isDevelopment, $.removeHtmlComments()),
        $.if(!isDevelopment, $.htmlmin({collapseWhitespace:true})),
        gulp.dest(options.dst)

        )


        // return gulp.src(options.src)
        //     .pipe($.newer(path.src))
        //     .pipe($.rigger())
        //
        //
        //   .pipe()
        //     // .pipe($.if(!isDevelopment, $.revReplace({
        //     //     manifest: gulp.src(options.manifest, {allowEmpty: true})
        //     // })))
        //     .pipe($.if(!isDevelopment, $.htmlmin({collapseWhitespace:true})))
        //     .pipe(gulp.dest(options.dst))
    };
};
