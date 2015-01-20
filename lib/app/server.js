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
    //start watching files change
    var watcher = new Watcher();
    //data digger
    var digger = new Digger();
    //init the blog data
    digger.digDir(postDir, function(err, data) {
        dataParser = new DataParser(data);
    })

    //view renderer
    var view = new View(dataParser);

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

    //router
    app.use(connectRoute(function(router) {
        router.get('/', function(req, res, next) {
            res.end('index');
            next();
        });

        router.post('/tags', function(req, res, next) {
            res.end('tagList');
        });

        router.get('/index.html', function(req, res, next) {
            res.end('index');
        });

        router.get('/:year/:month/:day/:article', function(req, res, next) {
            res.end('article');
        });

        router.post('/tags/:tag', function(req, res, next) {
            res.end('articleByTag');
        });

        router.post('/articles', function(req, res, next) {
            res.end('articleList');
        });
    }));

    var server = http.createServer(app).listen(port, function() {
        console.log('Slog is running at ' + ('http://localhost:' + port).underline);
        console.log('Slog watcher starts on folder ' + postDir.green);
    })
}
