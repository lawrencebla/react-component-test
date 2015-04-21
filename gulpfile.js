var gulp 		= require('gulp'),
	browserify 	= require('browserify'),
	source 		= require('vinyl-source-stream'),
	babelify 	= require('babelify'),
	browserSync = require('browser-sync').create(),
	reload 		= browserSync.reload,
	less 		= require('gulp-less'),
	gulp 		= require('gulp'),
   	uglify 		= require('gulp-uglify'),
   	streamify	= require('gulp-streamify'),
   	minifyCSS 	= require('gulp-minify-css'),
   	sourcemaps 	= require('gulp-sourcemaps');

   	_buildJsxFunc = function(basePath) {
	   	return browserify(basePath + '/js/app.jsx', { debug: true })
	   		.transform(babelify)
	   		.bundle()
	   		.pipe(source('bundle.js'))
	   		.pipe(streamify(uglify()))
	   		.pipe(gulp.dest(basePath + '/build'))
		    .pipe(reload({stream: true}));
   	},
   	_buildLessFunc = function(basePath) {
   		// console.log(basePath);
		return gulp.src(basePath + '/css/main.less')
			.pipe(sourcemaps.init())
	    	.pipe(less())
	    	.pipe(minifyCSS())
	    	.pipe(sourcemaps.write())
	    	.pipe(gulp.dest(basePath + '/build'))
	    	.pipe(reload({stream: true}));
   	},
   	_watchFunc = function(basePath, taskName) {
	    gulp.watch(basePath + '/js/**/*.jsx', [taskName + '-jsx']);
	    gulp.watch(basePath + '/css/*.less', [taskName + '-less']);
	    gulp.watch(basePath + '/index.html').on('change', reload);
   	},
   	_serverFunc = function(basePath) {
   		basePath = basePath || "./"; 		
		browserSync.init({
	        server: basePath
	    });
   	},
   	/*
   	*	key is task name
   	*	eg: build-key
	*
 	*	value is folder path
  	*	eg: ./src/value
   	*/
   	taskList = {
   		"image-upload": "image_upload",
   		"scroll-panel": "scroll_panel",
   		"group-panel": "group_panel"
   	};

var createSubTask = function() {
	for(var taskName in taskList) {

		var basePath = "./src/" + taskList[taskName];
		(function(taskName, basePath) {
			// Build Jsx Task
			gulp.task(taskName + "-jsx", function () {
				return _buildJsxFunc(basePath);
			});

			// Build Less Task
			gulp.task(taskName + "-less", function () {
				return _buildLessFunc(basePath);
			});

			// Build Sub Task
			gulp.task("build-" + taskName, [taskName + "-jsx", taskName + "-less"]);

			// Watch Sub Task
			gulp.task("watch-" + taskName, ["build-" + taskName], function() {
				_watchFunc(basePath, taskName);
			});

			// Server Sub Task
			gulp.task("server-" + taskName, ["watch-" + taskName], function() {
				_serverFunc(basePath);
			});
		}) (taskName, basePath);

	}
};

var createMainTask = function() {

	var buildSubTaskList = [];
	var watchSubTaskList = [];
	for(var taskName in taskList) {
		buildSubTaskList.push("build-" + taskName);
		watchSubTaskList.push("watch-" + taskName);
	}
	watchSubTaskList.push("build");
	gulp.task("build", buildSubTaskList);
	gulp.task("watch", watchSubTaskList);
	gulp.task("server", ["watch"], function() {
		_serverFunc();
	});
};

createSubTask();
createMainTask();