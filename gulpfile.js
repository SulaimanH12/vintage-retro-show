const    gulp = require("gulp");
const    sass = require("gulp-sass");
const    htmlmin = require("gulp-htmlmin");
const    cleancss = require("gulp-clean-css");
const    postcss = require('gulp-postcss');
const    uncss = require("gulp-uncss");
const    responsive = require("gulp-responsive");
const    notify = require("gulp-notify");
const    stripDebug = require("gulp-strip-debug");
const    concat = require("gulp-concat");
const    watch = require("gulp-watch");
const    plumber = require("gulp-plumber");
const    uglify = require("gulp-uglify");
const    sourcemaps = require("gulp-sourcemaps");
const    imagemin = require("gulp-imagemin");
const    autoprefixer = require("autoprefixer");
const    browser_sync = require("browser-sync");

// ------

const assets = {
    js: "assets/js",
    css: "assets/css",
    img: "assets/img",
    html: "assets/**/*html",
    min_css: 'style.min.css',
    min_js: 'app.min.js'
};

const src = {
    sass: "src/sass/**/*.scss",
    js: "src/js/**/*.js",
    img: "src/img/*"
};

// ------

// Error Handler
const onError = (err) => {
    console.log(err);
    this.emit('end');
};

// Sass to CSS
gulp.task("sass", () => {
    return gulp.src(src.sass)
        .pipe(plumber())
        .pipe(sass())
        .pipe(cleancss())
        .pipe(concat("style.min.css"))
        .pipe(gulp.dest(assets.css))
        .pipe(sourcemaps.init())
        .pipe(postcss([autoprefixer()], [uncss({
            html:['index.html']
        })]))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(assets.css))
        .pipe(browser_sync.reload({stream: true}));
});

// ------

// Compile JS
gulp.task("js", () => {
    return gulp.src(src.js)
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(uglify())
        .pipe(stripDebug())
        .pipe(concat("app.min.js"))
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(assets.js))
        .pipe(browser_sync.reload({stream: true}));
});

// ------

// Images
gulp.task("img", () => {
    return gulp.src(src.img)
        .pipe(imagemin({
            interlaced: true,
            progressive: true,
            optimizationLevel: 5,
            svgoPlugins: [{removeViewBox: false}]
        }))
        .pipe(gulp.dest(assets.img));
})

// ------

// Watch
gulp.task('watch', () => {
    browser_sync.init({
        server: './assets'
    })
    gulp.watch(src.js, ['js']);
    gulp.watch(src.sass, ['sass']);
    gulp.watch(src.img['img']);
    gulp.watch(assets.html).on('change', browser_sync.reload);
});


// Default
gulp.task("default", ["watch", "js", "sass", "img"]);