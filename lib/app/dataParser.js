var _ = require('underscore');
var Article = require('./article');

/*
data analyser class
merge object to postData
 */
var DataParser = module.exports = function DataParser(data) {
    this.sourceData = data ? data : {};
    this.data = mix(data);
}

/*
get the article data , merge the article data to Data.data
 */
DataParser.prototype.mixArticle = function(data){

}

/*
get all md data , merge the md data to object
 */
function mix(data) {

    var articles = [];
    var tags = {};
    var dates = {};

    data.forEach(function(o, i) {

    	var article = new Article(o)

        articles.push(article);

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
    	'articles':articles,
    	'tags':tags,
    	'dates':dates
    };
}

