var _ = require('underscore');

/*
data analyser class
merge object to postData
 */
var Data = module.exports = function Data(data) {
    this.sourceData = data ? data : {};
    this.data = mix(data);
}


function mix(data) {

    var articles = data;
    var tags = [];
    var dates = [];

    data.forEach(function(o, i) {

        if (o.tags && o.tags.length > 0) {
        	tags = _.union(tags,o.tags);
        }

        

    })

    console.log(tags)

    return data;
}

/*
merge array B to array A
the repeat element will be deleted
 */
function mergeArray(A,B){
	var C = [];



	return C;
}