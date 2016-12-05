module.exports = function(grunt) {

  grunt.initConfig({
 //    browserify: {
 //      js: {
 //        src: ['../javascripts/main.js'],
 //        dest: '../dist/app.js'
 //      },
 //      options: {
 //        transform: ["hbsfy"],
 //        browserifyOptions: {
 //          paths: [
 //            "./node_modules"
 //          ]
 //        }
 //      }
 //    },
    jshint: {
      options: {
        predef: [ "document", "console", "$", "$scope"],
        esnext: true,
        globalstrict: true,
        angular: true,
        globals: {"angular": true},
        browserify: true
      },
      files: ['../javascripts/**/*.js']
    },
    copy: {
      bootstrap: {
        expand: true,
        cwd: 'node_modules/bootstrap/dist',
        src: ['**'],
        dest: '../dist'
      },
      jquery: {
        expand: true,
        cwd: 'node_modules/jquery/dist',
        src: ['jquery.min.js'],
        dest: '../dist'
      },
      angular: {
        expand: true,
        cwd: 'node_modules/angular',
        src: ['angular.min.js'],
        dest: '../dist'
      }
      // ,handlebars: {
      //   expand: true,
      //   cwd: 'node_modules/handlebars/dist/',
      //   src: ['handlebars.min.js'],
      //   dest: '../dist'
      // }
    },
    sass: {
      dist: {
        files: {
          '../css/main.css': '../sass/main.scss'
        }
      }
    },
    watch: {
      javascripts: {
        files: ['../javascripts/**/*.js'],
        tasks: ['jshint', 'browserify']
      },
      sass: {
        files: ['../sass/**/*.scss'],
        tasks: ['sass']
      }
      ,hbs: {
        files: ['../templates/**/*.hbs'],
        tasks: ['browserify']
      }
    }
  });

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  grunt.registerTask('default', ['jshint', 'copy', 'sass', 'watch']);
};