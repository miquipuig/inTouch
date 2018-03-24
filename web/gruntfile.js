module.exports = function(grunt) {
  grunt.initConfig({
    'loopback_auto': {
      
      'db_automigrate': {
        options: {
          dataSource: 'mysqldev',
          app: './server/server',
          config: './server/model-config',
          method: 'automigrate'
        }
      }
    }
  });
  // Load the plugin 
  grunt.loadNpmTasks('grunt-loopback-auto');
  grunt.registerTask('default', ['loopback_auto']);
};
 