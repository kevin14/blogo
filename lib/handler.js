var Slog = require('./core/slog');
var init = require('./init');
var path = require('path');

module.exports = function(cwd,args){

	var slog = new Slog();

	init.call(slog);

	//start handle console events
	slog.console.handle(cwd,args,function(err){
		if(err){
			console.log(err);
		}
	});

}