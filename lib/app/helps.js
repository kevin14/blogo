var pkgInfo = require('../../package.json');

module.exports.help = function(){
	var helpStr = '\nUsage: blogo [options]\n\n'
    +'Options:\n\n'
    +'    h, help          output usage information\n'
    +'    V, version       output the version number\n'
    +'    e, ejs           add ejs engine support (defaults to jade)\n'
    +'    H, hogan         add hogan.js engine support\n'
    +'    c, css <engine>  add stylesheet <engine> support (less|stylus|compass) (defaults to plain css)\n'
    +'    f, force         force on non-empty directory\n';
    console.log(helpStr);
}

module.exports.version = function(){
	console.log(pkgInfo.version)
}