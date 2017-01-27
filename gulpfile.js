// Ref. https://www.sitepoint.com/introduction-gulp-js/
// Reg. http://brianflove.com/2016/11/08/typescript-2-express-node/

/*
├── bin
│   └── www
├── dist
│   ├── interfaces
│   │   └── user.js
│   ├── models
│   │   ├── model.js
│   │   └── user.js
│   ├── routes
│   │   ├── index.js
│   │   └── route.js
│   ├── schemas
│   │   └── user.js
│   ├── server.js
│   ├── test
│   │   └── user.js
│   └── views
│       └── index.pug
├── gruntfile.js
├── package.json
├── public
├── src
│   ├── interfaces
│   │   └── user.ts
│   ├── models
│   │   ├── model.ts
│   │   └── user.ts
│   ├── npm-debug.log
│   ├── routes
│   │   ├── index.ts
│   │   └── route.ts
│   ├── schemas
│   │   └── user.ts
│   ├── server.ts
│   └── test
│       └── user.ts
└── views
    └── index.pug
*/

var
	// modules
	gulp = require('gulp'),
	gutil = require('gulp-util'),
	newer = require('gulp-newer'),
	prune = require('gulp-prune'),
	imagemin = require('gulp-imagemin'),
	htmlclean = require('gulp-htmlclean'),
	//	concat = require('gulp-concat'),
	//	deporder = require('gulp-deporder'),
	//	stripdebug = require('gulp-strip-debug'),
	uglify = require('gulp-uglify'),
	sass = require('gulp-sass'),
	postcss = require('gulp-postcss'),
	assets = require('postcss-assets'),
	autoprefixer = require('autoprefixer'),
	mqpacker = require('css-mqpacker'),
	cssnano = require('cssnano'),
	nodemon = require('gulp-nodemon'),
	sourcemaps = require('gulp-sourcemaps'),
	FileCache = require('gulp-file-cache'),
	ts = require('gulp-typescript')

// development mode?
devBuild = (process.env.NODE_ENV !== 'production'),

	// folders
	folder = {
		src: 'src/',
		dist: 'dist/'
	};

var fileCache = new FileCache();


// // image processing
// gulp.task('images', function () {
// 	var out = folder.dist + 'images/';
// 	return gulp.src(folder.src + 'images/**/*')
// 		.pipe(newer(out))
// 		.pipe(imagemin({ optimizationLevel: 5 }))
// 		.pipe(gulp.dest(out));
// });


// // HTML processing
// gulp.task('html', ['images'], function () {
// 	var out = folder.dist + 'html/';
// 	return gulp.src(folder.src + 'html/**/*')
// 		.pipe(newer(out))
// 		.pipe(devBuild ? gutil.noop() : htmlclean())
// 		.pipe(gulp.dest(out));
// });


// JavaScript processing
// var fileCache = new FileCache();
// gulp.task('js', function () {
// 	var out = folder.dist + 'js/';
// 	return gulp.src(folder.src + 'js/**/*')
// 		.pipe(fileCache.filter())
// 		.pipe(sourcemaps.init())
// 		.pipe(concat('main.js'))
// 		.pipe(devBuild ? gutil.noop() : uglify())
// 		.pipe(sourcemaps.write())
// 		.pipe(fileCache.cache())
// 		.pipe(gulp.dest(out));
// });


// Copy
gulp.task('copy', function () {
	var out = folder.dist;
	return gulp.src(['./public/**', './views/**'], { "base": "." })
		//.pipe(prune(out))
		.pipe(newer(out))
		.pipe(gulp.dest(out))
});

// TypeScript processing
var tsProject = ts.createProject("tsconfig.json");
gulp.task('ts', function () {
	var out = folder.dist;
	var stream = gulp.src(folder.src + '**/*.ts')
		//.pipe(prune(out))
		.pipe(newer(out))
		.pipe(sourcemaps.init())
		.pipe(tsProject())
		.pipe(sourcemaps.write('.', {
			includeContent: false,
			destPath: out,
			sourceRoot: '../' + folder.src
		}))
		.pipe(gulp.dest(out));
	return stream;
});


// // CSS processing
// gulp.task('css', ['images'], function () {
// 	var out = folder.dist + 'css/';
// 	return gulp.src(folder.src + 'scss/main.scss')
// 		.pipe(sass({
// 			outputStyle: 'nested',
// 			imagePath: 'images/',
// 			precision: 3,
// 			errLogToConsole: true
// 		}))
// 		.pipe(postcss([
// 			assets({ loadPaths: ['images/'] }),
// 			autoprefixer({ browsers: ['last 2 versions', '> 2%'] }),
// 			mqpacker,
// 			cssnano
// 		]))
// 		.pipe(gulp.dest(out));
// });



// run all tasks
gulp.task('real_build', ['copy', 'ts']);



gulp.task('build', ['real_build'])

// // Nodemon
// gulp.task('watch', ['real_build'], function () {
// 	return nodemon({
// 		script: folder.dist + 'js/app.js',
// 		watch: folder.src,
// 		tasks: ['build']
// 	})
// })


// // Nodemon
// gulp.task('run', ['real_build'], function () {
// 	return nodemon({
// 		script: folder.dist + 'js/app.js',
// 		watch: folder.src,
// 		tasks: ['build']
// 	})
// })


// // watch for changes
// gulp.task('watch', function () {
// 	gulp.watch(folder.src + 'images/**/*', ['images']);
// 	gulp.watch(folder.src + 'html/**/*', ['html']);
// 	gulp.watch(folder.src + 'js/**/*', ['js']);
// 	gulp.watch(folder.src + 'scss/**/*', ['css']);
// });