/*
handle sample event
to create a new sample of a blog
 */

var path = require('path');
var fs = require('fs');
var colors = require('colors');
var async = require('async');
var cwd = process.cwd();

var regx = /__sample\s+(\w+)/ig;

var exports = module.exports;

var sampleFolder = path.join(cwd, '_samples');

exports.insertSample = function(str) {
    str = str.replace(regx, function($1, $2) {
        var sampleName = $2;
        return getSampleString(sampleName);
    })
    return str;
}

//init slog folders and files
exports.init = function(cwd, args, callback) {
    if (args.length < 2) {
        return
    }
    fs.exists(sampleFolder, function(exist) {
        if (exist) {
            //create a new sample
            var sampleName = args[1];
            var sampleDir = path.join(sampleFolder, sampleName);

            fs.exists(sampleDir, function(exist) {
                if (exist) {
                    console.log('Error: '.red + 'Sample ' + sampleName.green + ' already exist.');
                } else {
                    fs.mkdir(sampleDir, function(err, fd) {
                        if (err) {
                            throw (err);
                        };

                        var htmlDir = path.join(sampleDir, sampleName + '.html');
                        var scriptDir = path.join(sampleDir, sampleName + '.js');
                        var styleDir = path.join(sampleDir, sampleName + '.css');

                        fs.writeFile(htmlDir,
                            '<section class="' + sampleName + '">\n\n\n</section>',
                            function(err) {
                                if (err) {
                                    throw (err);
                                };
                                console.log('File ' + htmlDir.green + ' created.');
                            });
                        fs.writeFile(scriptDir,
                            '',
                            function(err) {
                                if (err) {
                                    throw (err);
                                };
                                console.log('File ' + scriptDir.green + ' created.');
                            });
                        fs.writeFile(styleDir,
                            '.' + sampleName + '{\n\n\n}',
                            function(err) {
                                if (err) {
                                    throw (err);
                                };
                                console.log('File ' + styleDir.green + ' created.');
                            });
                    });
                };
            });
        } else {
            //create the sample folder
            fs.mkdirSync(sampleFolder);
        }
    });
}

//return the sample string
function getSampleString(sampleName) {

    var result = '';

    var htmlDir = path.join(sampleFolder, sampleName + '/' + sampleName + '.html');
    var scriptDir = path.join(sampleFolder, sampleName + '/' + sampleName + '.js');
    var styleDir = path.join(sampleFolder, sampleName + '/' + sampleName + '.css');

    if (fs.existsSync(styleDir)) {
        var str = fs.readFileSync(styleDir).toString();
        if (str.length > 0) {
            result += '<style>\n' + str + '\n</style>\n';
        };
    };

    if (fs.existsSync(htmlDir)) {
        var str = fs.readFileSync(htmlDir).toString();
        if (str.length > 0) {
            result += str;
        };
    } else {
        console.log('Error: '.red + 'Sample ' + sampleName + ' does not exist.');
    }

    if (fs.existsSync(scriptDir)) {
        var str = fs.readFileSync(scriptDir).toString();
        if (str.length > 0) {
            result += '<script>\n' + str + '\n</script>';
        };
    };

    return result;
}
