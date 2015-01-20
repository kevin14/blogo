title: CSS属性pointer-events的
date: 2015-01-06 14:09:03
tags: [CSS,pointer-events,穿透]
---

前几天看到一个网站上铺满了飘动着的雪花，不用想肯定是用``canvas``来做的了。但是让我好奇的是，铺满了雪花的页面是可以点击的。在了解``pointer-events``之前，我猜想也许是对鼠标事件做了处理，但是这样做代价很大，而且是首页，大公司不太可能这样做。于是审查代码发现了这个``pointer-events``属性，才知道原来浏览器上还有如此赞的属性！今天我就来研究一下这个神器的属性！

---

在[MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/pointer-events)的标准中，``pointer-events``有以下几个值：
> 1.auto
  2.none
  3.visiblePainted
  4.visibleFill
  5.visibleStroke
  6.visible
  7.painted
  8.fill
  9.stroke
  10.all
  11.inherit

其中，只有``auto``和``none``是web端的属性值，其余的都是仅有``svg``支持的属性值。

---

先说说前两个属性值吧：

``auto``的表现就是没有加``pointer-events``的样子，正常情况。

``none``的表现如[MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/pointer-events)所述:

The element is never the target of mouse events; however, mouse events may target its descendant elements if those descendants have pointer-events set to some other value. In these circumstances, mouse events will trigger event listeners on this parent element as appropriate on their way to/from the descendant during the event capture/bubble phases。

意思就是说当元素加上这个属性值之后，这个元素将不会被鼠标事件点击到，但是如果这个元素的后代也有``pointer-events``，并且属性值不是none的话，那么这个后代元素将可以被鼠标事件点击到。_此时，事件在冒泡或者委托过程中，就有可能传递到他们的父元素上了。_

最后一句话听起来有点拗口，我们来做实验测试一下：
以下几个dom，我都绑定了``click``事件用来触发``alert()方法``：
<div style="width:300px;height:100px;background-color:rgba(255,60,60,0.7);line-height:100px;text-align:center;color:#fff;font-size:14px;" class="demo1">d1 没有pointer-events属性</div>
<div style="width:300px;height:100px;background-color:rgba(255,60,60,0.7);line-height:100px;text-align:center;color:#fff;font-size:14px;margin-top:10px;pointer-events:auto;" class="demo2">d2 pointer-events:auto;</div>
<div style="width:300px;height:100px;background-color:rgba(255,60,60,0.7);line-height:100px;text-align:center;color:#fff;font-size:14px;margin-top:10px;pointer-events:none;" class="demo3">d3 pointer-events:none;</div>
<div style="width:300px;height:100px;background-color:rgba(255,60,60,0.3);line-height:100px;text-align:left;position:relative;color:#fff;font-size:14px;margin-top:10px;pointer-events:none;" class="demo4">d4 pointer-events:none;
	<div class="demo5" style="position:absolute;right:0;top:0;color:#fff;background-color:rgba(255,60,60,0.7);pointer-events:auto;">d5 pointer-events:auto;</div>
</div>
<div style="width:300px;height:100px;background-color:rgba(255,60,60,0.3);line-height:100px;text-align:left;position:relative;color:#fff;font-size:14px;margin-top:10px;pointer-events:auto;" class="demo6">d6 pointer-events:auto;
	<div class="demo7" style="position:absolute;right:0;top:0;color:#fff;background-color:rgba(255,60,60,0.7);pointer-events:none;">d7 pointer-events:none;</div>
</div>
<script>
	
	document.querySelector('.demo1').addEventListener('click',function(){
		alert("我是d1");
	})
	document.querySelector('.demo2').addEventListener('click',function(){
		alert("我是d2");
	})
	document.querySelector('.demo3').addEventListener('click',function(){
		alert("我是d3");
	})
	document.querySelector('.demo4').addEventListener('click',function(){
		alert("我是d4");
	})
	document.querySelector('.demo5').addEventListener('click',function(){
		alert("我是d5");
	})
	document.querySelector('.demo6').addEventListener('click',function(){
		alert("我是d6");
	})
	document.querySelector('.demo7').addEventListener('click',function(){
		alert("我是d7");
	})

</script>


很显然，d1，d2都是表现正常的，而d3由于有``pointer-events:none;``这个属性，因此将不会触发``click``事件。

在d4中，我们点击淡红色的部分，也就是没有d5的部分，由于d4拥有``pointer-events:none;``，将不触发``click``，而当我们点击d5的时候，由于d5有属性``pointer-events:auto;``，将会触发``click``而弹框，_此时，由于事件冒泡，因此d4的弹框在这个时候会弹出来_

在d6和d7中，点击d6一切正常，但是当我们点击d7的时候，由于d7有属性``pointer-events:none;``，因此d7讲不会弹框。_但是由于事件冒泡，d6此时的弹框也会弹出！_

---

这里就先讲到这里，希望读者能够理解。至于在``svg``中的其他属性值，我将会继续研究并分享给大家。