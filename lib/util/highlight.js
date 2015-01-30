var hl = require('highlight.js');
var regx = /\<code\>([\w\W]*?)\<\/code\>/g;
var beforeLength = 6;
var afterLength = 7;

module.exports = function(str){

	str = str.replace(regx,function(value){
		var length = value.length;
		value = value.substring(beforeLength,length - afterLength);
		value = hl.highlightAuto(value).value;
		return '<pre>'+value+'</pre>';
	})

	return str;
}