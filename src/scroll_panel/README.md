# 滚动条组件

## 描述

使用浏览器默认滚动条，webkit内核浏览器滚动条样式经过修改
自动计算高度


## 用法

### 使用组件

```
import ScrollPanel from './ScrollPanel.jsx';
```

```
<ScrollPanel>
	{content}
</ScrollPanel>
```

## props参数

* **type**: string("left","right" 或 其他)
为left或right时，滚动条去除Id为"pop_mainmenu"的Menu部分以及48px的header高度，
另外为right时，滚动条还去除了48px的底部高度
都是hardcode
为其他时，使用window高度
默认为空

* **extraHeight**: number
有特殊情况时，需要排除的高度，默认为0