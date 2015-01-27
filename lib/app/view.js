// only jade supported
var template = 'jade';
var jade = require('jade');
var Theme = require('../theme');


var View = module.exports = function View(dataParser) {

    this.dp = dataParser;
    this.config = dataParser.configData;
    this.post = dataParser.data;
    this.theme = new Theme(this.config.theme);

}

View.prototype.render = function(req, res, next, pageName) {
	var data = {
		'config':this.config,
		'post':this.post
	}
	this.theme.getTemplate(pageName,function(t){
		var fn = jade.compile(t);
		res.end(fn(data)+'');
	});
}
