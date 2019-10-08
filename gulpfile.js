var gulp = require('gulp'),
sass = require('gulp-sass'),
browserSync = require('browser-sync').create();

function style() {
    return (
        gulp
            .src("src/assets/scss/*.scss")
 
            .pipe(sass())
            .on("error", sass.logError)
 
            .pipe(gulp.dest("src/assets/css"))
    );
}

function watch(){
    browserSync.init({
        // You can tell browserSync to use this directory and serve it as a mini-server
        // server: {
        //     baseDir: "./"
        // }
        proxy: "localhost:8080"
        // If you are already serving your website locally using something like apache
        // You can use the proxy setting to proxy that instead
        // proxy: "yourlocal.dev"
    });

    gulp.watch('src/assets/scss/*.scss', style)
    gulp.watch('src/assets/scss/layout/*.scss', style);
    gulp.watch('src/assets/scss/components/*.scss', style);
    gulp.watch('src/assets/scss/config/_commons.scss', style);
    gulp.watch('src/assets/scss/config/_fonts.scss', style);
    gulp.watch('src/assets/scss/config/_plugin.scss', style);
}

exports.style = style;
exports.watch = watch
