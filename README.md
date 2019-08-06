# webpack_vueDemo
Build vue project with webpack4

# 文件目录
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190806190500819.png)
# 主要文件
---
## 配置文件代码
### package.json
```javascript
{
  "name": "webpack_vue",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack",
    "dev": "webpack-dev-server"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@babel/core": "^7.5.5",
    "@babel/plugin-transform-runtime": "^7.5.5",
    "@babel/preset-env": "^7.5.5",
    "autoprefixer": "^9.6.1",
    "babel-loader": "^8.0.6",
    "clean-webpack-plugin": "^3.0.0",
    "css-loader": "^3.1.0",
    "file-loader": "^4.1.0",
    "html-webpack-plugin": "^3.2.0",
    "less": "^3.9.0",
    "less-loader": "^5.0.0",
    "mini-css-extract-plugin": "^0.8.0",
    "postcss-loader": "^3.0.0",
    "url-loader": "^2.1.0",
    "vue-loader": "^15.7.1",
    "vue-template-compiler": "^2.6.10",
    "webpack": "^4.3.0",
    "webpack-cli": "^3.3.6",
    "webpack-dev-server": "^3.7.2"
  },
  "dependencies": {
    "@babel/polyfill": "^7.4.4",
    "@babel/runtime": "^7.5.5"
  }
}
```
### webpack.config.js
```javascript
const path = require("path");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
    mode: "development",
    entry: "./src/main.js",
    output: {
        // 指定打包好的文件放置的目录
        path: path.resolve(__dirname, "dist"),
        // 使用哈希，这里就会生成一堆乱码
        filename: "js/bundle.[hash].js"
    },
    plugins: [
        new CleanWebpackPlugin({
            // 指定当前文件所在的目录下的dist文件夹
            path: "./dist"
        }),
        new HtmlWebpackPlugin({
            // 指定模板文件
            template: "./src/index.html"
        }),
        new MiniCssExtractPlugin({
            // 打包后的文件名
            filename: 'style.css'
        }),
        new VueLoaderPlugin()
    ],
    module: {
        rules: [
            // 配置js的loader
            {
                test: /\.js$/,
                use: {
                    // 打包编译ES6语法
                    loader: "babel-loader",
                    options: {
                        presets: [
                            // 用于将高级语法转换为低级语法
                            "@babel/preset-env"
                        ],
                        plugins: [
                            "@babel/plugin-transform-runtime"
                        ]
                    }
                },
                exclude: /node_modules/
            },
            // 配置样式的loader 
            {
                test: /\.css$/,
                use: [
                    process.env.NODE_ENV !== 'production' ?
                    'vue-style-loader' :
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /\.less$/,
                use: [
                    process.env.NODE_ENV !== 'production' ?
                    'vue-style-loader' :
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "postcss-loader",
                    "less-loader"
                ]
            },
            // 配置图片的loader
            {
                test: /\.(jpg|jpeg|png|gif|)$/,
                use: {
                    loader: "url-loader",
                    options: {
                        // 超过1000k转为base64，这里只是作为一个例子，可以自己设置大小
                        limit: 1000 * 1024,
                        // 图片所在的文件夹
                        outputPath: "img"
                    }
                }
            },
            // 配置字体图标的loader
            {
                test: /\.(eot|woff|woff2|ttf)$/,
                use: {
                    loader: "url-loader"
                }
            },
            // 配置单文件组件.vue的loader
            {
                test: /\.vue$/,
                loader: "vue-loader"
            }
        ]
    },
    devServer: {
        // 运行的端口号
        port: 3000,
        // 运行的文件路径
        contentBase: "./dist",
        // ip地址
        host: "192.168.124.6",
        // 热更新
        hot: true,
        open: true
    }
}
```
### postcss.config.js
```javascript
const autoprefixer = require("autoprefixer")
module.exports = {
    plugins: [autoprefixer]
}
```
## 源文件
### main.js
```javascript
import Vue from 'vue'
import App from "./com/App.vue"

new Vue({
    el: "div#app",
    render: h => h(App),
})
```
### index.html
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>

<body>
    <div id="app"></div>
</body>

</html>
```
# 要下载的依赖包和插件
---
## webpack相关
* webpack：实现基本的打包
* webpack-cli
* webpack-dev-server：用于运行项目
* clean-webpack-plugin：用于每次打包时，先将指定文件夹中的文件删除
* html-webpack-plugin：打包html文件
## 和babel相关
* @babel/core 
* @babel/preset-env：用于将高级语法转为低级语法
* @babel/plugin-transform-runtime ：用于让浏览器支持高级语法
* babel-loader
* @babel/runtime 
* @babel/polyfill
## 样式相关
* css-loader 
* less 
* less-loader ：编译less文件，如果使用的是sass，那么就使用less-loader
* postcss-loader 
* autoprefixer ：自动生成前缀
* mini-css-extract-plugin
## 图片和字体图标
* url-loader 
* file-loader
## 和vue相关
* vue 
* vuex 
* vue-router
* vue-loader 
* vue-template-compiler
---
npm run dev运行项目
npm run build打包项目

---
参考文档：[vue loader文档](https://cn.vuejs.org/v2/guide/)
				[webpack文档](https://www.webpackjs.com/concepts/)

配置中出现的问题总结：[webpack配置踩坑笔记](https://blog.csdn.net/zemprogram/article/details/98604560)
