// only jade supported right now
var template = 'jade';
var jade = require('jade');


var View = module.exports = function View(dataParser){

	this.dp = dataParser;

}


View.index = function(req,res,next){

	var param = req.url;
	console.log(param)

	res.end('indexxx');
}

View.article = function(req,res,next){
	console.log(req.params['year(\d{4})'])
	res.end('123')
}


View.articleList = function(req,res,next){

}

View.tagList = function(req,res,next){

}

View.articleByTag = function(req,res,next){
	
}