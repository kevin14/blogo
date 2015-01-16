title: 神奇的text-align:justify
date: 2014-07-27 21:17:02
tags: [CSS,text-align,justify,对齐]
---

对于任何一个前端来说，``text-align``都是再熟悉不过的用法了。我们对于块级元素下的文字对齐通常使用``left``,``right``,``center``等值。不过``text-align``拥有第四个属性值``justify``，这个属性同样也大大方便了我们的``文字``和``列表``布局。今天就来说说``text-align:justify``的用法。

说在前面：其实[W3C](http://dev.w3.org/csswg/css-text/#propdef-text-align)的标准中，``text-align``拥有以下几个值：
> 1.left
  2.right
  3.center
  4.start (在左右布局中同left类似)
  5.end (在左右布局中同right类似)
  6.justify (今天要说说的值)
  7.match-parent
  8.inherit

由于``start``,``end``,``match-parent``是[W3C](http://dev.w3.org/csswg/css-text/#propdef-text-align)新增的仍处于草稿中的值，因此这里先不介绍。

---
###文字布局
``justify``，中文解释就是：使xxx齐行，也就是两端对齐的意思，我们先来看个例子，代码如下：

```
<p class="p">
This CSS3 module defines properties text manipulation and specifies their processing model. It covers line breaking, justification and alignment, white space handling, and text transformation.CSS is a language for describing.
</p>
<style>
    .p{
        width: 300px;
        text-align: left;
    }
</style>
```
效果如下：

<img width="400px" src="/img/text_align_left.png" alt="text_align_left">

可以看到如果不使用``word-wrap:break-all``的话，那么右侧并不是那么整齐，会有一个个缺口。

假设我们使用 ``justify``：

```
<style>
    .p{
        width: 300px;
        text-align: justify;
    }
</style>
```
效果显而易见：

<img width="400px" src="/img/text_align_justify.png" alt="text_align_left">

注：很多时候，大家会用``word-wrap:break-all``来达到同样的对齐效果，殊不知这个属性会很变态的阶段正常的单词！慎用！因此理解每个属性的意义是相当重要滴。

---
###列表布局
现在开始介绍``justify``在列表布局中的用法。我们在进行网格式的列表布局的时候，常常会因为最右侧的``li``没有紧紧贴合右侧的边框而烦恼，有的时候我们会使用外层的``box`` ``overflow:hidden``的方法来解决这种问题，有的时候我们会强行的按照内部元素占据的空间规定外层``box``的``width``,反正有很多方法可以达到贴合的效果，但是都费时费力很伤神。然后，我们使用``text-justify``便可以瞬间秒杀这种问题。

话不多少，上代码：
```
<style>
  ul{
    width: 420px;
    border: 1px solid #d8d8d8;
    text-align: justify;
    padding: 0;

    li{
     display: inline-block;

      img{
        border: none;
        width: 100px;
        height: 100px;
      }

      &.justify{
          display: inline-block;
          width: 100px;
          height:0; 
          padding:0; 
          overflow:hidden;
        }
    }
  }
</style>
<ul>
  <li><img src="" alt=""></li>
  <li><img src="" alt=""></li>
  <li><img src="" alt=""></li>
  <li><img src="" alt=""></li>
  <li><img src="" alt=""></li>
  <li><img src="" alt=""></li>
  <li><img src="" alt=""></li>
  <li><img src="" alt=""></li>
  <li><img src="" alt=""></li>
  <li><img src="" alt=""></li>
  <li><img src="" alt=""></li>
  <li class="justify">&nbsp;</li>
  <li class="justify">&nbsp;</li>
  <li class="justify">&nbsp;</li>
  <li class="justify">&nbsp;</li>
</ul>
```

效果图：
<img width="400px" src="/img/text_align_justify_list.png" alt="text_align_justify_list">
搞定，就那么简单～
注意：代码中最后四个空的``li``，目的就是为了让最后一行永远处于被撑开的状态，以达到和上面的列表对齐的效果。大家理解一下吧～

