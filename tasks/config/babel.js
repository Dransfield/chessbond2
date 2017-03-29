module.exports = function(grunt) {

    grunt.config.set('babel', {
      dev: {
		  options: {
                presets: ['es2015', 'react']
            },
        files: [{
          expand: true,
          cwd: 'assets/js/',
          src: ['**/*.jsx', '!dependencies/**/*.js'],
          dest: '.tmp/public/js/',
          ext: '.jsx'
        }]
      }
    });

    grunt.loadNpmTasks('grunt-babel');
};
