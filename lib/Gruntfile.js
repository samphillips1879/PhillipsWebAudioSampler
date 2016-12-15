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
        predef: [ "window", "document", "console", "$", "jQuery", "$scope", "$location", "FileReader", "firebase", "setTimeout", "setInterval", "clearInterval", "XMLHttpRequest", "Recorder", "Blob"],
        esnext: true,
        globalstrict: true,
        globals: {"angular": true, "app": true, "AUD_CTX": true}
      },
      files: ['../app/**/*.js']
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
        files: ['../app/**/*.js'],
        tasks: ['jshint']
      },
      sass: {
        files: ['../sass/**/*.scss'],
        tasks: ['sass']
      }
    }
  });

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  grunt.registerTask('default', ['jshint', 'copy', 'sass', 'watch']);
};