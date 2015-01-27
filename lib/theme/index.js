var cwd = process.cwd();
var path = require('path');

var Theme = module.exports = function Theme(theme){
	this.themeName = theme || 'default';
	this.themeDir = path.join(cwd,'_theme/'+theme);
}


Theme.pageName = {
	'INDEX':'index',
	'ARTICLE':'article',
	'ARTICLE_LIST':'article_list',
	'TAG_LIST':'filter',
	'ARTICLE_BY_TAG':'filter_result_list',
}

Theme.prototype.getTemplate = function(pageName,callback){
	callback('h1.kkk '+Theme.pageName[pageName]);
}