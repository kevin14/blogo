var Console = require('./console');
// var Server = require('./server');

var Slog = module.exports = function(){
	this.console = new Console();
	// this.app = new Server();
	this.config = {};
};

