---
title: 训练计划的数据输入设计
date: 2025-07-22 10:00:00
tags: design, training
category: "设计"
---
在 PaceGuru 的训练计划中，跑者需要输入一些不是纯数值的数据，包括时间、配速和距离。我为这些结构化的数据设计了单独的输入面板，我把它称为"有限的自然输入"。

最先完成的是时间输入的设计，灵感来自一个推特上看到的的 demo， 原贴找不到了，虚空感谢一下。

### 时间输入板长这样。
![time](/blog/zh/images/input/timeInput.png)

它除了数字之外还可以输入小时、分钟和秒，而程序则为正确识别所有可组合的输入。
比如说 2 小时 30 分钟。你可以输入“2 小时 30 分钟”、“2.5 小时”、“150 分钟”，都是一样的结果，甚至可以输入日常不会说的”1 小时 90 分钟“ 也会正确识别。这比”02:30:00"方便直观的多。

### 接下来是配速的输入。
![pace](/blog/zh/images/input/paceInput.png)

配速说起来也不过就是时间，所以界面跟时间输入差不多，只不过根据习惯，去掉了小时按钮和小数点的按钮，因为我们不太这么表达配速。除了正常的 “5 分 30” 这种文本之外，我们还特别支持了 530 这种输入方式，530 并不是五百三十秒，它代表的是跑者日常说的530，即配速 5 分 30 秒每公里。

### 最后是距离的输入。
![distance](/blog/zh/images/input/distanceInput.png)

在 PaceGuru 中，支持公里和英里，大部分地方，我们都根据用户的设置显示公里或者英里。但在距离输入面板这样，我们支持输入英里，自动转换到公里。我们设想这样一种情况，你拿到了一份使用英里的训练计划，但日常使用公里作为训练距离单位，在这里你可以直接输入英里得到正确的结果。

