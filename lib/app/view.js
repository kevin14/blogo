// only jade supported
var engine = 'jade';
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
        'config': this.config,
        'post': this.post,
        'temPath':this.theme.getTemplate(pageName, engine)
    }
    switch (pageName) {
        case 'INDEX':
            break;
        case 'ARTICLE':
            renderArticle(req, res, data);
            break;
        case 'ARTICLE_LIST':
            break;
        case 'TAG_LIST':
            break;
        case 'ARTICLE_BY_TAG':
            break;
        default:
            throw ('router error')
    }
}

View.prototype.getResource = function(req,res,next){
	var resourceName = req.params.resourceName;
	res.end(resourceName)
}

function renderArticle(req, res, data) {
    var year = req.params.year;
    var month = req.params.month;
    var day = req.params.day;
    var articleName = decodeURIComponent(req.params.articleName);
    data.post.article = data.post.dates[year][month][day][articleName];
	var html = jade.renderFile(data.temPath, data);
    res.end(html);
}
