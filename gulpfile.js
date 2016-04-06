var gulp = require('gulp');
var webpack = require('gulp-webpack');

gulp.task('game', function() {
  return gulp.src('assets/index.js')
    .pipe(webpack({
    	watch: true,
    	output: {
    		filename: 'index.js'
    	}
    }))
    .pipe(gulp.dest('assets/build/'));
});