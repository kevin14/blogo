var Time = module.exports;


Time.getCurrentTime = function() {

    var today = new Date();

    var currentTime = today.getFullYear() + '-';
    currentTime += (today.getMonth() + 1) > 9 ? (today.getMonth() + 1) : '0' + (today.getMonth() + 1);
    currentTime += '-';
    currentTime += today.getDate() > 9 ? today.getDate() : '0' + today.getDate();
    currentTime += ' ';
    currentTime += today.getHours() > 9 ? today.getHours() : '0' + today.getHours();
    currentTime += ':';
    currentTime += today.getMinutes() > 9 ? today.getMinutes() : '0' + today.getMinutes();
    currentTime += ':';
    currentTime += today.getSeconds() > 9 ? today.getSeconds() : '0' + today.getSeconds();

    return currentTime;

}

Time.getDate = function() {
    var today = new Date().getDate();
    return today > 9 ? today : '0' + today;
}

Time.getMonth = function(){
	var thisMonth = new Date().getMonth();
	return (thisMonth + 1) > 9 ? (thisMonth + 1) : '0' + (thisMonth + 1);
}

Time.getYear = function(){
	return new Date().getFullYear();
}

Time.getHour = function(){
	var thisHour = new Date().getHours();
	return thisHour > 9 ? thisHour : '0'+thisHour;
}

Time.getMinute = function(){
	var thisMinutes = new Date().getMinutes();
	return thisMinutes > 9 ? thisMinutes : '0'+thisMinutes;
}

Time.getSecond = function(){
	var thisSeconds = new Date().getSeconds();
	return thisSeconds > 9 ? thisSeconds : '0'+thisSeconds;
}