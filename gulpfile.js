// Include gulp
var gulp = require('gulp');
var sass = require('gulp-sass');
var minifyCSS = require('gulp-minify-css');
var sourcemaps = require('gulp-sourcemaps');

// Compile Our Sass
gulp.task('sass', function() {
    return gulp.src('src/ESelect/scss/eSelect.scss')
        //.pipe(sourcemaps.init())
        .pipe(sass({noCache: true, outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(minifyCSS({
            processImport: true
        }))
        //.pipe(sourcemaps.write())
        .pipe(gulp.dest('src/ESelect/'));
});

// Watch Files For Changes
gulp.task('sass.watch', function() {
    gulp.watch('src/eSelect/scss/**/*.{scss, css}', ['sass']);
});