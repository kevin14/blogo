// only jade supported
var template = 'jade';
var jade = require('jade');

var View = module.exports = function View(dataParser){

	this.dp = dataParser;

}

View.prototype.render = function(req,res,next,pageName){

	switch(pageName){
		case 'index':
			res.end(pageName);
			break;
		case 'article':

			var year = req.params[0];
			var month = req.params[1];
			var day = req.params[2];
			var articleName = decodeURIComponent(req.params[3]);

			console.log(articleName)
			var article = this.dp.data.dates[year][month][day][articleName]
			res.end(article.html);
			break;
		case 'articleList':
			res.end(pageName);
			break;
		case 'tagList':
			res.end(pageName);
			break;
		case 'articlesByTag':
			res.end(pageName);
			break;
		default:
			break;
	}
}

function render(){

}