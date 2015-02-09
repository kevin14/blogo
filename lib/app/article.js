var fs = require('fs'),
    path = require('path'),
    colors = require('colors'),
    Timer = require('../util').timer;

var Article = module.exports = function Article(data) {

    var today = new Date();

    //article name
    this.title = data.title || 'slog';
    //article write time
    this.time = data.time || Timer.getHour() + ':' + Timer.getMinute() + ':' + Timer.getSecond();
    //article write year
    this.year = data.year || Timer.getYear();
    //article write month
    this.month = data.month || Timer.getMonth();
    //article write day
    this.day = data.day || Timer.getDate();
    //article write date  year-month-day
    this.date = data.date || Timer.getCurrentTime();
    //article description
    this.desc = data.desc || '';
    //article totol html
    this.html = data.html || '';
    //article src
    this.link = '/' + this.year + '/' + this.month + '/' + this.day + '/' + this.title;
    //article tags
    this.tags = data.tags || [];
    //article create time
    this.mark = data.mark || 0;
    //article file dir
    this.dir = data.dir || undefined;
    //create time for sort
    this.timemark = data.timemark || 0;
    //next article
    this.nextArticle = {};
    //prev article
    this.prevArticle = {};

}

Article.prototype.modify = function(data) {

    //article name
    this.title = data.title || this.title;
    //article write time
    this.time = data.time || this.time;
    //article write year
    this.year = data.year || this.year;
    //article write month
    this.month = data.month || this.month;
    //article write day
    this.day = data.day || this.day;
    //article write date  year-month-day
    this.date = data.date || this.date;
    //article description
    this.desc = data.desc || this.desc;
    //article totol html
    this.html = data.html || this.html;
    //article src
    this.link = '/' + this.year + '/' + this.month + '/' + this.day + '/' + this.title;
    //article tags
    this.tags = data.tags || this.tags;
    //article create time
    this.mark = data.mark || this.mark;
    //article file dir
    this.dir = data.dir || undefined;
    //create time for sort
    this.timemark = data.timemark || 0;
    //next article
    this.nextArticle = {};
    //prev article
    this.prevArticle = {};
}

Article.newArticle = function(cwd, args, callback) {
    if (args._.length < 1) {
        return
    }
    var articleName = args._[1];
    var articlePath = path.join(cwd, '_posts/' + articleName + '.md');

    fs.exists(articlePath, function(exist) {
        if (exist) {
            console.log('Error: '.red + 'File ' + articlePath.green + ' already exist...');
        } else {
            fs.writeFile(articlePath,
                'title: ' + articleName + '\ndate: ' + Timer.getCurrentTime() + '\ntags: []\n---',
                function(err) {
                    if (err) {
                        throw (err);
                    };
                    console.log('File ' + articlePath.green + ' created.');
                    if (args.s) {
                        var fn = require('./server');
                        fn(cwd, args, callback);
                    };
                });
        }
    })
}

Article.removeArticle = function(cwd, args, callback) {
    if (args._.length < 1) {
        return
    }
    var articleName = args._[1];
    var articlePath = path.join(cwd, '_posts/' + articleName + '.md');

    fs.exists(articlePath, function(exist) {
        if (!exist) {
            console.log('Error: '.red + 'File ' + articlePath.green + ' doesn\'t exist...');
        } else {
            fs.unlink(articlePath, function(err) {
                if (err) throw err;
                console.log('Successfully deleted '+articlePath);
            });
        }
    })
}
