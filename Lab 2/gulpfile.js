const gulp = require("gulp");
const concatenate = require("gulp-concat");
const cleanCSS = require("gulp-clean-css");
const autoPrefix = require("gulp-autoprefixer");
const gulpSASS = require("gulp-sass");
const changed = require("gulp-changed");
const rename = require("gulp-rename");
const imagemin = require("gulp-imagemin");

//"./src/styles/bootstrap/scss/_variables.scss"

const sassFiles = [
  "./src/styles/variables.scss",
  "./src/styles/custom.scss",
  "./node_modules/bootstrap/scss/_variables.scss"
];

const vendorJsFiles = [
  "./node_modules/jquery/dist/jquery.js",
  "./node_modules/popper.js/dist/umd/popper.min.js",
  "./node_modules/bootstrap/dist/js/bootstrap.js"
];

const imgFiles = [
  "./src/images/beagle.jpg",
  "./src/images/bulldog.jpg",
  "./src/images/doberman.jpg",
  "./src/images/goldenretriever.jpg",
  "./src/images/husky.jpg",
  "./src/images/Labrador.jpg",
  "./src/images/pomerian.jpg",
  "./src/images/poodle.jpg",
  "./src/images/rottweiler.jpg",
  "./src/images/shibainu.jpg"
];

gulp.task("sass", function(done) {
  gulp
    .src(sassFiles)
    .pipe(gulpSASS())
    .pipe(concatenate("styles.css"))
    .pipe(gulp.dest("./public/css/"))
    .pipe(autoPrefix())
    .pipe(cleanCSS())
    .pipe(rename("styles.min.css"))
    .pipe(gulp.dest("./public/css/"));
  done();
});

gulp.task("js:vendor", function(done) {
  gulp
    .src(vendorJsFiles)
    .pipe(concatenate("vendor.min.js"))
    .pipe(gulp.dest("./public/js/"));
  done();
});

const img_src = "src/images/*.+(jpg)";
gulp.task("minTest", function(done) {
  gulp
    .src(img_src)
    .pipe(changed("./public/images"))
    .pipe(imagemin())
    .pipe(gulp.dest("./public/images"));
  done();
});

gulp.task("build", gulp.parallel(["sass", "js:vendor", "minTest"]));

gulp.task("watch", function(done) {
  gulp.watch(sassFiles, gulp.series("sass"));
  gulp.watch(vendorJsFiles, gulp.series("js:vendor"));
  gulp.watch(imgFiles, gulp.series("minTest"));
  done();
});

gulp.task("default", gulp.series("watch"));
