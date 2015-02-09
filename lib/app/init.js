/*
handle init event
to create the slog blog
 */

var async = require('async');
var util = require('../util');
var fs = util.file;
var path = require('path');

//init slog folders and files
module.exports = function(cwd,args,callback){
	var dest = args._.length > 1?path.join(cwd,args[1]):cwd;
	var src = path.join(__dirname,'../../assets');
	fs.copyDir(src,dest,callback);
}