var Slog = require('./core/slog');
var init = require('./init');

module.exports = function(cwd,args){

	var slog = new Slog();

	init.call(slog.console);

	slog.console.handle(cwd,args,function(err){
		if(err){
			console.log(err);
		}
	});

}