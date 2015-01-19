var Article = module.exports = function Article(data){

	var today = new Date();

	this.title = data.title || 'slog';
	this.time = data.time || today.getHours()+':'+today.getMinutes()+':'+today.getSeconds();
	this.year = data.year || today.getFullYear();
	this.month = data.month || today.getMonth() + 1 ; 
	this.day = data.day || today.getDate();
	this.date = data.date || today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()+' '+today.getHours()+':'+today.getMinutes()+':'+today.getSeconds();
	this.desc = data.desc || '';
	this.html = data.html || '';
	this.link = '/' + this.year + '/' + this.month + '/' + this.day + '/' + this.title + '.html';
	this.tags = data.tags || [];
	this.ctime = data.ctime;
}