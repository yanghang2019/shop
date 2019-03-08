const path = require('path');
const DllPlugin = require('webpack/lib/DllPlugin');
module.exports = {
    entry: {
        react: ['react', 'react-dom'],
    },
    output: {
        filename: '[name].dll.js',
        path: path.resolve(__dirname, './dist'),
        library: '_dll_[name]', //dll的全局变量名
    },
    plugins: [
        new DllPlugin({
            name: '_dll_[name]', //dll的全局变量名
            path: path.join(__dirname, './dist', '[name].manifest.json'), //描述生成的manifest文件
        })
    ]
}