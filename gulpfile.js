var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    plumber = require('gulp-plumber'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cssmin = require('gulp-cssmin'),
    concatCss = require('gulp-concat-css');

var browserSync = require('browser-sync').create();

gulp.task('browser-sync', function(){

  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
});


//browser sync reload
gulp.task('bs-reload', function(){

  browserSync.reload();
});


// concat js
gulp.task('scripts',['uglify'], function(){
  //var mainjs = gulp.src('./src/js/*.js').pipe(uglify({output: {comments: "all"}}));

  return gulp.src(['./src/vendor/js/jquery.min.js', './src/vendor/js/bootstrap.min.js', './src/jsmin/main.js'])
    .pipe(plumber({
      errorHandler: function(err){
        console.log(err.message);
        this.emit('end');
      }
    }))
    .pipe(concat('all.js'))
    .pipe(gulp.dest('./dist/js'));


});

// uglify js
gulp.task('uglify', function(){
  return gulp.src('./src/js/*.js')
    .pipe(plumber({
      errorHandler: function(err){
        console.log(err.message);
        this.emit('end');
      }
    }))
    .pipe(uglify({output: {comments: "all"}}))
    .pipe(gulp.dest('./src/jsmin/'));

});

//css
//gulp.task('css', )



//sass
gulp.task('sass', function(){

  return gulp.src('./src/scss/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer('last 30 versions'))
    .pipe(cssmin())
    .pipe(gulp.dest('./src/css'));
    
});

//concat css
gulp.task('concatCss', ['sass'],function(){
  return gulp.src(["./src/vendor/css/bootstrap.css", "./src/css/main.css"])
    .pipe(concatCss("bundle.css"))
    .pipe(cssmin())
    .pipe(gulp.dest('./dist/css/'))
    .pipe(browserSync.stream());
});

gulp.task('default',['browser-sync'], function(){
  gulp.watch("./src/js/*.js", ["scripts"]);
  gulp.watch("./src/scss/*.scss", ["concatCss"]);
  gulp.watch("./*.html",["bs-reload"]);
});
