'use strict';

module.exports = function (grunt) {
  //Loads grunt libraries dynamically as they are referenced below
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    //Run Nodemon and Watch for all file changes concurrently.
    concurrent: {
      dev: ['watch', 'nodemon'],
      options: {
        logConcurrentOutput: true
      }
    },
    //Compile ES6 compatible Javascript files using Babel from src->dist
    babel: {
        options: {
            sourceMap: true
        },
        dist: {
            files: [{
              cwd: 'src/',
              expand: true,
              src: ['**/*.js'],
              dest: 'dist/',
              ext: '.js'
            }]
        }
    },
    //Copy non-compiled (non-JS) files from src->dist
    copy: {
      main: {
        files: [{
          expand: true,
          cwd: 'src/',
          src: ['**/*', '!**/*.js'],
          dest: 'dist/'
        }]
      }
    },
    /* * *
    * Watch for any file changes in src directory. Upon file modification,
    * Delete the dist files, run the copy task, then run the Babel compile.
    * * */
    watch: {
      files: ['./src/**/*'],
      tasks: ['clean', 'copy:main', 'babel:dist']
    },
    /* * *
    * Run Nodemon and watch for changes to dist Javascript files to reload
    * node server
    * * */
    nodemon: {
      dev: {
        script: 'dist/app.js',
        options: {
          nodeArgs: ['--debug'],
          env: {
            PORT: '3000'
          },
          ignore: ['node_modules/**', 'src/**'],
          ext: 'js',
          watch: ['src']
        }
      }
    },
    clean: ['dist/**/*.*']
  });

  grunt.registerTask('compile', ['clean', 'babel']);
	grunt.registerTask('default', ['concurrent:dev']);
};
