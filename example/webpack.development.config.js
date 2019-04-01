const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HappyPack = require("happypack");
const os = require("os");
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

const DllReferencePlugin = require('webpack/lib/DllReferencePlugin');

// const UglifyJParallerPlugin = require("webpack-uglify-parallel");

// const UglifyJsPlugin = require("uglifyjs-webpack-plugin");


//打包面板插件
const Dashbord = require("webpack-dashboard");
const DashbordPlugin = require("webpack-dashboard/plugin");
const dash = new Dashbord();

// //配置压缩文件

// const uglify = new UglifyJsPlugin({

// })




// module.exports = function(env = {}, argv) {
//     const plugin = [];

//     const isProduction = env["production"];

//     if (isProduction) {
//         plugins.push(
//             new
//         )
//     }
// }



module.exports = {
    mode: "development",
    entry: {
        bundle: path.resolve(__dirname, "./src/main.js"),
        vendors: ["react", "react-dom", "react-router"]
    },
    output: {
        path: path.resolve(__dirname, "./build"),
        filename: "[chunkhash].js"
    },

    //验证是否可以调试
    devtool: "source-map",

    //监听文件更新，文件变化时重新编译
    watch: true,

    watchOptions: {
        ignored: /node_moudules/
    },

    // resolveLoader: {
    //     modules: ["node_modules"]
    // },

    // externals: {
    //     "react": "React",
    //     "react-dom": "ReactDOM",

    // },
    resolve: {
        extensions: [".tsx", , ".scss", ".js", ".ts"],
        //基于webpack文件所在位置
        alias: {
            views: path.resolve(__dirname, './src/views/'),
            utils: path.resolve(__dirname, "./src/utils/"),
            'react': path.resolve(__dirname, 'node_modules/react/cjs/react.development. min.js')
        },
        //用来配置文件必须有扩展名
        // enforceExtension:true

        //解析文件，从哪个模块开始，分析绝对路径和相对路径
        // modules: [path.resolve(__dirname, "src"), "node_modules"],
        modules: [path.resolve(__dirname, "node_modules")],

        mainFields: ["main"],
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
        //cache: true,
        //打开浏览器
        open: true,
        // 配置与后台相关的跨域服务器
        //proxy
        //inline: false
        //指定使用一个 host。默认是 localhost。如果你希望服务器外部可访问，指定如下：
        //host: "10.10.10.21",
        port: 8082
            //启用 webpack 的模块热替换特性
            //hot: true
    },
    module: {
        noParse: /react\.min\.js$/,
        rules: [{
                test: /\.(js|ts|tsx)$/,
                exclude: /(node_moudles|bower_components)/,
                use: {
                    loader: "happypack/loader?id=happybabel"
                },
                exclude: path.resolve(__dirname, "node_modules"),
            },
            { test: /\.tsx$/, loader: "ts-loader" },
            {
                test: /\.(scss|css|less)$/,
                use: {
                    loader: "happypack/loader?id=css"
                }
                // ["style-loader", "css-loader", "sass-loader"]
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
        }),
        new webpack.NamedModulesPlugin(),
        new HappyPack({
            id: 'css',
            loaders: ["style-loader", "css-loader", "sass-loader"],
            threadPool: happyThreadPool,
            cache: true,
        }),

        //此文件适用于生产环境打包的时候使用
        // new UglifyJParallerPlugin({
        //     workes: os.cpus().length
        // })
    ]
}



//测试node API

// const compiler = webpack({})

// compiler.run((err, stats) => {
// console.log(stats, "run ======> stats")
// if (err) {
//     console.error(err.stack || err);
//     if (err.details) {
//         console.error(err.details, "details");
//     }
//     return;
// }

// const info = stats.toJson();

// if (stats.hasErrors()) {
//     console.error(info.errors, "Error");
// }

// if (stats.hasWarnings()) {
//     console.warn(info.warnings, "warning");
// }
//})

// //监听
// const watching = compiler.watch({
//     aggregateTimeout: 300,
//     poll: undefined
// }, (err, stats) => {
//     console.error(err, 235435346);
// })

// //argv，返回包含启动node.js时输入的执行命令参数
// process.argv.forEach((val, index) => {
//     console.log(`${index}: ${val}`, "90");
// });

// process.on("exit", code => {
//     process.stdout.write(code);
// })

// process.on("uncaughtException", err => {
//     process.stdout.write("捕获的异常", err);
// });

// //主要监听nodeJS在运行时遇到的警告
// process.on('warning', (warning) => {
//     if (warning.name.match("DeprecationWarning")) {
//         process.stdout.write("Tapable.plugin will Depart");
//     }
//     console.warn(warning.name, 123); // 打印告警名称
//     console.warn(warning.message, 345); // 打印告警信息
//     console.warn(warning.stack, 789); // 打印堆栈信息
// });


// //当接收到信号的时候会触发这个时间
// process.on("SIGINT", () => {
//     process.stdout.write("停止node的运行");
// })

// // process.stdout.write(process.argv0, "1mmmmm")