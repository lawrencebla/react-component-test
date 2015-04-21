# v0.0.2

## 组件修改
* 提交group panel组件

## 构建修改
* 添加gulp作为构建工具
* 移除watchify，使用gulp.watch监听文件改动
* 添加gulp-uglify作为丑化js功能
* 添加streamify-streamify作为流处理工具
* 添加gulp-less转换less文件
* 添加gulp-minify-css压缩css文件
* 添加gulp-sourcemaps作为css压缩文件映射
* 添加browser-sync作为livereload工具、服务器工具，当css样式修改时，页面只是css文件刷新，页面不刷新
* 添加vinyl-source-stream作为可读流/vinyl转换工具

## 其他修改
* 在根路径的index.html文件中添加组件demo/doc链接
* 重构build/watch/server命令