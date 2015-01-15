/*
digger.js
a class to dig the data of the articles , like articles' count , name ,data ...
 */
var fs = require('fs');

var Digger = module.exports = function Digger(){
	this.data = {};
}

Digger.prototype.start = function(postDir){

}

Digger.prototype.digFile = dig;

function dig(fileDir,callback){
	fs.createReadStream(fileDir)
		.on('error',function(err){
			console.log(err);
		})
		.on('data',function(data){
			var md = data.toString();
			var index = md.search('\n---');
			if(index > -1){
				var infos = md.substring(0,index);
				var data = {
					'title':getTitle(infos),
					'date':getDate(infos),
					'tags':getTags(infos),
					'year':getYear(infos),
					'month':getMonth(infos),
					'day':getDay(infos),
					'time':getTime(infos)
				}
				callback(data);
			}else{
				callback(null);
			}
		})
}

function getTitle(str){
	var regx = /title\s?\:\s?([^\n]*)/i;
	var regxStr = str.match(regx);
	if(regxStr && typeof regxStr === 'object'){
		return regxStr[1];
	}else{
		return null;
	}
}

function getYear(str){
	var date = getDate(str);
	if (date){
		return date.match(/\s?(\d{4})-/)[1];
	}else{
		return null;
	}
}

function getMonth(str){
	var date = getDate(str);
	if (date){
		return date.match(/-(\d+)-/)[1];
	}else{
		return null;
	}
}

function getDay(str){
	var date = getDate(str);
	if (date){
		return date.match(/-(\d+)\s+/)[1];
	}else{
		return null;
	}
}

function getTime(str){
	var date = getDate(str);
	if (date){
		return date.match(/\d+:\d+:\d+/)[0];
	}else{
		return null;
	}
}

function getTags(str){
	var regx = /tags\s?\:\s?\[([^\n]*)\]/i;
	var regxStr = str.match(regx);
	if(regxStr && typeof regxStr === 'object'){
		return regxStr[1].split(',');
	}else{
		return null;
	}
}

function getDate(str){
	var regx = /date\s?\:\s?([^\n]*)/i;
	var regxStr = str.match(regx);
	if(regxStr && typeof regxStr === 'object'){
		return regxStr[1];
	}else{
		return null;
	}
}