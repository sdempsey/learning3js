var os = require("os"),
	timer = require("grunt-timer");

module.exports = function(grunt) {
	timer.init(grunt, {deferLogs: true, friendlyTime: true});
  	"use strict";

	grunt.initConfig({
		jshint: {
			all: ["public/js/src/**/*.js"]
		},
		concat: {
			debug: {
				src: ["public/js/plugins/**/*.js", "public/js/src/**/*.js"],
				dest: "public/js/scripts.js"
			}
		},
    	uglify: {
      		options: {
        		mangle: {
        	  		except: ["jQuery"]
        		},
    			preserveComments: "none",
        		sourceMap: true
  			},
      		"public/js/scripts.min.js": ["public/js/scripts.js"]
    	},
		sass: {
			options: {
				outputStyle: "nested", 
				sourceMap: true
			},			
			debug: {
				files: {
					"public/css/tmp/screen.css": "public/sass/screen.scss"
				}
			}
		},
		autoprefixer: {
			debug: {
				options: {
					map:true
				},
				expand:true,
				flatten: true,
				src: 'public/css/tmp/screen.css',
				dest: 'public/css/'
			}
		},		
	    cmq: {
      		debug: {
	        	files: { "public/css/tmp": ["public/css/tmp/*.css"] }
	      	}
	    },   
    	imagemin: {
      		dev: {
        		options: {
					optimizationLevel: 7
	        	},
        		files: [{
          			expand: true,
          			cwd: "public/img/src/",
          			src: "**/*.{jpg,png,gif,svg}",
          			dest: "public/img/"
        		}]
      		}
    	},
		webfont: {
			icons: {
				src: 'public/fonts/src/*.svg',
				dest: 'public/fonts',
				destCss: 'public/sass',
				options: {
					engine: 'node',
					font: 'fontcustom',
					hashes: false,
					stylesheet: 'scss',
					relativeFontPath: 'public/fonts/',
					template: 'templates/fontcustom.css',
					htmlDemo: false,
					templateOptions: {
						classPrefix: 'icon-',
						mixinPrefix: 'icon-'
					}
				}
			}
		},    	
    	express: {
			options: {
        		port: 1337,
  			},
      		dev: {
        		options: {
          			script: "index.js"
        		}
      		}
    	},
	    clean: ["public/**/tmp"],
		watch: {      
      		options: { livereload: true },
  			scripts: {
    		    files: ["public/js/plugins/*.js", "public/js/src/*.js"],
        		tasks: ["js"]
      		},
      		css: {
        		files: "public/sass/*.scss",
        		tasks: ["css:development", "css:production"]
      		},
      		img: {
        		files: "public/img/src/**/*.{jpg,gif,png,svg}",
        		tasks: ["img"]
      		},
      		html: {
        		files: "**/*.html",
        		tasks: []
      		}
    	}
  });

	require("load-grunt-tasks")(grunt);
	grunt.registerTask('js', ['jshint', 'concat', 'uglify', 'clean']);
	grunt.registerTask('css', ['sass', 'autoprefixer', 'cmq', 'clean']);
	grunt.registerTask('img', ['newer:imagemin']);
	grunt.registerTask("server", ["express", "watch"]);
	grunt.registerTask('default', ['js', 'css', 'img']);
}