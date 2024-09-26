/*
	Si sale error de que debe usar una versión superior
	Comando para usar: nvm use 16.14.1
*/

//Todas las dependencias se ponen al inicio
//Se usan en una constante
const gulp= require("gulp");
const cssmin = require("gulp-cssmin");
const rename = require("gulp-rename");
const gulpif = require("gulp-if");
const browserify = require("browserify");
const source = require("vinyl-source-stream");
const buffer = require("vinyl-buffer");
const uglify = require("gulp-uglify");
const gutil = require("gulp-util");
const minify = require("gulp-minify");
const jsonmin = require("gulp-json-minify");
//var pngSprite = require("coveo-png-sprite");
//var svgSprite = require("gulp-svg-sprite");
var order = require("gulp-order");
var concat = require("gulp-concat");
const twig = require('gulp-twig');
const htmlmin = require('gulp-htmlmin');

const iconfont = require('gulp-iconfont');
const iconfontCss = require('gulp-iconfont-css');


// ARGUMENTOS desde LINEA de COMANDOs
// argv.production es el nombre de la variable en linea de comandos
// ej. Tarea default:  gulp --production  corresponde a argv.production
// Se puede cambiar a argv.caca y en línea de comando sería --> gulp --caca
// IMPORTANTE si en linea de comandos viene --production entonces el valor es TRUE sino FALSE
// IMPORTANTE si se quiere pasar un valor en especial a production se usa --> gulp --production 1452
// En este caso el valor de production será 1452 y con eso ya se puede hacer comparaciones
const argv = require("yargs").argv;
var isProduction = argv.production === undefined ? false : argv.production;
var caca = argv.caca === undefined ? false : argv.caca;

//Para evitar error en la consola: The following tasks did not complete:
//Se usa done en los argumentos y una función done() al final de cada task definida
// No sé de dónde fuck es la función "done();" pero hay que investigar

gulp.task("default", (done) => {
	console.log("Default tarea. VAriable isProduction: " + isProduction);
	console.log("Default tarea. VAriable caca: " + caca);
	done();
});


const fontName = 'my-icons'; // Nombre de la fuente personalizada

gulp.task('iconfont', function() {
    return gulp.src(['src/icons/svg/*.svg']) // Ruta a tus archivos SVG
        .pipe(iconfontCss({
            fontName: fontName,
            path: 'src/templates/_icons-template.scss', // Plantilla para el archivo CSS
            targetPath: '../css/icons.css', // Ruta de destino del archivo CSS
            fontPath: '../fonts/' // Ruta de destino de los archivos de fuente
        }))
        .pipe(iconfont({
            fontName: fontName,
            formats: ['eot', 'ttf', 'woff', 'woff2'], // Formatos de fuente a generar
            normalize: true
        }))
        .pipe(gulp.dest('dist/fonts')); // Ruta de destino de las fuentes generadas
});


// CSSMIN Minificar estilos
gulp.task("cssmin", (done) => {
	const stylesNames = ["style_front_page", "style_critical", "style"];
	if (isProduction == "1234") {
		stylesNames.forEach((style) => {
			gulp
				.src(`../css/${style}.css`)
				.pipe(gulpif(isProduction, cssmin()))
				.pipe(gulpif(isProduction, rename({ basename: `${style}.min` })))
				.pipe(gulp.dest("../css/"));
		});
		console.log("terminando la minificación");
	} else {
		console.log(
			"ERROR ERROR!!! ____ VALOR DE PRODUCTION NO VALIDO ___ ERROR ERROR!!"
		);
	}
	done();
});



// Falta poner subcarpetas en src algo como ..views/**/*.twig
// Cambiar en todos los php TIMBER a las views/min/... 
gulp.task("twigmin", (done) => {
	//const stylesNames = ["style_front_page", "style_critical", "style"];
	if (isProduction == "1234") {
		gulp.src('../views/*.twig')
		//.pipe(twig())  // Compila los templates Twig
        .pipe(htmlmin({ collapseWhitespace: true }))  // Minifica el HTML resultante
		//.pipe(gulpif(isProduction, rename({ basename: 'asociaciones-min' })))
		.pipe(gulp.dest("../views/min/"));
		console.log("terminando la minificación");
	} else {
		console.log(
			"ERROR ERROR!!! ____ VALOR DE PRODUCTION NO VALIDO ___ ERROR ERROR!!"
		);
	}
	done();
});


