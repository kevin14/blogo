// only jade supported
var engine = 'jade';
var jade = require('jade');
var Theme = require('../theme');
var cwd = process.cwd();
var path = require('path');
var mime = require('../util').mimeTypes;
var fs = require('fs');

var View = module.exports = function View(dataParser) {

    this.dp = dataParser;
    this.config = dataParser.configData;
    this.post = dataParser.data;
    this.theme = new Theme(this.config.theme);

}

View.PAGE = {
    INDEX: 0,
    ARTICLE: 1,
    ARTICLE_LIST: 2,
    TAG_LIST: 3,
    ARTICLE_BY_TAG: 4
};

View.prototype.render = function(req, res, next, pageName) {
    var data = {
        'config': this.config,
        'post': this.post,
        'temPath': this.theme.getTemplate(pageName, engine)
    }
    switch (pageName) {
        case View.PAGE.INDEX:
            renderIndex(req, res, data);
            break;
        case View.PAGE.ARTICLE:
            renderArticle(req, res, data);
            break;
        case View.PAGE.ARTICLE_LIST:
            renderArticleList(req, res, data);
            break;
        case View.PAGE.TAG_LIST:
            renderTagList(req, res, data);
            break;
        case View.PAGE.ARTICLE_BY_TAG:
            renderTag(req, res, data);
            break;
        default:
            throw ('router error')
    }
}

View.prototype.getResource = function(req, res, next) {
    var resourceName = req.params.resourceName;
    var filePath = path.join(cwd, '_themes/' + this.config.theme + '/resource/' + resourceName);
    sendStaticFile(res, filePath);
}

View.prototype.getStatic = function(req, res, next) {
    var resourceName = req.params.resourceName;
    var filePath = path.join(cwd, '_statics/' + resourceName);
    sendStaticFile(res, filePath);
}

View.prototype.getFileString = function(pageName, pageData) {
    var data = {
        'config': this.config,
        'post': this.post,
        'temPath': this.theme.getTemplate(pageName, engine)
    },html;
    switch (pageName) {
        case View.PAGE.INDEX:
            html = jade.renderFile(data.temPath, data);
            break;
        case View.PAGE.ARTICLE:
            var articleData = prepareDataForRenderArticle({
                year: pageData.year,
                month: pageData.month,
                day: pageData.day,
                articleName: pageData.articleName
            }, data);
            html = jade.renderFile(data.temPath, articleData);
            break;
        case View.PAGE.ARTICLE_LIST:
            html = jade.renderFile(data.temPath, data);
            break;
        case View.PAGE.TAG_LIST:
            data.post.filter = data.post.tags.list;
            html = jade.renderFile(data.temPath, data);
            break;
        case View.PAGE.ARTICLE_BY_TAG:
            var tagName = decodeURIComponent(pageData.tagName).toUpperCase();
            data.post.filterResults = data.post.tags[tagName];
            html = jade.renderFile(data.temPath, data);
            break;
        default:
            throw ('router error')
    };
    return html;
}

function renderIndex(req, res, data) {
    var html = jade.renderFile(data.temPath, data);
    res.end(html);
}

function renderArticle(req, res, data) {
    var articleData = prepareDataForRenderArticle({
        year: req.params.year,
        month: req.params.month,
        day: req.params.day,
        articleName: req.params.articleName
    }, data);
    var html = jade.renderFile(data.temPath, articleData);
    res.end(html);
}

function renderArticleList(req, res, data) {
    var html = jade.renderFile(data.temPath, data);
    res.end(html);
}

function renderTagList(req, res, data) {
    data.post.filter = data.post.tags.list;
    var html = jade.renderFile(data.temPath, data);
    res.end(html);
}

function renderTag(req, res, data) {
    var tagName = decodeURIComponent(req.params.tagName).toUpperCase();
    data.post.filterResults = data.post.tags[tagName];
    var html = jade.renderFile(data.temPath, data);
    res.end(html);
}

function sendStaticFile(res, filePath) {
    fs.exists(filePath, function(exists) {
        if (!exists) {
            res.statusCode = 404;
            res.end('not found');
        } else {
            fs.readFile(filePath, function(err, file) {
                if (err) {
                    res.end(err);
                } else {
                    var ext = path.extname(filePath);
                    ext = ext ? ext.slice(1) : 'unknown';
                    var contentType = mime[ext] || "text/plain";
                    res.charset = 'utf-8';
                    res.setHeader('Content-Type', mime[ext] || 'text/plain');
                    res.end(file);
                }
            });
        }
    });
}

function prepareDataForRenderArticle(info, data) {
    var year = info.year;
    var month = info.month;
    var day = info.day;
    var articleName = decodeURIComponent(info.articleName);
    var curArticle = data.post.article = data.post.dates[year][month][day][articleName];
    var curIndex = data.post.articles.indexOf(data.post.article);
    var nextArticle = data.post.articles[curIndex - 1];
    var prevArticle = data.post.articles[curIndex + 1];
    data.post.article.nextArticle = {
        "available": nextArticle ? true : false,
        "link": nextArticle ? nextArticle.link : curArticle.link,
        "title": nextArticle ? nextArticle.title : curArticle.title
    };
    data.post.article.prevArticle = {
        "available": prevArticle ? true : false,
        "link": prevArticle ? prevArticle.link : curArticle.link,
        "title": prevArticle ? prevArticle.title : curArticle.title
    };
    return data;
}
