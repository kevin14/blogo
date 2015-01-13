var Console = module.exports = function Console(){
	this.events = {};
}

//handle events
//@param {String} cwd exec dir
//@param {Array} args of command
Console.prototype.handle = function(cwd,args,callback){
	var command = args[0];
	var options = args.slice(1);

	if (this.events[command]){
		this.events[command]['fn'](cwd,args,callback);
	}else{
		for(option in this.events){
			for (var i = 0;i<option.length;i++){
				if (this.events[option].alias[i] === command) {
					this.events[option]['fn'](cwd,options,callback);
					return;
				};
			}
		}
		console.error('unRegisted Command : '+command);
	}
}

//register events
//@param {Object} option
//	@param {String} option.alias them option name
//	@param {String} option.desc the desc of this alias
//	@param {Function} option.func the func to exec when console alias
Console.prototype.register = function(option){
	this.events[option.event] = {
		'alias':option.alias,
		'fn':option.fn,
		'desc':option.desc
	}
}

//events list
Console.prototype.list = function(){
	return this.events;
}