// JSON MINIFY
gulp.task("jsonmin", (done) => {
	//const stylesNames = ["style_front_page", "style_critical", "style"];
	if (isProduction == "1234") {
		gulp.src('../a_readme/json/*.json')
			.pipe(jsonmin())
			.pipe(gulp.dest('../a_readme/json-minify/'))
			.on('error', gutil.log);
		console.log("terminando la minificación");
	} else {
		console.log(
			"ERROR ERROR!!! ____ VALOR DE PRODUCTION NO VALIDO ___ ERROR ERROR!!"
		);
	}
	done();
});


gulp.task("themejs", (done) => {
	const scriptNames = ["theme"];
	scriptNames.forEach((scriptt) => {
		gulp
			.src(`../js/${scriptt}.js`)
			.pipe(
				minify({
					ext: {
						min: ".min.js",
					},
				})
			)
			//.pipe( rename({basename: `${scriptt}.min`}))
			.pipe(gulp.dest("../js/"));
	});
	done();
});

gulp.task("cssminvendor", (done) => {
	//const stylesNames = ["style_front_page"];
	if (isProduction == "1234") {
		gulp
			.src(`../vendor/bootstrap-icons/bootstrap-icons.css`)
			.pipe(gulpif(isProduction, cssmin()))
			.pipe(gulpif(isProduction, rename({ basename: `bootstrap-icons.min` })))
			.pipe(gulp.dest("../vendor/bootstrap-icons/"));

		console.log("terminando la minificación de vendor");
	} else {
		console.log(
			"ERROR ERROR!!! ____ VALOR DE PRODUCTION NO VALIDO ___ ERROR ERROR!!"
		);
	}
	done();
});

gulp.task("scripts", (done) => {
	//const scriptNames = ["main", "front"];
	const scriptNames = ["front", "main"];
	if (isProduction == "1234") {
		scriptNames.forEach((script) => {
			browserify({
				insertGlobals: true,
				debug: !isProduction,
				entries: `./scripts/${script}.js`,
			})
				.on("error", onError)
				.transform("babelify", { presets: ["es2015"] })
				.transform("hbsfy")
				.bundle()
				.pipe(source(`./scripts/${script}.js`))
				.pipe(buffer())
				.pipe(gulpif(isProduction, uglify()))
				.pipe(rename(`${script}.min.js`))
				.pipe(gulp.dest("../js/"));
		});
		done();
		console.log("Compilación de SCRIPTS terminada");
	} else {
		console.log("Valor production INCORRECTO para compilación de SCRIPTS");
	}
});

/* gulp.task("sprite", (done) => {
	//const stylesNames = ["style_front_page"];
	if (isProduction == "1234") {
		gulp
			.src("./sprite/*.png")
			.pipe(
				pngSprite.gulp({
					cssPath: "sprite.css",
					pngPath: "sprite.png",
					namespace: "sprites",
				})
			)
			.pipe(gulp.dest("./sprite/pngs-to-sprite/"));
	} else {
		console.log(
			"el valor de prodcution no es correcto para hacer la compilación, intenta de nuevo"
		);
	}
	done();
}); */

//Concatetar tareas se usa parallel, es un método en la variable gulp
//En comand line para hacer todas las tareas se usa gulp --production 1234
//gulp.task("default", gulp.parallel("default", "cssmin", "scripts", 'concatcss-amp', 'cssmin-amp'));

//const demo = gulp.series('concatcss-amp', 'cssmin-amp');
//gulp.task('demo', demo);

/* gulp.task('demo', (done) => { 
	gulp.series('concatcss-amp', 'cssmin-amp')

	done();
});
 */


//Función definida para una parte de la compilación de scripts
function onError(err) {
	gutil.log(err);
}

// Original-->  gulp.task('build', gulp.series('jsonmin', 'cssmin', 'twigmin', 'themejs'));
gulp.task('build', gulp.series( 'cssmin', 'themejs'));

// Tarea predeterminada para hacer todas las que se pongan en la tarea build
// IMPORTANTE Para llamar en consola gulp default --production 1234
gulp.task('default', gulp.series('build'));