const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: {main:'./src/main.js'},
    output: {
        path: path.resolve(__dirname, './build/dist/js/'),//PRD
        publicPath: 'dist/js/',//DEV
        filename: 'build.js',
        //filename:'[name].js',
        chunkFilename:'chunkjs/[name].js'//拼接publicPath
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                    }
                    // other vue-loader options go here
                }
            },
            {
                test: /\.js$/,
                use:[{
                    loader: 'babel-loader',
                    options:{
                        // presets:['es2015'],//生产环境需要用webpack.optimize.UglifyJsPlugin，写在这里不起作用，必须在.babelrc
                        plugins:[
                            'syntax-dynamic-import',
                            //本项目不对element-ui采用按需加载
                            // ["component", [
                            //     {
                            //         "libraryName": "element-ui",
                            //         "styleLibraryName": "theme-chalk"
                            //     }
                            // ]]
                        ]
                    },
                }],
                exclude: /node_modules/
            },
            {
                // test: /\.(png|jpg|gif|svg|TTF|ttf|woff)$/,
                test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]'
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.less$/,
                loader: "style-loader!css-loader!less-loader"
            },
        ]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    devServer: {
        port: '8083',
        disableHostCheck: true,
        historyApiFallback: true,
        noInfo: true,
        overlay: true
    },
    performance: {
        hints: false
    },
    // devtool: '#eval-source-map'
    devtool:'inline-source-map'
};

if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = '#source-map';
    // http://vue-loader.vuejs.org/en/workflow/production.html
    module.exports.plugins = (module.exports.plugins || []).concat([
        new CleanWebpackPlugin(['build']),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),//为vue做的变量，项目本身也用到
        //由于webpack3.0以上把插件集合在webpack上，有点问题
        new webpack.optimize.UglifyJsPlugin({
            // sourceMap: true,
            compress: {
                warnings: false
            }
        }),
        new webpack.optimize.ModuleConcatenationPlugin(),//webpock3 Scope Hoisting：作用域提升
        //兼容老的loader
        new webpack.LoaderOptionsPlugin({
            minimize: true
        }),
        new HtmlWebpackPlugin({
            //只引入favicon，不引入js
            template: './index.html', // 源模板文件
            filename: '../../index.html', // 输出文件【注意：这里的根路径是module.exports.output.path】
            inject:true,
            excludeChunks:['main'],//不引入js
            // hash: true,
            favicon:'./favicon.ico'
        })
    ])
}else{
    //开发环境
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"dev"'
            }
        }),
    ])
}
