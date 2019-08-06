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