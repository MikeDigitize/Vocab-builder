import 'babel-core/register';
import { resolve, join } from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin';

module.exports = {
    devtool: 'source-map',
    devServer: {
        contentBase: join(__dirname, 'build'),
        compress: true,
        inline : true,
        port: 9000
    },
    entry: {
        app: 'js/app.jsx'
    },
    resolve: {
        modules: [
            join(__dirname, 'src'),
            'node_modules'
        ],
        extensions: ['.jsx', '.js', '.scss']
    },
    output: {
        path: resolve(`${__dirname}/build`),
        filename: 'js/[name].js'
    },
    module: {
        rules: [{
            test: /\.jsx$|\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            options: {
                presets: [
                    ['latest', { modules: false }], 
                    ['react']
                ]
            }
        }, {
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract({
                fallbackLoader: 'style-loader',
                loader: 'css-loader?modules!sass-loader'
            })
        }, {
            test: /\.jpg$/,
            use: ['file-loader']
        }, {
            test: /\.png$/,
            use: { 
                loader: 'url-loader', 
                options: { limit: 100000 } 
            }
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            title: 'Vocab'
        }), 
        new ExtractTextPlugin('bundle.css'),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true
        }),
        new webpack.DefinePlugin({
            'process.env': { 
                NODE_ENV: JSON.stringify('production') 
            }
        }),
        new CopyWebpackPlugin([{
            context: './src/images',
            from: '**/*.jpg',
            to: './images'
        }, {
            context: './src',
            from: '**/*.css',
            to: './'
        }]),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessorOptions: { discardComments: { removeAll: true } }
        })
    ],
    watch : true
};