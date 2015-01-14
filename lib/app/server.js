var connect = require('connect');
var http = require('http');
var path = require('path');
var YAML = require('yamljs');
var Watcher = require('./watcher');
var serveStatic = require('serve-static');
var colors = require('colors');

/*
handle start server event
 */
module.exports = function(cwd, args, callback) {

    var configFile = path.join(cwd, '_config.yml');
    var config = YAML.load(configFile);
    var port = config.port || 4000;
    var app = connect();

    //test area
    var postDir = path.join(cwd, '_posts');
    var blogDir = path.join(cwd, 'blog');

    //start watching files change
    var watcher = new Watcher();
    watcher.start(postDir);

    //start static server
    app.use(serveStatic(blogDir));
    var server = http.createServer(app).listen(port, function() {
            console.log('Slog is running at '+('http://localhost:' + port).underline);
            console.log('Slog watcher starts on folder '+postDir.green);
        })
}
