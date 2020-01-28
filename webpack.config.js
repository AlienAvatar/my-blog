const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');


module.exports = {
    entry: './src/index.js',               // 入口文件
    output: {
        filename:'bundle.js',
        path:path.resolve('dist'),
    }, // 出口文件
    devServer: {
        historyApiFallback: true
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                // use: ['style-loader', 'css-loader']
                use: ExtractTextWebpackPlugin.extract({
                    // 将css用link的方式引入就不再需要style-loader了
                    use: 'css-loader'
                })
            },
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(jpg|png|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            // limit: 8192,    // 小于8k的图片自动转成base64格式，并且不会存在实体图片
                            name:'../image/[name].[ext]',
                            outputPath: 'image/'   // 图片打包后存放的目录
                        }
                    }
                ]
            },
            {
                test: /\.svg/,
                use: ['file-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            favicon: './public/favicon.ico',
            img:'./public/image/'
        }),
        new ExtractTextWebpackPlugin('css/style.css'),
        new CleanWebpackPlugin()
    ]
};
//        new CleanWebpackPlugin()