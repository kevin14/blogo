var cwd = process.cwd();
var path = require('path');
var fs = require('fs');
var View = require('../app/view');

var Theme = module.exports = function Theme(theme){
	this.themeName = theme || 'default';
	this.themeDir = path.join(cwd,'_themes/'+theme+'/template/');
}


Theme.pageName = ['index','article','article_list','filter','filter_result_list'];

Theme.prototype.getTemplate = function(pageName,engine){
	var templateFileName = Theme.pageName[pageName];
	engine = '.'+engine;
	return this.themeDir+templateFileName+engine;
}