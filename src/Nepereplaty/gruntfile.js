
/*
This file in the main entry point for defining grunt tasks and using grunt plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkID=513275&clcid=0x409
*/
'use strict';

module.exports = function (grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Configurable paths for the application
    var appConfig = {
        app: 'frontend',
        dist: 'wwwroot'
    };

    grunt.initConfig({

        // Project settings
        yeoman: appConfig,

        // Watches files for changes and runs tasks based on the changed files
        watch: {
            typescriptapp: {
                files: ['<%= yeoman.app %>/app/{,*/}*.ts'],
                tasks: ['tslint:base', 'typescript:base', /*'karma', */'ngAnnotate:app', 'uglify:base', 'copy:dist']
            },
            typescriptadmin: {
                files: ['<%= yeoman.app %>/admin/{,*/}*.ts'],
                tasks: ['tslint:admin', 'typescript:admin', /*'karma', */'ngAnnotate:admin', 'uglify:admin', 'copy:dist']
            },
            //typescriptTest: {
            //    files: ['test/spec/{,*/}*.ts'],
            //    tasks: ['typescript:test', 'karma']
            //},
            styles: {
                files: ['<%= yeoman.app %>/css/{,*/}*.less'],
                tasks: ['less']
            },
            html: {
                files: ['<%= yeoman.app %>/**/*.html'],
                tasks: ['copy:dist']
            }/*,
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= yeoman.app %>/{,*!/}*.html',
          '.tmp/styles/{,*!/}*.css',
          '.tmp/app/{,*!/}*.js',
          '<%= yeoman.app %>/images/{,*!/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }*/
        },

        uglify: {
            base: {
                files: {
                    '<%= yeoman.dist %>/app/app.min.js': ['<%= yeoman.dist %>/app/app.js']
                }
            },
            admin: {
                files: {
                    '<%= yeoman.dist %>/admin/app.min.js': ['<%= yeoman.dist %>/admin/app.js']
                }
            }
        },

        tslint: {
            options: {
                configuration: grunt.file.readJSON('tslint.json')
            },
            base: {
                files: {
                    src: ['<%= yeoman.app %>/app/**/*.ts']
                }
            },
            admin: {
                files: {
                    src: ['<%= yeoman.app %>/admin/**/*.ts']
                }
            }
        },

        // The actual grunt server settings
        connect: {
            options: {
                port: 9000,
                // Change this to '0.0.0.0' to access the server from outside.
                hostname: 'localhost',
                livereload: 36729,
                base: './wwwroot/'
            },
            livereload: {
                options: {
                    open: true
                    // middleware: function (connect) {
                    //   return [
                    //     connect.static('.tmp'),
                    //     // connect().use(
                    //     //   '/wwwroot/lib',
                    //     //   connect.static('./lib')
                    //     // ),
                    //     // connect().use(
                    //     //   '/app/styles',
                    //     //   connect.static('./styles')
                    //     // ),
                    //     connect.static(appConfig.app)
                    //   ];
                    // }
                }
            },
            test: {
                options: {
                    port: 9001,
                    middleware: function (connect) {
                        return [
                          connect.static('.tmp'),
                          connect.static('test'),
                          connect().use(
                            '/bower_components',
                            connect.static('./bower_components')
                          ),
                          connect.static(appConfig.app)
                        ];
                    }
                }
            },
            dist: {
                options: {
                    open: true,
                    base: '<%= yeoman.dist %>'
                }
            }
        },

        less: {
            development: {
                options: {
                    compress: true,
                    yuicompress: true,
                    optimization: 2
                },
                files: {
                    '<%= yeoman.dist %>/css/main.css': '<%= yeoman.app %>/css/main.less' // destination file and source file
                }
            }
        },

        // Compiles TypeScript to JavaScript
        typescript: {
            base: {
                src: ['<%= yeoman.app %>/app/app.ts'],
                dest: '<%= yeoman.dist %>/app/app.js',
                options: {
                    module: 'amd', //or commonjs
                    target: 'es5', //or es3
                    'base_path': '<%= yeoman.app %>/app', //quoting base_path to get around jshint warning.
                    sourcemap: true,
                    declaration: false,
                    removeComments: false
                }
            },
            admin: {
                src: ['<%= yeoman.app %>/admin/app.ts'],
                dest: '<%= yeoman.dist %>/admin/app.js',
                options: {
                    module: 'amd', //or commonjs
                    target: 'es5', //or es3
                    'base_path': '<%= yeoman.app %>/admin', //quoting base_path to get around jshint warning.
                    sourcemap: true,
                    declaration: false,
                    removeComments: false
                }
            },
            test: {
                src: ['test/spec/{,*/}*.ts', 'test/e2e/{,*/}*.ts'],
                dest: '',
                options: {
                    module: 'amd', //or commonjs
                    target: 'es5', //or es3
                    sourcemap: true,
                    declaration: false,
                    removeComments: false
                }
            }
        },
        concat: {
            app: {
                options: {
                    separator: ';',
                },
                dist: {
                    src: ['<%= yeoman.dist %>/app/app.js'],
                    dest: '<%= yeoman.dist %>/app/app.js',
                }
            },
            admin: {
                options: {
                    separator: ';',
                },
                dist: {
                    src: ['<%= yeoman.dist %>/admin/app.js'],
                    dest: '<%= yeoman.dist %>/admin/app.js',
                }
            }
        },
        tsd: {
            refresh: {
                options: {
                    // execute a command
                    command: 'reinstall',
                    config: 'tsd.json'
                }
            }
        },

        // Empties folders to start fresh
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                      '.tmp',
                      '<%= yeoman.dist %>/{,*/}*',
                      '!<%= yeoman.dist %>/.git{,*/}*',
                      '!<%= yeoman.dist %>/web.config*'
                    ]
                }]
            },
            server: '.tmp'
        },

        // ng-annotate tries to make the code safe for minification automatically
        // by using the Angular long form for dependency injection.
        ngAnnotate: {
            app: {
                options: {
                    singleQuotes: true,
                    add: true,
                    remove: true,
                    sourceMap: true
                },
                dist: {
                    files: [{
                        expand: true,
                        src: '<%= yeoman.dist %>/app/app.js',
                        dest: '/'
                    }]
                }
            },
            admin: {
                options: {
                    singleQuotes: true,
                    add: true,
                    remove: true,
                    sourceMap: true
                },
                dist: {
                    files: [{
                        expand: true,
                        src: '<%= yeoman.dist %>/admin/app.js',
                        dest: '/'
                    }]
                }
            }
        },

        cssmin: {
            dist: {
                files: {
                    '<%= yeoman.dist %>/styles/main.css': [
                      '.tmp/styles/{,*/}*.css'
                    ]
                }
            }
        },

        concurrent: {
            server: [
              'typescript:base',
              'copy:styles'
            ],
            test: [
              'typescript',
              'copy:styles'
            ],
            dist: [
              'typescript',
              'copy:styles'
            ]
        },

        // Add vendor prefixed styles
        autoprefixer: {
            options: {
                browsers: ['last 1 version']
            },
            server: {
                options: {
                    map: true,
                },
                files: [{
                    expand: true,
                    cwd: '.tmp/styles/',
                    src: '{,*/}*.css',
                    dest: '.tmp/styles/'
                }]
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/styles/',
                    src: '{,*/}*.css',
                    dest: '.tmp/styles/'
                }]
            }
        },

        // Copies remaining files to places other tasks can use
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.app %>',
                    dest: '<%= yeoman.dist %>',
                    src: [
                        'admin/*.html',
                        'admin/*.htm',
                        'admin/assets/**',
                        '*.{ico,png,txt}',
                        '.htaccess',
                        '**/**/*.html',
                        '**/i/**/*.{png,jpg,jpeg,gif}',
                        '**/f/{,*/}*.*',
                        '**/lang/*.json'
                    ]
                }, {
                    expand: true,
                    cwd: '.tmp/images',
                    dest: '<%= yeoman.dist %>/images',
                    src: ['generated/*']
                }]
            },
            styles: {
                expand: true,
                cwd: '<%= yeoman.app %>/styles',
                dest: '.tmp/styles/',
                src: '{,*/}*.css'
            }
        },

        // Test settings
        karma: {
            unit: {
                configFile: 'test/karma.conf.js',
                singleRun: true
            }
        },

        bower: {
            install: {
                options: {
                    targetDir: "wwwroot/lib",
                    layout: "byComponent",
                    cleanTargetDir: false
                }
            }
        }
    });

    grunt.registerTask("default", ["bower:install"]);

    grunt.loadNpmTasks("grunt-bower-task");

    grunt.registerTask('build', [
      //'clean:dist',
 //     'tsd:refresh',
      //'autoprefixer',
      'copy:dist',
      'typescript:base',
      'concat:app',
      'ngAnnotate:app',
      'uglify:base',
      'less',
      'watch'
    ]);
    grunt.registerTask('build-admin', [
      //'clean:dist',
  //    'tsd:refresh',
      //'autoprefixer',
      'copy:dist',
      'typescript:admin',
      'concat:admin',
      'ngAnnotate:admin',
      'uglify:admin',
      'less',
      'watch'
    ]);

    grunt.registerTask('build-styles', [
      //'clean:dist',
      'copy:dist',
      'watch'
    ]);

    grunt.registerTask('serve', 'Compile then start a connect web server', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'connect:dist:keepalive']);
        }

        grunt.task.run([
          'tsd:refresh',
          'clean:server',
          'concurrent:server',
          //'autoprefixer:server',
          'connect:livereload',
          'watch'
        ]);
    });
};
