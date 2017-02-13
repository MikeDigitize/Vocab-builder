import 'babel-core/register';
import { resolve, join } from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin';

let webpackPlugins = [
    new HtmlWebpackPlugin({
        template: './src/index.html'
    }), 
    new ExtractTextPlugin('bundle.css'),
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
];

if(process.env.NODE_ENV === 'production') {
    webpackPlugins.push(
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.DefinePlugin({
          'process.env': {
            NODE_ENV: JSON.stringify('production')
          }
        })
    );
}

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
            use: {
                loader : 'babel-loader',
                options: {
                    presets: [
                        ['latest', { modules: false }], 
                        ['react']
                    ]
                }
            }            
        }, {
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
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
    plugins: webpackPlugins,
    watch : true
};