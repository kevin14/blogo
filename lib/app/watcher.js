var fs = require('fs');
var path = require('path');

var Watcher = module.exports = function Watcher() {}

Watcher.prototype.start = function(dirname) {
    fs.watch(dirname, function(event, filename) {
        if (path.extname(filename) === '.md') {
            console.log(filename)
        }
    });
}

Watcher.prototype.stop = function(dirname) {
    // fs.unwatch(dirname);
}
