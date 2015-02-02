module.exports = [{
    'event': 'init',
    'alias': ['i'],
    'desc': 'create a new blog by slog',
    'fn': require('../app/init')
},{
    'event': 'server',
    'alias': ['s'],
    'desc': 'start slog ...',
    'fn': require('../app/server')
},{
	'event':'sample',
	'alias':[],
	'desc':'create a new sample of slog',
	'fn':require('../app/sample').init
}]

