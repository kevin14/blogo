var Article = module.exports = function Article(data){

	var today = new Date();

	//article name
	this.title = data.title || 'slog';
	//article write time
	this.time = data.time || today.getHours()+':'+today.getMinutes()+':'+today.getSeconds();
	//article write year
	this.year = data.year || today.getFullYear();
	//article write month
	this.month = data.month || today.getMonth() + 1 ; 
	//article write day
	this.day = data.day || today.getDate();
	//article write date  year-month-day
	this.date = data.date || today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()+' '+today.getHours()+':'+today.getMinutes()+':'+today.getSeconds();
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

}

Article.prototype.modify = function(data){

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
	// this.link = '/' + this.year + '/' + this.month + '/' + this.day + '/' + this.title + '.html';
	//article tags
	this.tags = data.tags || this.tags;
	//article create time
	this.mark = data.mark || this.mark;

	this.dir = data.dir || undefined;
	
}

