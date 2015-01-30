var _ = require('underscore');
var Article = require('./article');

/*
data analyser class
merge object to postData
 */
var DataParser = module.exports = function DataParser(data) {
    this.sourceData = data.data || {};
    this.articles = [];
    this.data = mix.call(this, this.sourceData);
    this.configData = data.configData || {};
}

/*
fimd the article , replace the article data with new data
 */
DataParser.prototype.mixArticle = function(data) {

    function filter(article) {
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
    tags.list = [];
    var dates = {};
    var self = this;
    data.forEach(function(o, i) {

        var article = new Article(o)
        self.articles.push(article);

        if (o.tags && o.tags.length > 0) {
            o.tags.forEach(function(tagName, tagIndex) {
                tagName = tagName.toUpperCase();
                if (tags.hasOwnProperty(tagName)) {
                    if (!_.has(tags[tagName], o)) {
                        tags[tagName].push(article);
                    }
                } else {
                    tags[tagName] = [article];
                    tags.list.push({'name':tagName,'link':'/tags/'+tagName});
                }
            })
        }

        if (o.year && o.year.length === 4) {
            dates[o.year] = dates[o.year] || {};
            dates[o.year][o.month] = dates[o.year][o.month] || {};
            dates[o.year][o.month][o.day] = dates[o.year][o.month][o.day] || {};
            dates[o.year][o.month][o.day][o.title] = article;
        }

    })

    sort(this.articles);

    return {
        'articles': this.articles,
        'tags': tags,
        'dates': dates
    };
}

function sort(data){
    data.sort(function(a1,a2){
        return a1.timemark < a2.timemark;
    })
}
