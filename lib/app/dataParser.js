var _ = require('underscore');

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

        var link = '/' + o.year + '/' + o.month + '/' + o.day + '/' + o.title + '.html';

        o.link = link;

        articles.push(o);

        if (o.tags && o.tags.length > 0) {
            o.tags.forEach(function(tagName, tagIndex) {
                if (tags.hasOwnProperty(tagName)) {
                	if(!_.has(tags[tagName],o)){
                		tags[tagName].push(o);
                	}
                } else {
                    tags[tagName] = [o];
                }
            })
        }

        if(o.year && o.year.length === 4 ){
        	if(dates.hasOwnProperty(o.year)){
        		dates[o.year].push(o);
        	}else{
        		dates[o.year] = [o];
        	}
        }

    })

    return {
    	'articles':articles,
    	'tags':tags,
    	'dates':dates
    };
}

