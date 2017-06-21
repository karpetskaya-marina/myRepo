var gulp           = require('gulp'),
		gutil          = require('gulp-util' ),
		/*sass           = require('gulp-sass'),*/
		postcss 			= require('gulp-postcss'),
		sourcemaps 		= require('gulp-sourcemaps'),
		browserSync    = require('browser-sync'),
		concat         = require('gulp-concat'),
		uglify         = require('gulp-uglify'),
		rename         = require('gulp-rename'),
		del            = require('del'),
		imagemin       = require('gulp-imagemin'),
		cache          = require('gulp-cache'),
		/*autoprefixer   = require('gulp-autoprefixer'),*/
		notify         = require("gulp-notify");

// Скрипты проекта

gulp.task('common-js', function() {
	return gulp.src([
		'app/js/common.js',
		])
	.pipe(concat('common.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('app/js'));
});

gulp.task('js', ['common-js'], function() {
	return gulp.src([
		'app/libs/jquery/dist/jquery.min.js',
		'app/js/common.min.js', // Всегда в конце
		])
	.pipe(concat('scripts.min.js'))
	// .pipe(uglify()) // Минимизировать весь js (на выбор)
	.pipe(gulp.dest('app/js'))
	.pipe(browserSync.reload({stream: true}));
});

gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: true,
		// tunnel: true,
		// tunnel: "projectmane", //Demonstration page: http://projectmane.localtunnel.me
	});
});

//gulp.task('sass', function() {
	//return gulp.src('app/sass/**/*.sass')
	//.pipe(sass({outputStyle: 'expand'}).on("error", notify.onError()))

	//.pipe(autoprefixer(['last 15 versions']))
	//.pipe(cleanCSS()) // Опционально, закомментировать при отладке
	//.pipe(gulp.dest('app/css'))

//});

gulp.task('css', function () {
    return gulp.src('app/postcss/*.css')
        .pipe(sourcemaps.init())
        .pipe(postcss([
					require('precss'),
					require('postcss-focus'),
					require("css-mqpacker"),
					require('postcss-clearfix'),
					require('autoprefixer')({browsers: ['last 15 versions']}),
					require('cssnano')
				], {syntax: require('postcss-scss')}).on("error", notify.onError()))
        .pipe(sourcemaps.write('.'))
				.pipe(rename({suffix: '.min', prefix : ''}))
        .pipe(gulp.dest('app/css/'))
				.pipe(browserSync.reload({stream: true}));
});

gulp.task('watch', ['css', 'js', 'browser-sync'], function() { //тут поменять sass
	gulp.watch('app/postcss/**/*.css', ['css']);
	gulp.watch(['libs/**/*.js', 'app/js/common.js'], ['js']);
	gulp.watch('app/*.html', browserSync.reload);
});

gulp.task('imagemin', function() {
	return gulp.src('app/img/**/*')
	.pipe(cache(imagemin()))
	.pipe(gulp.dest('dist/img'));
});

gulp.task('build', ['removedist', 'imagemin', 'css', 'js'], function() { //sass

	var buildFiles = gulp.src([
		'app/*.html'
		]).pipe(gulp.dest('dist'));

	var buildCss = gulp.src([
		'app/css/main.min.css',
		]).pipe(gulp.dest('dist/css'));

	var buildJs = gulp.src([
		'app/js/scripts.min.js',
		]).pipe(gulp.dest('dist/js'));

	var buildFonts = gulp.src([
		'app/fonts/**/*',
		]).pipe(gulp.dest('dist/fonts'));

});

gulp.task('removedist', function() { return del.sync('dist'); });
gulp.task('clearcache', function () { return cache.clearAll(); });

gulp.task('default', ['watch']);
