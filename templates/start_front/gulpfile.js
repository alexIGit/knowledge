'use strict';

const $ = require('gulp-load-plugins')()
  , gulp = require('gulp')
  , del = require('del')
  , clean = require('clean')
;

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

let path = {
    dst: {
        dst: './build',
        script: 'build/script/',
        style: 'build/style/',
        img: 'build/img/',
        php: 'build/php/',
        favicon: 'build/',

        fonts: 'build/fonts/',
        uncss: 'build/*.html',
    },
    src: {                   //Пути откуда брать исходники
        html: 'src/*.html', //Синтаксис src/*.html говорит gulp что мы хотим взять все файлы с расширением .html
        script: 'src/script/*.js',//В стилях и скриптах нам понадобятся только main файлы
        style: 'src/scss/*.scss',
        img: 'src/img/**/*.*', //Синтаксис img/**/*.* означает - взять все файлы всех расширений из папки и из вложенных каталогов
        php: 'src/php/**/*.*',
        favicon: 'src/favicon.png',

        fonts: 'src/fonts/**/*.*',
    },
    watch: { //Тут мы укажем, за изменением каких файлов мы хотим наблюдать
        html: 'src/**/*.html',
        script: 'src/script/**/*.js',
        style: 'src/scss/**/*.scss',
        img: 'src/img/**/*.*',
        php: 'src/php/**/*.*',
        browserSync: 'build/**/*.*',


        fonts: 'src/fonts/**/*.*'
    },
    manifest: {
        dest: 'manifest',
        css: 'manifest/css.json'
    },
};

function lazyRequireTask(taskName, path, options) {
    options = options || {};
    options.taskName = taskName;
    gulp.task(taskName, function(callback) {
        let task = require(path).call(this, options);
        return task(callback);
    });
}

lazyRequireTask('styles', './tasks/styles', {
    src: path.src.style,
    uncss: path.dst.uncss,
    manifest: path.manifest.dest,
    dst: path.dst.css,
    }
);

lazyRequireTask('clean', './tasks/clean', {
    dst: path.dst.dst,
});

lazyRequireTask('html', './tasks/html', {
    src: path.src.html,
    manifest: path.manifest.css,
    dst: path.dst.dst
});
lazyRequireTask('img', './tasks/img', {
    src: path.src.img,
    dst: path.dst.img
});

lazyRequireTask('scripts', './tasks/scripts', {
    src: path.src.js,
    dst: path.dst.js
});

lazyRequireTask('php', './tasks/php', {
    src: path.src.php,
    dst: path.dst.php
});
lazyRequireTask('favicon', './tasks/favicon', {
    src: path.src.favicon,
    dst: path.dst.favicon
});

gulp.task('watch',function(){
    gulp.watch(path.watch.style, gulp.series('styles'));
    gulp.watch(path.watch.html, gulp.series('html'));
    gulp.watch(path.watch.img, gulp.series('img'));
    gulp.watch(path.watch.script, gulp.series('scripts'));
    gulp.watch(path.watch.php, gulp.series('php'));

});

lazyRequireTask('serve', './tasks/serve', {
    dst: path.dst.dst,
    watch: path.watch.browserSync
});

gulp.task('build', gulp.series(
    'clean', 'html',
    gulp.parallel('styles', 'img', "scripts", "php", "favicon")
));

gulp.task('dev', gulp.series('build', gulp.parallel('watch', 'serve')) );
