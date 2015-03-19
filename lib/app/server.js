var connect = require('connect');
var cpr = require('connect-power-route');
var http = require('http');
var path = require('path');
var YAML = require('yamljs');
var Watcher = require('./watcher');
var colors = require('colors');
var Digger = require('./digger');
var async = require('async');
var View = require('./view');
var Theme = require('../theme');
var DataParser = require('./dataParser');

/*
handle start server event
 */
module.exports = function(cwd, args, callback) {

    var app = connect();

    var postDir = path.join(cwd, '_posts');
    // var blogDir = path.join(cwd, 'blog');

    //Data analyser
    var dataParser;
    //view
    var view;
    //start watching files change
    var watcher = new Watcher();
    //data digger
    var digger = new Digger();
    //init the blog data
    digger.getData(postDir, function(err, data) {
        dataParser = new DataParser(data);
        view = new View(dataParser)
    })
    
    async.waterfall([
        function(next) {
            watcher.start(postDir, function(fileDir) {
                next(null, fileDir);
            });
        },
        function(fileDir, next) {
            digger.digArticle(fileDir, function(err, data) {
                next(data);
            });
        }
    ], function(data) {
        dataParser.mixArticle(data);
    });

    app.use(cpr(function(router) {

        router.get('/', function(req, res, next) {
            view.render(req,res,next,View.PAGE.INDEX);
        });

        router.get('/index.html', function(req, res, next) {
            view.render(req,res,next,View.PAGE.INDEX);
        });

        router.get('/:year(\\d{4})/:month(\\d{1,2})/:day(\\d{1,2})/:articleName', function(req, res, next) {
            view.render(req,res,next,View.PAGE.ARTICLE);
        });

        router.get('/articles', function(req, res, next) {
            view.render(req,res,next,View.PAGE.ARTICLE_LIST);
        });

        router.get('/tags', function(req, res, next) {
            view.render(req,res,next,View.PAGE.TAG_LIST);
        });

        router.get('/tags/:tagName', function(req, res, next) {
            view.render(req,res,next,View.PAGE.ARTICLE_BY_TAG);
        });

        router.get('/resource/:resourceName*',function(req,res,next){
            view.getResource(req,res,next);
        })

        router.get('/static/:resourceName*',function(req,res,next){
            view.getStatic(req,res,next);
        })

    }));

    var port = digger.configData.port || 4000;

    var server = http.createServer(app).listen(port, function() {
        console.log('Blogo is running at ' + ('http://localhost:' + port).underline);
        console.log('Blogo watcher starts on folder ' + postDir.green);
    })
}
