var path = require('path');
var Acetate = require('./index');

var argv = require('yargs')
      .alias('c', 'config')
      .alias('p', 'port')
      .default('port', 3000)
      .default('clean', false)
      .default('config', 'acetate.conf.js').argv;

function run() {
  var action = argv._[0];
  var acetate = new Acetate(path.join(process.cwd(), argv.config));

  if(action === 'server'){
    acetate.server.start(argv.port);
  }

  if(action === 'watch' || action === 'server'){
    acetate.watcher.start();
  }

  acetate.load(function(){
    if(argv.clean){
      acetate.clean(function(error){
        acetate.build();
      });
    } else {
      acetate.build();
    }
  });
}

module.exports = {
  run: run
}