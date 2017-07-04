var gulp           = require('gulp'),
		gutil          = require('gulp-util' ),
		postcss 			= require('gulp-postcss'),
		sourcemaps 		= require('gulp-sourcemaps'),
		browserSync    = require('browser-sync'),
		concat         = require('gulp-concat'),
		uglify         = require('gulp-uglify'),
		rename         = require('gulp-rename'),
		del            = require('del'),
		imagemin       = require('gulp-imagemin'),
		cache          = require('gulp-cache'),
		notify         = require("gulp-notify"),
		sortCSSmq 		 = require('sort-css-media-queries');



// ## Скрипты проекта ##
// Минифицирую общий файл
gulp.task('common-js', function() {
	return gulp.src([
		'app/js/common.js',
		])
	.pipe(concat('common.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('app/js'));
});
//Соединаяем все скрипты в один общий файл.
gulp.task('js', ['common-js'], function() {
	return gulp.src([
		'app/libs/jquery/dist/jquery.min.js', // сюда вписываем установленные библиотеки
		'app/libs/slick-carousel/slick/slick.min.js',
		'app/libs/isotope/dist/isotope.pkgd.min.js',
		'app/libs/slick-lightbox/dist/slick-lightbox.min.js',
		'app/js/common.min.js' // Всегда в конце
		])
	.pipe(concat('scripts.min.js'))
	// .pipe(uglify()) // Минимизировать весь js (на выбор)
	.pipe(gulp.dest('app/js'))
	.pipe(browserSync.reload({stream: true}));
});

// ## Синхронизация браузеров и авто перезагрузка ##
gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false,
		// tunnel: true,
		// tunnel: "projectmane", //Demonstration page: http://projectmane.localtunnel.me
	});
});

// sass styles
//gulp.task('sass', function() {
	//return gulp.src('app/sass/**/*.sass')
	//.pipe(sass({outputStyle: 'expand'}).on("error", notify.onError()))
	//.pipe(autoprefixer(['last 15 versions']))
	//.pipe(cleanCSS()) // Опционально, закомментировать при отладке
	//.pipe(gulp.dest('app/css'))
//});

// PostCss обработка
gulp.task('css', function () {
    return gulp.src('app/postcss/*.css')
        .pipe(sourcemaps.init())
        .pipe(postcss([
					require('precss'),
					require('postcss-clearfix'),
					require('autoprefixer')({browsers: ['last 15 versions']}),
					require('postcss-focus'),
					require('postcss-colour-functions'),
					require('postcss-custom-media'),
					require("css-mqpacker")({sort: sortCSSmq}),
					require('cssnano')
				], {syntax: require('postcss-scss')}).on("error", notify.onError()))
        .pipe(sourcemaps.write('.'))
				.pipe(rename({suffix: '.min', prefix : ''}))
        .pipe(gulp.dest('app/css/'))
				.pipe(browserSync.reload({stream: true}));
});

// слежение за файлами
gulp.task('watch', ['css', 'js', 'browser-sync'], function() {
	gulp.watch('app/postcss/**/*.css', ['css']);
	gulp.watch(['libs/**/*.js', 'app/js/common.js'], ['js']);
	gulp.watch('app/*.html', browserSync.reload);
});

//Оптимизация изображений на прод
gulp.task('imagemin', function() {
	return gulp.src('app/img/**/*')
	.pipe(cache(imagemin()))
	.pipe(gulp.dest('dist/img'));
});

// задание на прод
gulp.task('build', ['removedist', 'imagemin', 'css', 'js'], function() {

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
// Удаляем папку прода перез заданием на прод
gulp.task('removedist', function() { return del.sync('dist'); });
gulp.task('clearcache', function () { return cache.clearAll(); });

gulp.task('default', ['watch']);
