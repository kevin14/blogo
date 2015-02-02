/*
handle sample event
to create a new sample of a blog
 */

var path = require('path');
var fs = require('fs');
var colors = require('colors');

//init slog folders and files
module.exports = function(cwd, args, callback) {
    if (args.length < 2) {
        return
    }
    var sampleFolder = path.join(cwd, '_samples');
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
                                console.log('File '+htmlDir.green+' created.');
                            });
                        fs.writeFile(scriptDir,
                            '',
                            function(err) {
                                if (err) {
                                    throw (err);
                                };
                                console.log('File '+scriptDir.green+' created.');
                            });
                        fs.writeFile(styleDir,
                            '.'+sampleName+'{\n\n\n}',
                            function(err) {
                                if (err) {
                                    throw (err);
                                };
                                console.log('File '+styleDir.green+' created.');
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
