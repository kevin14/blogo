title: Rotate3d的深层理解
date: 2014-12-11 15:19:47
tags: [css3,rotate3d,transform]
---

我们在使用CSS3中的旋转功能的时候，通常会使用以下属性：

> 1.rotateX      沿着X轴旋转
  2.rotateY      沿着Y轴旋转
  3.rotateZ      沿着Z轴旋转
  4.rotate3d     三维空间中，沿着某向量轴旋转
  5.rotate       二维空间中的旋转

由于之前一直对rotate3d的理解有错误，导致今天在教小妹妹的时候很悲剧～因此重新看了下说明，这里分享一下。

---

首先我们看一下rotate3d在w3c中的解释，如下：

Syntax
``rotate3d(x, y, z, a)``

Values
x : ``Is a <number> describing the x-coordinate of the vector denoting the axis of rotation.``
y : ``Is a <number> describing the y-coordinate of the vector denoting the axis of rotation.``
z : ``Is a <number> describing the z-coordinate of the vector denoting the axis of rotation.``
a : ``Is an <angle> representing the angle of the rotation. A positive angle denotes a clockwise``
``rotation, a negative angle a counter-clockwise one.``

翻译一下，我们知道x,y,z分别代表了旋转轴的x,y,z向量，而a则是沿着这个旋转轴旋转的度数。

---

不明白吗？我们画个图来解释一下。
首先我们知道在CSS3中的坐标系如下：
<img width="400px" src="/img/coodinate.jpg" alt="coodinate">

假设我们的rorate3d的参数是 ``rotate3d(1,1,1,45deg)`` , 那么此时由x,y,z组成的向量便是 (1,1,1),如下图：
<img width="400px" src="/img/coodinate2.jpg" alt="coodinate2">

因此，此时dom中的元素应该要绕着这个向量转动45度。
而不是我之前理解的用x,y,z分别乘以angle之后再分别绕着x,y,z轴转动。

假设我们将某个值无限放大，例如x值，``rotate3d(10000,1,1,45deg)`` ,那么此时，由于向量非常接近x轴，因此，出来的结果会和只在x轴上旋转差不多！

由此，我们可以得出结论，``rotate3d(1,1,1,45deg)`` 实际上和 ``rotate3d(2,2,2,45deg)`` 的效果是一样的。

我们也不能够简单的将例如 在x轴上旋转90度，在y轴上旋转45度，最后再z轴上旋转135度写成 ``rotate3d(1,0.5,1.5,90deg)`` ，因为这样是大错特错的！




