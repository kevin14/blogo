var register = require('./init/register');
var Slog = require('./core/slog');

module.exports = function(cwd,args){
	register.handle(cwd,args,function(err){
		// handle err
	});
}