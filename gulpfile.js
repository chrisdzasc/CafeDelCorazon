const { src, dest, watch, series } = require('gulp'); // Importamos SRC, DEST y WATCH

// CSS y SAA
const sass = require('gulp-sass')(require('sass')); // Importamos SASS
const postcss = require('gulp-postcss'); // Importamos POSTCSS
const autoprefixer = require('autoprefixer'); // Importamos AUTOPREFIXER
const sourcemaps = require('gulp-sourcemaps'); // Importamos SOURCEMAPS
const cssnano = require('cssnano');

// IMAGENES
const imagemin = require('gulp-imagemin'); // Importamos IMAGEMIN
const webp = require('gulp-webp'); // Importamos WEBP
const avif = require('gulp-avif'); // Importamos AVIF

function css( done ) {
    // Compilar SASS
    // Paso 1 - Identificar archivo,  Paso 2 - Compilarla, Paso 3 - Guardar el .css

    src('src/scss/app.scss') // Identifico
        .pipe( sourcemaps.init() ) // Inicia el sourcemaps
        .pipe( sass() ) // Compilo
        .pipe( postcss( [ autoprefixer(), cssnano() ] ) )
        .pipe( sourcemaps.write('.') ) // Guardamos el sourcemaps
        .pipe( dest('build/css') ) // Guardamos

    done();
}

function imagenes( done ){
    src('src/img/**/*') // Identifico
        .pipe( imagemin({ optimizationLevel: 3 }) )
        .pipe( dest('build/img') ) // Guardamos

    done();
}

function versionWebp( done ) {

    const opciones = {
        quality: 50
    }
    
    src('src/img/**/*.{png,jpg}') // Identifico
        .pipe( webp( opciones ) )
        .pipe( dest('build/img') ) // Guardamos

    done();
}

function versionAvif( done ){
    const opciones = {
        quality: 50
    }

    src('src/img/**/*.{png,jpg}') // Identifico
        .pipe( avif( opciones ) )
        .pipe( dest('build/img') ) // Guardamos

    done();
}

function dev(  ) {
    watch( 'src/scss/**/*.scss', css );
}

exports.css = css;
exports.dev = dev;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.default = series( css, dev );

