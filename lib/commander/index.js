var Commander = module.exports = function Commander() {
    this.events = {};
    this.helps = {};
}

//handle events
//@param {String} cwd exec dir
//@param {Array} args of command
Commander.prototype.handle = function(cwd, args, callback) {

    var command = args._[0];
    var options = args || {};
    var self = this;

    //first let helps commands passed
    for (key in this.helps) {
        if (options[key] || options[self.helps[key].fullname]) {
            self.helps[key]['fn']((cwd, options, callback));
            return;
        }
    }

    if (this.events[command]) {
        this.events[command]['fn'](cwd, options, callback);
        return;
    } else {
        for (option in this.events) {
            for (var i = 0; i < option.length; i++) {
                if (this.events[option].alias[i] && this.events[option].alias[i] === command) {
                    this.events[option]['fn'](cwd, options, callback);
                    return;
                };
            }
        }
    }

    //if there is no commands  go helps
    if (options._.length == 0 && Object.keys(options).length == 1) {
        self.helps['h']['fn']((cwd, options, callback));
        return;
    };
    console.error('unRegisted Command : ' + command);
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
    };
}

Commander.prototype.registerAll = function(options) {
    var commands = options.commands,
        helps = options.helps;

    for (var i = 0; i < commands.length; i++) {
        this.events[commands[i].event] = {
            'alias': commands[i].alias,
            'fn': commands[i].fn,
            'desc': commands[i].desc
        };
    };

    for (var i = 0; i < helps.length; i++) {
        this.helps[helps[i].event] = {
            'fullname': helps[i].fullname,
            'fn': helps[i].fn,
            'desc': helps[i].desc
        };
    };
}

//events list
Commander.prototype.list = function() {
    return this.events;
}
