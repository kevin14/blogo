title: Web-Components-Template
date: 2014-07-14 21:18:10
tags: [web components,template,前端]
---

当 ``Web Components API`` 出现的时候,我就感觉这东西也许就是前端的未来了。``Web Components`` 补充了很多当前HTML标准的缺陷。

``Web Components API`` 由以下5个部分组成:
>Templates
>Decorators 
>Custom Elements
>Shadow DOM
>Imports

下面我先来介绍一下第一部分,也就是 ``Web Components`` 的 ``Templates``。

[W3C](http://www.w3.org/TR/2013/WD-html-templates-20130214/) 官方的解释如下:
>a method for declaring inert DOM subtrees in HTML and manipulating them to instantiate document fragments with identical contents.

其实,简而言之,就是一种用来渲染的模版。哈哈 ^ ^

其实模版渲染无非就是 __模版+数据=HTML__ 这种模式,只不过模版的类型不同而已。现在比较流行的做法是对字符串进行操作,字符串中规定特殊的标记用来渲染数据,比如EJS的 ``<%%>`` ,Jade的 ``#{}`` 等等。然而这种操作毕竟是耗时耗力的。而另外一种则是先把节点DOM写进Document ( 这种方法早已被忘记～哈哈 )。

_但是_,``Templates``就是为了彻底解决这种问题而出现的。

### 下面我就写一个例子，让大家更好的理解 ``Templates`` ,先上代码:

我们用 ``Template`` 标签来定义一个模版:
```
<template id="myTemplate">
	<a href="#" class="common_btn"></a>
	<canvas></canvas>
</template>
```

注意: ``Template`` 在浏览器中的表现形式是 ``display:none`` 的，其实它就是一个隐藏的普通特殊而已。

如果我想通过 `` document.querySelector('#myTemplate').childNodes `` 来获取上面代码的子结点,那是做不到的。因为 ``Template`` 标签里的东西在浏览器中的表现形式是空的,即 ``不存在``。

当然,我们还是可以通过 `` document.querySelector('#myTemplate').content `` 来解决这个问题的。

在Document中,这段代码如下:
<img width="600px" src="/img/templates_1.png" alt="Templates">

我们用如下js来渲染这个模版:
```
var template = document.querySelector('#myTemplate');
var btn = template.content.cloneNode(true);
btn.querySelector(".common_btn").innerHTML = "按钮";
document.body.appendChild(btn);
```

OK,这样一个渲染好的按钮就出现在了页面中。

最后说说 ``Template``的兼容性,Can I Use数据截图如下:
<img width="900px" src="/img/templates_2.png" alt="Templates">
目前Chrome的支持是最好的,不过不用担心,因为,这就是未来！


补充: ``Template`` 标签中的任何元素都是不会被渲染的,所以不用担心在 ``Template`` 中引入了 ``image`` 标签等需要加载资源的元素,只有通过 ``javaScript`` , ``Custom Elements``等方法渲染之后这些 ``Template``才会其作用哦～所以,放心大胆的使用吧！
