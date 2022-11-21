'use strict';

const $ = require('gulp-load-plugins')()
    , gulp = require('gulp')
    , del = require('del')
;

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

module.exports = function(options){
    return function(){
        return del(options.dst);
    };
};
