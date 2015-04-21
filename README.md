# 组件

## 描述

* 使用gulp作为构建工具
* 使用browserify作为node前端加载及预编译jsx功能
* 使用babelify作为es6-5工具
* 使用gulp-uglify作为丑化js功能
* 使用gulp-streamify作为流处理工具
* 使用gulp-less转换less文件
* 使用gulp-minify-css压缩css文件
* 使用gulp-sourcemaps作为css压缩文件映射
* 使用browser-sync作为livereload工具、服务器工具，当css样式修改时，页面只是css文件刷新，页面不刷新
* 使用vinyl-source-stream作为可读流/vinyl转换工具

## 执行

### 加载包

	npm install

#### build

压缩合并jsx/less文件
build所有文件	npm run build
build子组件		npm run build-taskname

#### watch

在build的基础上进行文件监视，jsx/less文件修改时，自动更新相关压缩文件
watch所有文件	npm run watch
watch子组件		npm run watch-taskname

#### server

在watch的基础上进行添加服务功能以及livereload功能，文件更新时浏览器自动刷新(需通过服务器地址访问)，执行命令后会自动打开浏览器
server所有文件	npm run server
server子组件		npm run server-taskname


### ImageUpload测试组件

taskname: image-upload

build/watch完成后，本地打开[该文件](src/image_upload/index.html)查看demo；server时自动打开

[DOC](src/image_upload/README.md)

### ScrollPanel组件

taskname: scroll-panel

build/watch完成后，本地打开[该文件](src/scroll_panel/index.html)查看demo；server时自动打开

[DOC](src/scroll_panel/README.md)

### GroupPanel

taskname: group-panel

build/watch完成后，本地打开[该文件](src/group_panel/index.html)查看demo；server时自动打开

[DOC](src/group_panel/README.md)