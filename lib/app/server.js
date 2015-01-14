var connect = require('connect');
var http = require('http');
var async = require('async');
var util = require('../util');
var myFs = util.file;
var fs = require('fs');
var path = require('path');
var YAML = require('yamljs');
var route = require('connect-route');
var md = require('markdown').markdown;

/*
handle start server event
 */
module.exports = function(cwd, args, callback) {

    var configFile = path.join(cwd, '_config.yml');
    var config = YAML.load(configFile);
    var port = config.port || 4000;
    var app = connect();

    //test area
    var postDir = path.join(cwd,'_posts');
    var testFile = path.join(postDir,'hello-world.md');
    var html = md.toHTML('# aaa');

    console.log(testFile)

	fs.createReadStream(testFile)
		.on('error',function(err){
			console.log(err)
		})
    	.on('data',function(data){
    		console.log(data.toString())
    	})


    app.use(route(function(router) {
        router.get('/', function(req, res, next) {
        	res.end(html)
        });
    }));

    var server = http.createServer(app).listen(port, function() {
        console.log('Slog is running at http://localhost:' + port);
    })

}
