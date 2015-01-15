var fs = require('fs');
var path = require('path');
var Digger = require('./digger');

var Watcher = module.exports = function Watcher() {}

Watcher.prototype.start = function(dirname) {

	var digger = new Digger();

    fs.watch(dirname, function(event, filename) {
        if (path.extname(filename) === '.md') {
        	var fileDir = path.join(dirname,filename);
        	digger.digFile(fileDir,function(data){
        		if(data){
        			console.log(data);
        		}
        	});
        }
    });
}

Watcher.prototype.stop = function(dirname) {
    // fs.unwatch(dirname);
}
