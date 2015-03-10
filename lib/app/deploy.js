var colors = require('colors');
var spawn = require('child_process').spawn;
var YAML = require('yamljs');
var fs = require('fs');
var path = require('path');
var async = require('async');
var generate = require('./generate');

var Deploy = module.exports = function(cwd, args, callback) {
    var configFile = path.join(cwd, '_config.yml');
    var blogFolder = path.join(cwd, 'blog');
    var config = YAML.load(configFile).deploy || {};
    config.blogFolder = blogFolder;

    // if (args.g) {
    //     //首先generate
    //     generate(cwd, args, function(err,finished){
    //         if (finished) {
    //             console.log(234);
    //         };
    //     });
    // }else{
    //     console.log(123);
    //     // execGitHub(config);
    // }
    
    execGitHub(config);
}

function execGitHub(config) {
    var url = config.repo || config.repository;
    var hasGitInited = fs.existsSync(path.join(config.blogFolder, '.git'));
    var commands = [];

    if (!url) {
        var help = '';
        help += 'You should configure deployment settings in _config.yml first!\n\n';
        help += 'Example:\n';
        help += ' deploy:\n';
        help += '  type: github\n';
        help += '  repo: <repository url>\n';
        help += '  branch: [branch]\n';
        help += '  message: [message]\n\n';
        console.log(help);
        return;
    }

    var branch = config.branch || 'master';
    var message = config.message || ' ';

    //判断是否是git目录
    if (!hasGitInited) {
        commands = [
            ['init'],
            ['add', '-A', '.'],
            ['commit', '-m', 'First commit'],
            ['push', '-u', url, branch, '--force']
        ];
        async.eachSeries(commands, function(cmd, next) {
            execute('git', cmd, config, function(code) {
                if (code === 0) next();
            });
        }, function() {
            console.log('Deploy succeed!');
        });
    } else {
        commands = [
            ['add', '-A'],
            ['commit', '-m', config.message],
            ['push', '-u', url, branch, '--force']
        ];

        async.eachSeries(commands, function(cmd, next) {
            execute('git', cmd, config, function(code) {
                if (code === 0) next();
            });
        }, function() {
            console.log('Deploy succeed!');
        });
    }
}

function execute(command, args, config, callback) {
    var cp = spawn(command, args, {
        cwd: config.blogFolder
    });

    cp.stdout.on('data', function(data) {
        process.stdout.write(data);
    });

    cp.stderr.on('data', function(data) {
        process.stderr.write(data);
    });

    cp.on('close', callback);
};
