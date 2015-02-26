/*
Generate文件步骤：
1 获取所有文章数据
2 根据不同数据类型生成目录
3 生成文件并且写入
 */
var colors = require('colors');
var Digger = require('./digger');
var View = require('./view');
var DataParser = require('./dataParser');
var path = require('path');
var fs = require('fs');
var util = require('../util');
var mfs = util.file;

var Generate = module.exports = function(cwd, args, callback) {
    var postDir = path.join(cwd, '_posts');
    var digger = new Digger();
    var blogFolder = path.join(cwd, 'blog');

    //init the blog data
    digger.getData(postDir, function(err, data) {
        var dataParser = new DataParser(data);
        var view = new View(dataParser);
        var config = dataParser.configData;
        var datesData = dataParser.data.dates;
        var tagsData = dataParser.data.tags.list;
        //首先remove所有的文章,清空blog文件夹
        mfs.emptyDir(blogFolder,['.git']);

        //创建index
        var indexFilePath = path.join(blogFolder,'index.html');
        execGenerate(indexFilePath,view,View.PAGE.INDEX);

        //创建articleList
        var articlesPath = path.join(blogFolder,'articles');
        createFolder(articlesPath);
        var articlesFilePath = path.join(articlesPath,'index.html');
        execGenerate(articlesFilePath,view,View.PAGE.ARTICLE_LIST);

        //创建articles
        for (year in datesData) {
            var yearPath = path.join(blogFolder, year);
            createFolder(yearPath);
            for (month in datesData[year]) {
                var monthPath = path.join(yearPath, month);
                createFolder(monthPath);
                for (day in datesData[year][month]) {
                    var dayPath = path.join(monthPath, day);
                    createFolder(dayPath);
                    for (article in datesData[year][month][day]) {
                        var articlePath = path.join(dayPath, article);
                        createFolder(articlePath);
                        var articleFilePath = path.join(articlePath, 'index.html');
                        execGenerate(articleFilePath, view, View.PAGE.ARTICLE,{
                            year: year,
                            month: month,
                            day: day,
                            articleName: article
                        });
                    }
                }
            }
        }
        
        //创建tags文件夹
        var tagFolder = path.join(blogFolder,'tags');
        fs.mkdirSync(tagFolder);
        console.log(tagsData)
        tagsData.forEach(function(tag,index){
        	var tagName = tag.name || '';
        	var tagPath = path.join(tagFolder,tagName);
        	createFolder(tagPath);
        	var tagFilePath = path.join(tagPath,'index.html');
        	execGenerate(tagFilePath,view,View.PAGE.ARTICLE_BY_TAG,{tagName:tagName});
        });
        //创建tags索引
        var tagsListFilePath = path.join(tagFolder,'index.html');
        execGenerate(tagsListFilePath,view,View.PAGE.TAG_LIST);

        //复制文章静态文件
        var staticSrc = path.join(cwd,'_statics');
        var staticDest = path.join(blogFolder,'static');
        mfs.copyDir(staticSrc,staticDest,function(err){
        	if (err) throw err;
        });

        //复制静态资源
        var resourceSrc = path.join(cwd,'_themes/'+config.theme+'/resource');
        var resourceDest = path.join(blogFolder,'resource');
        mfs.copyDir(resourceSrc,resourceDest,function(err){
        	if (err) throw err;
        });
        callback();
    });
}

function clearBlogFolder(path) {
    fs.rmdirSync(path);
    return path;
}

function createFolder(path) {
    fs.mkdirSync(path);
    return path;
}

function execGenerate(path, view,pageId, pageData) {
    var html = view.getFileString(pageId, pageData);
    fs.writeFile(path, html, function(err) {
        if (err) throw err;
        console.log('Generating... '.green + path + ' created'.green);
    })
}
