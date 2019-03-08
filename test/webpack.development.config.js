const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HappyPack = require("happypack");
const os = require("os");
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

const DllReferencePlugin = require('webpack/lib/DllReferencePlugin');

const UglifyJParallerPlugin = require("webpack-uglify-parallel")
    // const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
    // const notifier = require("node-notifier");


//打包面板插件
const Dashbord = require("webpack-dashboard");
const DashbordPlugin = require("webpack-dashboard/plugin");
const dash = new Dashbord();

module.exports = {
    mode: "development",
    entry: {
        bundle: path.resolve(__dirname, "./src/main.js"),
        vendors: ["react", "react-dom", "react-router"]
    },
    output: {
        path: path.resolve(__dirname, "./build"),
        filename: "[name].js"
    },

    // externals: {
    //     "react": "React",
    //     "react-dom": "ReactDOM",

    // },
    resolve: {
        extensions: [".js", ".tsx", ".ts"],
        //基于webpack文件所在位置
        alias: {
            views: path.resolve(__dirname, './src/views/'),
            utils: path.resolve(__dirname, "./src/utils/"),
        },
        //用来配置文件必须有扩展名
        // enforceExtension:true

        //解析文件，从哪个模块开始，分析绝对路径和相对路径
        modules: [path.resolve(__dirname, "src"), "node_modules"],
        mainFields: ["main"],
        'react': path.resolve(__dirname, 'node_modules/react/dist/react.min.js'),
        noParse: [/jquery|chartjs/, /react\.min\.js$/]
    },
    devServer: {
        // contentBase: path.join(__dirname, "./src"),
        // compress: true,
        quiet: true,
        //在浏览器头部添加
        headers: {
            "X-Custom-Foo": "bar"
        },
        noInfo: true,

        //打开浏览器
        open: true
            // 配置与后台相关的跨域服务器
            //proxy
            //inline: false
            //指定使用一个 host。默认是 localhost。如果你希望服务器外部可访问，指定如下：
            // host:"0.0.0.0"
            //启用 webpack 的模块热替换特性
            //hot: true
    },
    module: {
        //noparse: [/react\.min\.js$/],
        rules: [{
                test: /\.(js|ts|tsx)?$/,
                exclude: /(node_moudles|bower_components)/,
                use: {
                    // loader: "babel-loader",
                    // options: {
                    //     cacheDirectory: true
                    // }
                    loader: "happypack/loader?id=happybabel"
                },
                include: path.resolve(__dirname, "src"),
                exclude: path.resolve(__dirname, "node_modules"),
            },
            { test: /\.tsx?$/, loader: "ts-loader" },
            {
                test: /\.(scss|css|less)$/,
                use: [{
                        loader: "style-loader",
                    }, {
                        loader: "css-loader"
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            cacheDirectory: true
                        }
                    }
                ],
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [{
                    loader: "url-loader",
                    options: {
                        limit: 8192,
                        name: "images/[hash].[ext]",
                    }
                }]
            }
        ]
    },

    resolve: {
        //modules: [path.resolve(__dirname, "node_modules")],
        //mainFields: ["main"]
    },
    performance: {
        hints: false
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        }
    },
    plugins: [
        // new FriendlyErrorsWebpackPlugin({
        //     compilationSuccessInfo: {
        //         messages: ["You application is running here http://localhost:8080"],
        //         notes: ["Some additionnal notes to be displayed unpon successful compilation"]
        //     },
        //     onErrors: (severity, errors) => {
        //         if (severity !== "error") {
        //             return;
        //         }
        //         const error = errors[0];
        //         notifier.notify({
        //             title: "Webpack error",
        //             message: severity + ":" + error.name,
        //             subtitle: error.file || ""
        //         })
        //     },
        //     clearConsole: true
        // }),
        new webpack.DefinePlugin({ //设置成production去除警告
            'process.env': {
                NODE_ENV: JSON.stringify("production")
            }
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './common.html',
            inject: 'body'
        }),
        new CleanWebpackPlugin(['dist',
            'build'
        ], {
            root: __dirname,
            //verbose: true,
            dry: false,
            exclude: ['jslibs']
        }),

        //打包面包插件
        new DashbordPlugin(dash.setData),
        new HappyPack({
            id: 'happybabel',
            loaders: ["babel-loader"],
            threadPool: happyThreadPool,
            cache: true,
            //verbose: true
        }),
        new UglifyJParallerPlugin({
            workes: os.cpus().length
        }),

        // new DllReferencePlugin({
        //     manifest: require('./dist/react.manifest.json')
        // }),
        // new DllReferenctPlugin({
        //     manifest: require('./dist/polyfill.manifest.json')
        // })
    ]
}



// const compiler = webpack({})

// compiler.run((err, stats) => {

// })

// //监听
// const watching = compiler.watch({

// }, (err, stats) => {

//     console.error("1111111");
// })new