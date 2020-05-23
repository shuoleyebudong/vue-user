# vue-user

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

要了解具体的工作原理，请查看[指南](http://vuejs-templates.github.io/webpack/)和[vue-loader的文档]。(http://vueis.github.io/vue-loader)。
For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## 项目目录介绍

build及config：webpack配置相关

node_modules:通过npm install安装的依赖代码库

src：项目源码

static：存放静态资源

----.gitkeep：意思是就算这是个空文件，仍旧可以提交到代码版本库（因为一般如果为空文件夹，git会忽略这个文件夹）中。

.babelrc：babel相关配置（因为我们的代码大多都是ES6，而大多浏览器是不支持ES6的，所以我们需要babel帮我们转换成ES5语法）

.editorconfig：编辑器的配置，可以在这里修改编码、缩进等

.gitignore：git忽略里面设定的这些文件的提交

index.html：入口html文件

package.json：项目的配置文件，用于描述一个项目，包括我们init时的设置、开发环境、生成环境的依赖插件及版本等。

package-lock.json：普通package.json文件“^2.0”这样写的，意味着版本可以大于等于2.0，如此就会出现各种错误。