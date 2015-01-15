title: Jade-Mixins-Pages
date: 2014-06-09 17:18:10
tags: Jade Mixins 分页控件
---
分页功能对于web开发来说是非常常见的功能之一，而其实现上也有多种方法。
这里和大家分享一种使用Jade实现的分页~

---
先上代码:

### Jade:

``` bash
mixin pages(curPage,totol,baseUrl)
	- var curPage = Number(curPage),totol = Number(totol);
	- var startPage = curPage - 4 > 0 ? curPage - 4 : 1;
	- var lastPage = curPage + 4 <= totol ? curPage + 4 : totol;
	- if(startPage == 1) lastPage = totol >= 9 ? 9 : totol
	div.global-pages
		- if(curPage > 1)
			a.page.page-prev(href=baseUrl+'?id='+(curPage-1)) 上一页
		- if(startPage > 1)
			a.ell ...
		- for(var val = startPage ; val < lastPage + 1 ; val ++)
			a.page(class='page-'+val class=curPage===val?'cur':'' href=baseUrl+'?id='+val) #{val}
		- if(totol > 9 && curPage < totol )
			a.ell ...
		- if(curPage < totol)
			a.page.page-next(href=baseUrl+'?id='+(curPage+1)) 下一页
```

### 使用:
``` bash
+pages(pageId,20,'http://loler.us:4000/qa')
```
### 结果:
```bash
<div class="global-pages">
	<a href="http://loler.us:4000/qa?id=1" class="page page-1 cur">1</a>
	<a href="http://loler.us:4000/qa?id=2" class="page page-2">2</a>
	<a href="http://loler.us:4000/qa?id=3" class="page page-3">3</a>
	<a href="http://loler.us:4000/qa?id=4" class="page page-4">4</a>
	<a href="http://loler.us:4000/qa?id=5" class="page page-5">5</a>
	<a href="http://loler.us:4000/qa?id=6" class="page page-6">6</a>
	<a href="http://loler.us:4000/qa?id=7" class="page page-7">7</a>
	<a href="http://loler.us:4000/qa?id=8" class="page page-8">8</a>
	<a href="http://loler.us:4000/qa?id=9" class="page page-9">9</a>
	<a class="ell">...</a>
	<a href="http://loler.us:4000/qa?id=2" class="page page-next">下一页</a>
</div>
```
### 参数:
curPage  当前的pageId
totol    页面总数
baseUrl  a标签的链接 例如 http://loler.us:4000/qa，那么a的url就是http://loler.us:4000/qa?id=

### 效果:
<img src="/img/mixin-pages.png" alt="分页">

