var cwd = process.cwd();
var path = require('path');
var fs = require('fs');

var Theme = module.exports = function Theme(theme){
	this.themeName = theme || 'default';
	this.themeDir = path.join(cwd,'_themes/'+theme+'/template/');
}


Theme.pageName = {
	'INDEX':'index',
	'ARTICLE':'article',
	'ARTICLE_LIST':'article_list',
	'TAG_LIST':'filter',
	'ARTICLE_BY_TAG':'filter_result_list',
}

Theme.prototype.getTemplate = function(pageName,engine){
	var templateFileName = Theme.pageName[pageName];
	engine = '.'+engine;
	return this.themeDir+templateFileName+engine;
}