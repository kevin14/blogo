title: Web-Components-Decorators
date: 2014-07-15 20:49:24
tags: [web components,Decorators,前端]
---

``Decorators``，翻译过来就是``装潢工``。其实它在HTML中的角色也是如此，作为对HTML的装潢者，``Decorators``的出现给我们带来了很多方便之处。

[W3C](http://www.w3.org/TR/components-intro/#decorator-section) 官方的解释如下:
>A decorator is something that enhances or overrides the presentation of an existing element. Like all presentation aspects, the application of decorators is controlled by CSS. However, being able to specify the extra presentation using markup is unique to decorators.

说白了,就是 ``Decorators``能做到的不仅仅是改变元素外观那么简单,``Decorators``还能使用标记改变DOM的结构,甚至是完全改变。
不过,虽然这看上去很美好。目前能支持 ``Decorators``的浏览器仍然为 ``0``。至于未来会怎么样，也是未知数，个人感觉这块将是 ``Web Components`` 中兼容性最不好的组成部分。不过既然存在，我还是按照 [W3C](http://www.w3.org/TR/components-intro/#decorator-section) 的解释以及自己的理解演示一下吧。^ ^

首先，假设我们有一个 ``Decorator``，这个 ``Decorator`` 的作用是在列表中的每一行添加一个分享模块：
```
<decorator id="share-decorator">
   <template>
         <div class="share-box">
            <a class="share-to-weixin" href="#">微信</a>
            <a class="share-to-weibo" href="#">微博</a>
            <a class="share-to-douban" href="#">豆瓣</a>
         </div>
         <content></content>
   </template>
</decorator>
```
此时，我们有一个消息列表：

```
<ul id="message-list">
    <li>
        <article class="message-box">
            <p class="message">messages</p>
        </article>
    </li>
</ul>
```
另外，我们还有另外一个列表需要分享模块：

```
<ul id="some-list">
    <li>
        <article class="some-box">
            <p class="some-message">some-messages</p>
        </article>
    </li>
</ul>
```

在 ``Decorators`` 出现之前我们会分别把分享的代码写进这两个 ``list`` 的合适位置。而如今，我们仅仅需要一个class就可以搞定。如下：

```
#message-list .message-box {
    decorator: url(#share-decorator);
}
#some-list .some-box {
    decorator: url(#share-decorator);
}
```

加上以上``class``属性之后，原来的DOM如下：
```
<ul id="message-list">
    <li>
        <article class="message-box">
            <div class="share-box">
                <a class="share-to-weixin" href="#">微信</a>
                <a class="share-to-weibo" href="#">微博</a>
                <a class="share-to-douban" href="#">豆瓣</a>
            </div>
            <p class="message">messages</p>
        </article>
    </li>
</ul>
<ul id="some-list">
    <li>
        <article class="some-box">
            <div class="share-box">
                <a class="share-to-weixin" href="#">微信</a>
                <a class="share-to-weibo" href="#">微博</a>
                <a class="share-to-douban" href="#">豆瓣</a>
            </div>
            <p class="some-message">some-messages</p>
        </article>
    </li>
</ul>
```

由于目前还没有浏览器的支持，所以以上代码的准确性有待测试，但是``Decorators``的功能大体表现如此。
当然，除了对``DOM``结构的变动，``Decorators``也可以在其内部添加``style``以及``scripts``：
```
<decorator id="share-decorator">
   <script>
        function clickHandler(event) {
            ...
        }
        [{selector: '.share-to-weixin', type: 'click', handler: clickHandler}];
   </script>
   <style scoped>
        //这里scoped是W3C的新特性，目前只有FireFox以及打开权限的Chrome最新版支持哦
        .share-to-weixin {
            ...
        }
   </style>
   <template>
         <div class="share-box">
            <a class="share-to-weixin" href="#">微信</a>
            <a class="share-to-weibo" href="#">微博</a>
            <a class="share-to-douban" href="#">豆瓣</a>
         </div>
         <content></content>
   </template>
</decorator>
```
这样看来，是不是有点小激动～

好啦，分享结束。``Web Components API``剩下的3部分我会抽时间整理好献给大家^ ^


