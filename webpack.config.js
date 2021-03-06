const path=require('path');
const webpack=require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

let WEBPACK_ENV=process.env.WEBPACK_ENV||'dev';

module.exports={
    entry:"./src/app.jsx",
    output:{
        path:path.resolve(__dirname,'dist'),
        publicPath:"/dist/",
        //publicPath:WEBPACK_ENV==='dev'?"/dist/":"域名/dist/"
        filename:'js/app.js'
    },
    resolve:{
        alias:{  //创建 import 或 require 的别名(设置绝对路径)来确保模块引入变得更简单
          page:path.resolve(__dirname,'src/page'),
          component:path.resolve(__dirname,'src/component'),
          util:path.resolve(__dirname,'src/util'),
          server:path.resolve(__dirname,'src/server')
        },
        //extensions:['.jsx','.scss','.css','.json']
    },
    module:{
        rules:[
            //react语法的处理
            {
                test: /\.jsx$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: ['env','react']
                  }
                }
              },
              // css文件的处理
              {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
              },
              //scss文件的处理
              {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                  //如果需要，可以在 sass-loader 之前将 resolve-url-loader 链接进来
                use: ['css-loader', 'sass-loader']
                })
              },
              //图片的处理
              {
                test: /\.(png|jpg|gif)$/,
                use: [
                  {
                    loader: 'url-loader',
                    options: {
                      limit: 8192,
                      name:"resource/[name].[ext]"
                    }
                  }
                ]
              },
              // 字体图标的处理
              {
                  test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
                  use: [
                    {
                      loader: 'url-loader',
                      options: {
                        limit: 8192,
                        name:"resource/[name].[ext]"
                      }
                    }
                  ]
              }
        ]
    },
    devServer: {
        port:8086,
        historyApiFallback:{ //当使用HTML5HistoryAPI时 任意的404响应都可能需要被替代为index.html
          index:'/dist/index.html'
        },
        proxy:{
          "/manage":{
            target:"http://admintest.happymmall.com/",
            changeOrigin: true
          },
          "/user":{
            target:"http://admintest.happymmall.com/",
            changeOrigin: true
          }
        }
    },
    plugins:[
      //处理html文件
        new HtmlWebpackPlugin({
            template:"./src/index.html"
        }),
        //独立css文件
        new ExtractTextPlugin("css/[name].css"),
        //提出公共模块
        new webpack.optimize.CommonsChunkPlugin({
          name:"common",
          filename:"js/base.js"
        })
    ]
}