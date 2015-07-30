'use strict';

module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    concurrent: {
      dev: ['watch', 'nodemon'],
      options: {
        logConcurrentOutput: true
      }
    },
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
    watch: {
      files: ['./src/**/*'],
      tasks: ['clean', 'copy:main', 'babel:dist']
    },
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
