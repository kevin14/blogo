var _ = require('underscore');
var Article = require('./article');

/*
data analyser class
merge object to postData
 */
var DataParser = module.exports = function DataParser(data) {
    this.sourceData = data ? data : {};
    this.articles = [];
   	this.data = mix.call(this,data);
}

/*
fimd the article , replace the article data with new data
 */
DataParser.prototype.mixArticle = function(data){

	function filter(article){
		return article.mark === data.mark;
	}

	var result = this.articles.filter(filter)[0];

	result.modify(data);
}

/*
get all md data , merge the md data to object
 */
function mix(data) {

    var tags = {};
    var dates = {};
    var self = this;
    data.forEach(function(o, i) {

    	var article = new Article(o)
        self.articles.push(article);

        if (o.tags && o.tags.length > 0) {
            o.tags.forEach(function(tagName, tagIndex) {
                if (tags.hasOwnProperty(tagName)) {
                	if(!_.has(tags[tagName],o)){
                		tags[tagName].push(article);
                	}
                } else {
                    tags[tagName] = [article];
                }
            })
        }

        if(o.year && o.year.length === 4 ){
        	if(dates.hasOwnProperty(o.year)){
        		dates[o.year].push(article);
        	}else{
        		dates[o.year] = [article];
        	}
        }

    })

    return {
    	'articles':self.articles,
    	'tags':tags,
    	'dates':dates
    };
}

