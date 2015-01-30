title: Html5-Canvas-Duplicated-On-Android
date: 2014-06-27 15:08:44
tags: [HTML5,Canvas,Duplicated,Android,Bug]
---

最近在开发H5游戏的时候会出现用Canvas绘制的画面被复制到页面顶部的问题，而且仅仅在Android的浏览器上会出现这种情况，反复检查不得其解。最终发现这竟然是CSS引起的Bug。

Canvas的父级不能拥有 ``overflow`` 的属性(除非是 ``body`` )，否则便会导致Canvas被复制。

在Google Code上也有类似的Issue -- https://code.google.com/p/android/issues/detail?id=41312
### 先上代码: 

```
	//this may bring the android browser bug
	.parent{
		overflow:hidden;
		.canvas{

		}
	}
```

```
	//correct
	.parent{
		//overflow:hidden;
		.canvas{

		}
	}
```

---

### Bug如下图:

<img width="320px" height="640px" src="/static/img/error.jpg" alt="位置异常">

手机型号: 小米2S 三星S3

---

### 修复后:

<img width="320px" height="640px" src="/static/img/correct.jpg" alt="位置异常">
