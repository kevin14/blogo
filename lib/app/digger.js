/*
digger.js
a class to dig the data of the articles , like articles' count , name ,data ...
 */
var fs = require('fs');
var markdown = require('markdown').markdown;
var async = require('async');
var path = require('path');
var util = require('util');
var YAML = require('yamljs');
var cwd = process.cwd();

var Digger = module.exports = function Digger() {
    var configFile = path.join(cwd,'_config.yml');
    this.data = {};
    this.configData = YAML.load(configFile);
    this.configData.resourceUrl = '/resource';
}

Digger.prototype.start = function(postDir) {

}

Digger.prototype.digFile = dig;

Digger.prototype.digDir = function(dirname, callback) {
    async.waterfall([
        function(next) {
            fs.readdir(dirname, function(err, files) {
                next(err, files);
            })
        },
        function(files, next) {
            var paths = [];
            files.forEach(function(file, i) {
                if (path.extname(file) === '.md') {
                    var filePath = path.join(dirname, file);
                    paths.push(filePath);
                }
            })
            next(null, paths);
        },
        function(paths, next) {
            async.map(paths, digArticle, function(err, data) {
                next(err, data);
            })
        }
    ], function(err, data) {
        callback(err, data);
    })
}

Digger.prototype.digArticle = digArticle;

Digger.prototype.getData = function(dirname,callback){
    var self = this;
    this.digDir(dirname,function(err,data){
        callback(err,{data:data,configData:self.configData});
    })
}

function digArticle(fileDir, callback) {

    async.series([
        function(next) {
            fs.stat(fileDir, function(err,stats) {
                next(err, stats.ino);
            })
        },
        function(next) {
            fs.readFile(fileDir, function(err, data) {
                var md = data.toString();
                var index = md.search('\n---');
                if (index > -1) {
                    var content = md.substring(index + 4);
                    var descMd = content.substring(0, 150);
                    var html = markdown.toHTML(content);
                    var desc = markdown.toHTML(descMd);
                    var infos = md.substring(0, index);
                    var data = {
                        'title': getTitle(infos),
                        'date': getDate(infos),
                        'tags': getTags(infos),
                        'year': getYear(infos),
                        'month': getMonth(infos),
                        'day': getDay(infos),
                        'time': getTime(infos),
                        'html': html,
                        'desc': desc,
                        'dir':fileDir
                    }
                    next(err, data);
                } else {
                    next(err, null);
                }
            })
        }
    ], function(err,data) {
        var result = data[1];
        result.mark = data[0];
        callback(err,result);
    })
}

function dig(fileDir, callback) {
    fs.createReadStream(fileDir)
        .on('error', function(err) {
            callback(err, {});
        })
        .on('data', function(data) {
            var md = data.toString();
            var index = md.search('\n---');
            if (index > -1) {
                var infos = md.substring(0, index);
                var data = {
                    'title': getTitle(infos),
                    'date': getDate(infos),
                    'tags': getTags(infos),
                    'year': getYear(infos),
                    'month': getMonth(infos),
                    'day': getDay(infos),
                    'time': getTime(infos)
                }
                callback(null, data);
            } else {
                callback(null, {});
            }
        })
}

function getTitle(str) {
    var regx = /title\s?\:\s?([^\n]*)/i;
    var regxStr = str.match(regx);
    if (regxStr && typeof regxStr === 'object') {
        return regxStr[1].trim().replace(/^[\'\"\‘\“]{0,}/,'').replace(/[\'\"\‘\“]{0,}$/,'');
    } else {
        return null;
    }
}

function getYear(str) {
    var date = getDate(str);
    if (date) {
        return date.match(/\s?(\d{4})-/)[1];
    } else {
        return null;
    }
}

function getMonth(str) {
    var date = getDate(str);
    if (date) {
        return date.match(/-(\d+)-/)[1];
    } else {
        return null;
    }
}

function getDay(str) {
    var date = getDate(str);
    if (date) {
        return date.match(/-(\d+)\s+/)[1];
    } else {
        return null;
    }
}

function getTime(str) {
    var date = getDate(str);
    if (date) {
        return date.match(/\d+:\d+:\d+/)[0];
    } else {
        return null;
    }
}

function getTags(str) {
    var regx = /tags\s?\:\s?\[([^\n]*)\]/i;
    var regxStr = str.match(regx);
    if (regxStr && typeof regxStr === 'object') {
        return regxStr[1].split(',');
    } else {
        return null;
    }
}

function getDate(str) {
    var regx = /date\s?\:\s?([^\n]*)/i;
    var regxStr = str.match(regx);
    if (regxStr && typeof regxStr === 'object') {
        return regxStr[1];
    } else {
        return null;
    }
}
