const { src, dest, watch, parallel, series } = require('gulp');

const less = require('gulp-less');
const concat = require('gulp-concat'); // -..- concat
const autoprefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify');
const svgSprite = require('gulp-svg-sprite');
const fileinclude = require('gulp-file-include');
const imagemin = require('gulp-imagemin');
const del = require('del');
const browserSync = require('browser-sync').create();
var path = require('path');

function svgSprites() {
  return src(['app/icons/*.svg', '!app/sprite/sprite.svg'])
    .pipe(
      svgSprite({
        mode: {
          stack: {
            sprite: '../sprite.svg',
          },
        },
      }),
    )
    .pipe(dest('./app/sprite'));
}

//плагин для обновления страницы после изменения
function browsersync() {
  browserSync.init({
    server: {
      baseDir: 'app/',
    },
    notify: false,
  });
}

function htmlinclude() {
  return src([
    'app/html/pages/index.html',
    'app/html/pages/about-us.html',
    'app/html/pages/article.html',
    'app/html/pages/cart.html',
    'app/html/pages/checkout-mobile.html',
    'app/html/pages/contact.html',
    'app/html/pages/earn.html',
    'app/html/pages/email-1.html',
    'app/html/pages/email-2.html',
    'app/html/pages/email-3.html',
    'app/html/pages/faq.html',
    'app/html/pages/forum-page.html',
    'app/html/pages/forum-topic.html',
    'app/html/pages/gidebook.html',
    'app/html/pages/our-advantages.html',
    'app/html/pages/pay-delivery.html',
    'app/html/pages/product-page.html',
    'app/html/pages/profile-address.html',
    'app/html/pages/profile-order-history.html',
    'app/html/pages/profile-referral.html',
    'app/html/pages/profile-setting.html',
    'app/html/pages/reviews.html',
    'app/html/pages/shop.html',
  ])
    .pipe(
      fileinclude({
        prefix: '@@',
        basepath: '@file',
      }),
    )
    .pipe(dest('app/'));
}

//конвертация в css
function styles() {
  return src('app/less/**/*.less')
    .pipe(less({ outputStyle: 'compressed' }))
    .pipe(concat('main.css'))
    .pipe(
      less({
        plugins: [autoprefixer],
      }),
    )
    .pipe(dest('./app/css'))
    .pipe(browserSync.stream());
}

function scripts() {
  return src(['node_modules/jquery/dist/jquery.js', 'app/js/main.js'])
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(dest('app/js'))
    .pipe(browserSync.stream());
}

//конвертим и уменьшаем вес графических файлов
function images() {
  return src('app/img/**/*.*')
    .pipe(
      imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.mozjpeg({ quality: 75, progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo({
          plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
        }),
      ]),
    )
    .pipe(dest('dist/img')); //сюда будут скидываться обработанные файлы из папки images
}

function build() {
  return src(['app/**/*.html', 'app/css/main.css', 'app/js/main.min.js'], { base: 'app' }) //чтоб при переносе файлов в dist они оказались в своих первонос=чальных директориях
    .pipe(dest('dist')); //переносим сюда все сконвертированные файлы проекта которые указаны выше *.html, style.min.js, main.min.js
}

function cleanDist() {
  return del('dist');
}

//монитор событий за кем следит
function watching() {
  watch(['app/less/*.less'], styles);
  watch(['app/js/**/*.js', '!app/js/main.min.js'], scripts);
  watch(['app/html/**/*'], htmlinclude);
  watch(['app/icons/*.svg'], svgSprites);
}

exports.styles = styles; //запуск функции styles
exports.scripts = scripts;
exports.browsersync = browsersync;

exports.htmlinclude = htmlinclude;

exports.watching = watching;
exports.images = images;
exports.cleanDist = cleanDist;
exports.build = series(cleanDist, images, build); //запускает глобально после команды build стерает папкуdist, конвертит images, после запускает default

exports.default = parallel(htmlinclude, svgSprites, styles, scripts, browsersync, watching); //запускает функции
