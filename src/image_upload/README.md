# 上传图片选择组件

## 描述

支持图片上传自动缩放/裁剪功能，所有图片数据格式都为base64

### 缩放

根据容器长/宽等比缩放图片并置于右上角

### 裁剪

根据容器长/宽比， 裁剪图片，并放大至容器大小


## 用法

### 引入文件

* js/actions/ImageUploadActionCreator.jsx
* js/components/ImageUpload.jsx
* js/constants/ImageUploadType.jsx
* js/stores/ImageUploadStore.jsx

### 加入组件

* Require ImageUpload
```
import ImageUpload from './ImageUpload.jsx';
```

* 使用(参数见[这里](#props))
```
<ImageUpload {...imageProps} />
```

### 获取图片data(base64)

* Require ImageUploadStroe
```
import ImageUploadStore from '../stores/ImageUploadStore.jsx';
```

* 使用
```
ImageUploadStore.getImageUploadSource();
```

### 清除图片data

* Require ImageUploadStroe
```
import ImageUploadActionCreator from '../actions/ImageUploadActionCreator.jsx';
```

* 使用
```
ImageUploadActionCreator.clear();
```


## props参数

* **tip**: string
无图片时的提示msg，默认为空

* **isViewState**: boolean
表示view状态还是edit状态，默认为true

* **defaultImageSource**: string
初始化时，图片的data，默认github原始头像

* **imageSizeMax**: number
选择图片最大大小(单位b)，默认2M

* **wrapperWidth**: number
容器宽度，默认420，单位px

* **wrapperHeight**: number
容器高度，默认280，单位px

* **clip**: boolean
是否需要剪裁，默认false

* **clipRatioWidth**: numbe
剪裁长宽比中，宽的比例，默认3

* **clipRatioHeight**: numbe
剪裁长宽比中，高的比例，默认2