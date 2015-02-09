var Commander = module.exports = function Commander() {
    this.events = {};
}

//handle events
//@param {String} cwd exec dir
//@param {Array} args of command
Commander.prototype.handle = function(cwd, args, callback) {

    var command = args._[0];
    var options = args;
    if (this.events[command]) {
        this.events[command]['fn'](cwd, options, callback);
    } else {
        for (option in this.events) {
            for (var i = 0; i < option.length; i++) {
                if (this.events[option].alias[i] === command) {
                    this.events[option]['fn'](cwd, options, callback);
                    return;
                };
            }
        }
        Commander.error('unRegisted Command : ' + command);
    }
}

//register events
//@param {Object} option
//  @param {String} option.alias them option name
//  @param {String} option.desc the desc of this alias
//  @param {Function} option.func the func to exec when Commander alias
Commander.prototype.register = function(option) {
    this.events[option.event] = {
        'alias': option.alias,
        'fn': option.fn,
        'desc': option.desc
    }
}

Commander.prototype.registerAll = function(options) {
    for (var i = 0; i < options.length; i++) {
        this.events[options[i].event] = {
            'alias': options[i].alias,
            'fn': options[i].fn,
            'desc': options[i].desc
        }
    }
}

//events list
Commander.prototype.list = function() {
    return this.events;
}
