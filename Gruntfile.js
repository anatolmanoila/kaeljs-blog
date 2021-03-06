module.exports = function(grunt) {
    "use strict";

    pkg: grunt.file.readJSON('package.json'),

    grunt.initConfig({

        tag: {
            banner: 
                "/*!\n" +
                " * Grunt-toolbox\n" +
                " * @author Michael Lancaster\n" +
                " * @version 0.0.1\n" +
                " * Copyright 2013.\n" +
                " */\n"
        },

        // uglify js task
        uglify: {
            my_target: {
                files: {
                    'dist/public/javascripts/app.min.js': ['public/javascripts/app.js']
                }
            },
            options: {
                banner: "<%= tag.banner %>"
            }
        },

        // css minify for distribution version task
        cssmin: {
            compress: {
                files: {
                    'dist/public/stylesheets/style.min.css': [
                        'public/stylesheets/css/style.css'
                    ]
                }
            }
        },

        // sass/compass pre-processor task
        compass: {
            dev: {
                options: {
                  sassDir: 'public/stylesheets/scss',
                  cssDir: 'public/stylesheets/'
                }
            },
            production: {
                options: {
                  sassDir: 'public/stylesheets/scss',
                  cssDir: 'dist/public/stylesheets/css',
                  environment: 'production',
                  outputStyle: 'compressed',
                  force: true
                }
            }
        },

        // test with JS hint task
        jshint: {
            files: [
                'public/javascripts/*.js',
                '!public/javascripts/vendor/*.js',
                '!public/javascripts/*.min.js'
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        },

        // test with css lint task
        csslint: {
            options: {
                csslintrc: '.csslintrc'
            },

            lint: {
                src: ['public/stylesheets/*.css']
            }
        },

        // image minify
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
                        cwd: 'public/images/',
                        src: ['**/*.png'],
                        // Could also match cwd line above. i.e. project-directory/img/
                        dest: 'dist/public/images/',
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
                        cwd: 'public/images/',
                        src: ['**/*.jpg'],
                        dest: 'dist/public/images/',
                        ext: '.jpg'
                    }
                ]
            }
        },

        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    'dist/index.html': 'index.html'
                }
            }
        },

        // watch for changes on HTML, CSS and JS
        watch: {
            options: {
                livereload: true
            },
            src: {
                files: [
                    // views
                    'views/**/*.handlebars',

                    // public assets
                    'public/stylesheets/scss/**/*.scss',
                    'public/javascripts/*.js',

                    // server js
                    'routes/**/*.js',

                    // not included
                    '!public/javascripts/vendor/*.js',
                    '!public/javascripts/*.min.js'
                ],
                tasks: ['dev']
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('build', [
        'uglify',
        'compass:production',
        'cssmin',
        'imagemin',
        'htmlmin'
    ]);

    grunt.registerTask('dev', [
        'compass:dev'
    ]);

    grunt.event.on('watch', function(action, filepath, target) {
      grunt.log.writeln(target + ': ' + filepath + ' has ' + action);
    });

};