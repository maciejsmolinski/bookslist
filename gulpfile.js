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
 *     - Compile SASS files to CSS. Use autoprefixer to add vendor prefixes
 *     - Copy images over to destination directory
 *     - Bundle front-end scripts into one file with webpack
 *
 *   Watch:
 *     - Everything "Build" does plus...
 *     - Watch files for changes, execute tasks again if source changes
 *
 */

const gulp = require('gulp');
const sass = require('gulp-sass');
const copy = require('gulp-contrib-copy');
const webpack = require('gulp-webpack');
const autoprefixer = require('gulp-autoprefixer');

const tasks = {
  styles: { src: ['src/app.scss'], dest: './dest', watch: ['src/**/*.scss'] },
  scripts: { src: ['src/**/*.js'], dest: './' },
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

// Compile sass files and pipe through autoprefixer
gulp.task('styles', () => {
  const { src, dest } = tasks.styles;

  return gulp
           .src(src)
           .pipe(sass().on('error', sass.logError))
           .pipe(autoprefixer())
           .pipe(gulp.dest(dest))
           ;
});

// Bundle scripts with webpack and produce a single file
gulp.task('scripts', () => {
  const { src, dest } = tasks.scripts;

  return gulp
           .src(src)
           .pipe(webpack(require('./webpack.config.js')))
           .pipe(gulp.dest(dest))
           ;
});

// Execute all tasks once and exit
gulp.task('build', taskNames);

// Execute all tasks and keep watching for file changes
gulp.task('build-and-watch', [...taskNames, 'watch']);

// Default task as an alias to build once
gulp.task('default', ['build']);
