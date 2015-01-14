title: fix-Xcode-Symbol-not-found
date: 2014-11-06 13:19:00
tags: [Xcode,iOS]
---

最近在做iOS项目的时候，会遇到 ```symbol not found``` 的问题，这导致我无法使用cmd+click定位到代码，以及错误的代码提示。无论重启Xcode还是重启电脑都无法解决这个问题，查询了很久才发现这是由于本项目需要做一个re-index的操作，具体操作如下：

> 1.Window->Organizer
  2.找到Derived Data -> 点击Delete
  3.Quit Xcode -> 重新打开项目
  4.re-index搞定～