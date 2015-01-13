var options = [{
    'event': 'init',
    'alias': ['i'],
    'desc': 'create a new blog by slog',
    'fn': require('./init')
},{
    'event': 'server',
    'alias': ['s'],
    'desc': 'start slog ...',
    'fn': require('./server')
}]

module.exports = function() {

    for (var i = 0; i < options.length; i++) {
        this.console.register(options[i]);
    }

}
