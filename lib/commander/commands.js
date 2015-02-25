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
},{
	'event':'new',
	'alias':['n'],
	'desc':'create a new article of slog',
	'fn':require('../app/article').newArticle
},{
	'event':'remove',
	'alias':['r'],
	'desc':'delete an article of slog',
	'fn':require('../app/article').removeArticle
},{
	'event':'generate',
	'alias':['g'],
	'desc':'generate all file to html',
	'fn':require('../app/generate')
},{
	'event':'deploy',
	'alias':['d'],
	'desc':'deploy blog file to repo',
	'fn':require('../app/deploy')
}]