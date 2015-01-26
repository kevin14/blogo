var connect = require('connect');
var router = require('./router');
var connectRoute = require('connect-route');
var http = require('http');
var path = require('path');
var YAML = require('yamljs');
var Watcher = require('./watcher');
var serveStatic = require('serve-static');
var colors = require('colors');
var Digger = require('./digger');
var async = require('async');
var View = require('./view');
var DataParser = require('./dataParser');

/*
handle start server event
 */
module.exports = function(cwd, args, callback) {

    var configFile = path.join(cwd, '_config.yml');
    var config = YAML.load(configFile);
    var port = config.port || 4000;
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
    digger.digDir(postDir, function(err, data) {
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

    app.use(router(function(router) {

        router.get('/', function(req, res, next) {
            view.render(req,res,next,'index')
        });

        router.get('/index.html', function(req, res, next) {
            view.render(req,res,next,'index');
        });

        router.get(/^\/(\d{4})\/(\d{1,2})\/(\d{1,2})\/(\S*)$/, function(req, res, next) {
            view.render(req,res,next,'article');
        });

        router.get('/articles', function(req, res, next) {
            view.render(req,res,next,'articleList');
        });

        router.get('/tags', function(req, res, next) {
            view.render(req,res,next,'tagList');
        });

        router.get('/tags/:tagName', function(req, res, next) {
            view.render(req,res,next,'articlesByTag');
        });

    }));

    var server = http.createServer(app).listen(port, function() {
        console.log('Slog is running at ' + ('http://localhost:' + port).underline);
        console.log('Slog watcher starts on folder ' + postDir.green);
    })
}
