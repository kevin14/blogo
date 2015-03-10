/*
digger.js
a class to dig the data of the articles , like articles' count , name ,data ...
 */
var fs = require('fs');
var marked = require('marked');
var async = require('async');
var path = require('path');
var util = require('util');
var YAML = require('yamljs');
var cwd = process.cwd();
var sample = require('./sample');

var Digger = module.exports = function Digger() {
    var configFile = path.join(cwd, '_config.yml');
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

Digger.prototype.getData = function(dirname, callback) {
    var self = this;
    this.digDir(dirname, function(err, data) {
        callback(err, {
            data: data,
            configData: self.configData
        });
    })
}

function digArticle(fileDir, callback) {
    fs.exists(fileDir, function(exist) {
        if (exist) {
            async.series([
                    function(next) {
                        fs.stat(fileDir, function(err, stats) {
                            next(err, stats.ino);
                        })
                    },
                    function(next) {
                        fs.readFile(fileDir, function(err, data) {
                            var md = data.toString();
                            var index = md.search('\n---');
                            if (index > -1) {
                                var content = md.substring(index + 4);
                                var descIndex = content.indexOf('\n', 100);
                                if (descIndex < 0) {
                                    descIndex = 100;
                                };
                                var desc = marked(content.substring(0, descIndex));
                                var html = marked(content);
                                html = sample.insertSample(html);
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
                                    'dir': fileDir
                                }
                                data.timemark = getTimeMark(data);
                                next(err, data);
                            } else {
                                next(err, null);
                            }
                        })
                    }
                ],
                function(err, data) {
                    var result = data[1];
                    result.mark = data[0];
                    callback(err, result);
                })
        };
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
                data.timemark = getTimeMark(data);
                callback(null, data);
            } else {
                callback(null, {});
            }
        })
}

function getTimeMark(data) {
    var year = data.year || 0;
    var month = data.month || 0;
    var day = data.day || 0;

    var time = data.time.split(":");
    var hour = time[0] || 0;
    var minute = time[1] || 0;
    var second = time[2] || 0;

    return Number(year + month + day + hour + minute + second);

}

function getTitle(str) {
    var regx = /title\s?\:\s?([^\n]*)/i;
    var regxStr = str.match(regx);
    if (regxStr && typeof regxStr === 'object') {
        return regxStr[1].trim().replace(/^[\'\"\‘\“]{0,}/, '').replace(/[\'\"\‘\“]{0,}$/, '');
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
    if (regxStr && typeof regxStr === 'object' && regxStr[1].length > 0) {
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
