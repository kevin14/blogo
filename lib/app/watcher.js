var fs = require('fs');
var path = require('path');

var Watcher = module.exports = function Watcher() {
	this.data = {};
}

Watcher.prototype.start = function(dirname,callback) {


    fs.watch(dirname, function(event, filename) {
        if (path.extname(filename) === '.md') {
        	var fileDir = path.join(dirname,filename);
        	callback(fileDir);
        }
    });
}

Watcher.prototype.stop = function(dirname) {

}
