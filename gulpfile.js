const gulp = require("gulp");
const browswerSync= require("browser-sync").create();
const sass = require ("gulp-sass");

//compile  SASS. Sass allow us to use variables in css. Target
// the bootstrap.scss an push to the scss folder which will be pushed to
//the src/css folder
gulp.task('sass', function(){
    return gulp.src([ 'node_modules/bootstrap/scss/bootstrap.scss','src/scss/*.scss'])
    .pipe(sass())
    .pipe(gulp.dest("src/css"))
    .pipe(browswerSync.stream());
});


//move JS files(bootstrap,jquery and tether) to the SOURCE

gulp.task('js',function(){
return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js',
'node_modules/jquery/dist/jquery.min.js',
'node_modules/tether/dist/js/tether.min.js'])
.pipe(gulp.dest("src/js"))
.pipe(browswerSync.stream());
});


//Watch SASS & SERVE
gulp.task('serve', ['sass'],function(){
    browswerSync.init({
        server: "./src"
    });

    gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'],['sass']);
    gulp.watch("src/*.html").on('change',browswerSync.reload);
});

//Move the Font Awesome Fonts Folder to src.

gulp.task("fonts", function(){
    return gulp.src('node_modules/font-awesome/fonts/*')
    .pipe(gulp.dest("src/fonts"));
});
 

// Move font awesome css file
gulp.task('fa',function(){
    return gulp.src('node_modules/font-awesome/css/font-awesome.min.css')
    .pipe(gulp.dest("src/css"));
    
});

gulp.task('default',['js','serve','fa','fonts'])