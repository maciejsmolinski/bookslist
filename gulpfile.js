/**
 * Gulp.js Configuration File (Assets Pipeline)
 * Reference: http://gulpjs.com/
 *
 * Executing tasks:
 *
 *   - If you have Gulp installed globally with `npm install -g gulp-cli`
 *     and all local dependencies installed with `npm install`, please type:
 *     `gulp`
 *
 *   - Otherwise, you might want to take advantage of npm-installed binaries
 *     from node_modules. After running `npm install`, please type:
 *     `npm run build` to build files once or `npm run watch` to continuously
 *     rebuild assets on file changes
 *
 * Workflow:
 *
 *   Build:
 *     - Compile SASS files to CSS
 *     - Copy images over to destination directory
 *
 *   Watch:
 *     - Everything "Build" does plus...
 *     - Watch files for changes, execute tasks again if source changes
 *
 */

const gulp = require('gulp');
const sass = require('gulp-sass');
const copy = require('gulp-contrib-copy');

const tasks = {
  sass: { src: ['src/app.scss'], dest: './dest', watch: ['src/**/*.scss'] },
  images: { src: ['src/images/**/*'], dest: './dest/images' },
};

const taskNames = Object.keys(tasks);

// Watch task source directories and execute once change ocurred
gulp.task('watch', () => {
  Object.keys(tasks).forEach((task) => {
    gulp.watch(tasks[task].watch || tasks[task].src, [task]);
  });
});

// Copy images over to the dest dir
gulp.task('images', () => {
  const { src, dest } = tasks.images;

  return gulp
           .src(src)
           .pipe(copy())
           .pipe(gulp.dest(dest))
           ;
});

// Compile sass files
gulp.task('sass', () => {
  const { src, dest } = tasks.sass;

  return gulp
           .src(src)
           .pipe(sass())
           .pipe(gulp.dest(dest))
           ;
});

// Execute tasks once and exit
gulp.task('build', taskNames);

// Execute all tasks and keep watching for file changes
gulp.task('build-and-watch', [...taskNames, 'watch']);

// Default task as an alias to build once
gulp.task('default', ['build']);
