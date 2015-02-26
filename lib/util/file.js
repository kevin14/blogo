var fs = require('fs');
var async = require('async');
var path = require('path');
var _ = require('underscore');

//Copies a directory from `src` to `dest`.
//copy dir
//@param {String} srcPath
//@oaram {String} destPath
//@param {Func} callback function
exports.copyDir = function(src, dest, callback) {

    if (!callback) {
        callback = function() {};
    }
    async.series([
        function(next) {
            exports.mkdir(dest, next);
        }
    ], function(err) {
        if (err) return callback(err);

        fs.readdir(src, function(err, files) {
            if (err) return callback(err);

            async.each(files, function(file, next) {
                var fileSrc = path.join(src, file);
                var fileDest = path.join(dest, file);
                fs.stat(fileSrc, function(err, status) {
                    if (err) return callback(err);

                    if (status.isDirectory()) {
                        exports.copyDir(fileSrc, fileDest, next);
                    } else {
                        exports.copyFile(fileSrc, fileDest, next);
                    }
                });

            }, callback);

        });
    })
}

//delete the whole folder,sync
exports.rmDir = function(p){
    if (fs.existsSync(p)) {
        var files = fs.readdirSync(p);
        files.forEach(function(file,index){
            var curPath = path.join(p,file);
            if(fs.statSync(curPath).isDirectory()){
                exports.rmDir(curPath);
            }else{
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(p);
    };   
}

/**
 * remove the child dir of dir
 * @param  {String} dir     [the dir to empty]
 * @param  {Array} besides [the dir will not be deleted]
 */
exports.emptyDir = function(dir,besides){
    if (fs.existsSync(dir)) {
        var files = fs.readdirSync(dir);
        if (besides.length > 0) {
            files = _.difference(files,besides);
        };
        files.forEach(function(file,index){
            var curPath = path.join(dir,file);
            if(fs.statSync(curPath).isDirectory()){
                exports.rmDir(curPath);
            }else{
                fs.unlinkSync(curPath);
            }
        });
    }; 
}

//check if path exist , if the path does not exist,then create one
//@param {String} path
//@oaram {Func} callback
exports.checkPath = function(dest, callback) {
    fs.exists(dest, function(exist) {
        if (!exist) {
            fs.mkdir(dest, callback)
        }
    })
}

//create a directory
//@param {String} path
//@param {Func} callback
exports.mkdir = function(dest, callback) {
    fs.exists(dest, function(exist) {
        if (!exist) {
            fs.mkdir(dest, callback);
        }else{
        	callback();
        }
    })
}

//Copies a file from `src` to `dest`.
//copy file
//@param {String} srcPath
//@oaram {String} destPath
//@param {Func} callback function
exports.copyFile = function(src, dest, callback) {
	if (!callback) {
        callback = function() {};
    }
    var rs = fs.createReadStream(src),
      	ws = fs.createWriteStream(dest);

    rs.pipe(ws)
      .on('error', function(err){
        if (err){
          callback(err);
        }
      });

    ws.on('close', callback)
      .on('error', function(err){
        if (err){
          callback(err);
        }
      });
}
