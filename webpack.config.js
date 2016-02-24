/* eslint-disable */
var path = require('path');
var webpack = require('webpack');
var merge = require('webpack-merge');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var cssnext = require('cssnext');
var postcssImport = require('postcss-import');
var postMixins = require('postcss-mixins');
var postNested = require('postcss-nested');

var TARGET = process.env.npm_lifecycle_event;
var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'src');
var BUILD_PATH = path.resolve(ROOT_PATH, 'dist');

/* eslint-enable */
var common = {
    entry: {
        vendor: ['jquery'],
        index: path.join(APP_PATH, 'index'),
        appList: path.join(APP_PATH, 'appList'),
        login: path.join(APP_PATH, 'login'),
        login2: path.join(APP_PATH, 'login2'),
        register: path.join(APP_PATH, 'register'),
        topList: path.join(APP_PATH, 'topList'),
        appDetail: path.join(APP_PATH, 'appDetail'),
    },
    output: {
        path: 'dist',
        filename: '[name].bundle.js',
    },
    module: {
        loaders: [{
            test: /\.json$/,
            loader: 'json'
        }, {
            test: /\.(png|jpg)$/,
            loader: 'url?limit=25000'
        }, {
            test: /\.html$/,
            exclude: /node_modules/,
            loader: 'html'
        }, {
            test: /\.(ttf|eot|svg|otf)(\?v=\d(\.\d){2})?$/,
            loader: 'file'
        }, {
            test: /\.woff(2)?(\?v=\d(\.\d){2})?$/,
            loader: 'url?limit=10000&minetype=application/font-woff'
        }, ]
    },
    postcss: function () {
        return [
            postcssImport({
                onImport: function (files) {
                    files.forEach(this.addDependency);
                }.bind(this),
            }),
            cssnext({
                features: {
                    'browers': ['> 10%, last 2 versions, ie >= 9, not opera >= 33'],
                },
            }),
            postMixins,
            postNested,
        ];
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html',
            chunks: ['vendor', 'index'],
        }),
        new HtmlWebpackPlugin({
            filename: 'appList.html',
            template: './src/appList.html',
            chunks: ['vendor', 'appList'],
        }),
        new HtmlWebpackPlugin({
            filename: 'login.html',
            template: './src/login.html',
            chunks: ['vendor', 'login'],
        }),
        new HtmlWebpackPlugin({
            filename: 'login2.html',
            template: './src/login2.html',
            chunks: ['vendor', 'login2'],
        }),
        new HtmlWebpackPlugin({
            filename: 'register.html',
            template: './src/register.html',
            chunks: ['vendor', 'register'],
        }),
        new HtmlWebpackPlugin({
            filename: 'topList.html',
            template: './src/topList.html',
            chunks: ['vendor', 'topList'],
        }),
        new HtmlWebpackPlugin({
            filename: 'appDetail.html',
            template: './src/appDetail.html',
            chunks: ['vendor', 'appDetail'],
        }),
        new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
    ],
    node: {
      fs: "empty"
    }
};



/* ------------------------------------------------------------
 * development
 * ------------------------------------------------------------ */

if (TARGET === 'start' || !TARGET) {
    module.exports = merge(common, {
        module: {
            loaders: [{
                test: /\.css$/,
                loader: 'style!css!postcss'
            }, ]
        }
    });
}

/* ------------------------------------------------------------
 * product
 * ------------------------------------------------------------ */


if (TARGET === 'build') {
    module.exports = merge(common, {
        module: {
            loaders: [{
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader')
            }]
        },
        plugins: [
            new ExtractTextPlugin('[name].css', {
                disable: false,
                allChunks: true,
            })
        ]
    });
}
