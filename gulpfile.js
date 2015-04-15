var gulp = require('gulp');
var browserify = require('browserify');

gulp.task('default', function() {
	browserify({
		basedir: 'src/image_upload/js/',
		files: ['app.jsx']
	}).bundle().transform().pipe(process.stdout);
});