'use strict';

var gulp = require('gulp');
var sequence = require('run-sequence');
var del = require('del');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var cssmin = require('gulp-cssmin');
var replace = require('gulp-replace');
var rename = require('gulp-rename');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var concat = require('gulp-concat');

var cf = {
    js: {
        src: [
            'src/**/*.js'
        ]
    },
    html: {
        src: [
            'src/**/*.html'
        ]
    },
    xml: {
        src: [
            'src/config.xml'
        ]
    },
    css: {
        src: [
            'src/**/*.css'
        ]
    },
    dest: 'dist/'
};

gulp.task('clean', function() {
    return del([
        cf.dest + '**/*',
        '!' + cf.dest
    ]).then(function(paths) {
        console.log('Deleted files and folders:\n', paths.join('\n'));
    });
});

gulp.task('html', function() {
    gulp
        .src(cf.html.src)
        .pipe(gulp.dest(cf.dest));
});

gulp.task('xml', function() {
    gulp
        .src(cf.xml.src)
        .pipe(gulp.dest(cf.dest));
});

gulp.task('css', function() {
    gulp
        .src(cf.css.src)
        .pipe(cssmin())
        .pipe(concat('style.css'))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(cf.dest + 'css'));
});

gulp.task('js', function() {
    var b = browserify({
        entries: 'src/entry.js',
        debug: false
    });
    return b
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())
//        .pipe(sourcemaps.init({loadMaps: true}))
//        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
//        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(cf.dest + 'js'));
});

gulp.task('build', function() {
    var tasks = [
        'html',
        'xml',
        'css',
        'js'
    ];
    sequence('clean', tasks);
});
