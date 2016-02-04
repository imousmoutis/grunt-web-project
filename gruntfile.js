module.exports = function(grunt) {

  grunt.initConfig({

    bower_concat: {
      all: {
        dest: 'public/src/js/bower.js',
        cssDest: 'public/src/css/bower.css',
        options: { separator : ';' }
      }
    },

    uglify: {
      build: {
        files: {
          'public/dist/src/js/app.min.js': ['public/src/js/bower.js']
        } 
      }
    },

    cssmin: {
      options: {
        keepSpecialComments : 0
      },
      target: {
        files: {
          'public/dist/src/css/app.min.css' : ['public/src/css/bower.css']
        }
      }
    },

    copy: {
        dist: {
            files: [{
                expand: true,
                dot: true,
                cwd: 'public/src/img/',
                dest: 'public/dist/src/img/',
                src: ['*.ico']
            }]
        }
    },

    imagemin: {
      png: {
        options: {
          optimizationLevel: 7
        },
        files: [
          {
            // Set to true to enable the following options…
            expand: true,
            // cwd is 'current working directory'
            cwd: 'public/src/img/',
            src: ['*.png'],
            // Could also match cwd line above. i.e. project-directory/img/
            dest: 'public/dist/src/img/',
            ext: '.png'
          }
        ]
      },
      jpg: {
        options: {
          progressive: true
        },
        files: [
          {
            // Set to true to enable the following options…
            expand: true,
            // cwd is 'current working directory'
            cwd: 'public/src/img/',
            src: ['*.jpg'],
            // Could also match cwd. i.e. project-directory/img/
            dest: 'public/dist/src/img/',
            ext: '.jpg'
          }
        ]
      }
    },

    watch: {
      css: {
        files: ['public/src/css/*.css'],
        tasks: ['cssmin']
      },
      js: {
        files: ['public/src/js/*.js'],
        tasks: ['uglify']
      }
    },

    nodemon: {
      dev: {
        script: 'server.js'
      }
    },

    open: {
      dev: {
        path: 'http://localhost:9001'
      }
    },

    concurrent: {
      options: {
        logConcurrentOutput: true
      },
      tasks: ['nodemon', 'open', 'watch']
    },  

    war: {
      target: {
        options: {
          war_dist_folder: 'public',
          war_name: 'project',
          webxml_welcome: 'index.html',
          webxml_display_name: 'project',
          webxml_mime_mapping: [{ 
            extension: 'woff', 
            mime_type: 'application/font-woff' 
          }]
        },
        files: [{
          expand: true,
          cwd: 'public/dist',
          src: ['**'],
          dest: ''
        }]
      }
    }

 
  });

  require('load-grunt-tasks')(grunt);

  grunt.registerTask('default', ['uglify', 'cssmin', 'concurrent']);

  grunt.registerTask('buildbower', [
    'bower_concat'
  ]);

  grunt.registerTask('buildimg', [
    'imagemin', 'copy'
  ]);

  grunt.registerTask('buildwar', [
    'war'
  ]);

};