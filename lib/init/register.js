
var options = [{
    'event': 'init',
    'alias': ['i'],
    'desc': 'create a new blog by slog',
    'fn': require('./init')
}]

module.exports = function() {

    for (var i = 0; i < options.length; i++) {
        this.console.register(options[i]);
    }

}
