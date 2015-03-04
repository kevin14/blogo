module.exports.commands = [{
    'event': 'init',
    'alias': ['i'],
    'desc': 'create a new blog by blogo',
    'fn': require('../app/init')
},{
    'event': 'server',
    'alias': ['s'],
    'desc': 'start blogo ...',
    'fn': require('../app/server')
},{
	'event':'sample',
	'alias':[],
	'desc':'create a new sample of blogo',
	'fn':require('../app/sample').init
},{
	'event':'new',
	'alias':['n'],
	'desc':'create a new article of blogo',
	'fn':require('../app/article').newArticle
},{
	'event':'remove',
	'alias':['r'],
	'desc':'delete an article of blogo',
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
}];

module.exports.helps = [{
	'event':'h',
	'fullname':'help',
	'desc':'blogo commands list',
	'fn':require('../app/helps').help
},{
	'event':'v',
	'fullname':'version',
	'desc':'blogo version',
	'fn':require('../app/helps').version
}]