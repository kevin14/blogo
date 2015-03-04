var pkgInfo = require('../../package.json');

module.exports.help = function(){
	var helpStr = '\nUsage: blogo [options]\n\n'
    +'Options:\n\n'
    +'    i, init          create a new blog and init\n'
    +'    n, new           create a new article\n'
    +'    s, server        start blogo server\n'
    +'    g, generate      generate your all posts to htmls in blog folder\n'
    +'    d, deploy        deploy blogo to github(only git supported currently)\n'
    +'    sample           create a sample for blogo\n'
    +'    r, remove        remove an article\n'
    +'    -h, --help       get helps of blogo\n'
    +'    -v, --version    get blogo version\n';
    console.log(helpStr);
}

module.exports.version = function(){
	console.log(pkgInfo.version)
}