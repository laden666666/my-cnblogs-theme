var path = require('path')
var config = require('./config')
var utils = require('./utils')
var projectRoot = path.resolve(__dirname, '../')
var autoprefixer = require('autoprefixer')
var postcssImport  = require("postcss-import")

var env = process.env.NODE_ENV
    // check env & config/index.js to decide weither to enable CSS Sourcemaps for the
    // various preprocessor loaders added to vue-loader at the end of this file
var cssSourceMapDev = (env === 'development' && config.dev.cssSourceMap)
var cssSourceMapProd = (env === 'production' && config.build.productionSourceMap)
var useCssSourceMap = cssSourceMapDev || cssSourceMapProd


module.exports = {
    entry: {
        entry: './src/index.js',
    },
    output: {
        path: path.join(__dirname, "../dist"),
        libraryTarget: 'umd',
        umdNamedDefine: true,
        filename: 'my-blog.js',
        library: 'myBlog'
    },
    resolve: {
        extensions: ['', '.js', '.less', '.css', '.scss'],
        fallback: [path.join(__dirname, '../node_modules')],
        alias: {
            'src': path.resolve(__dirname, '../src'),
            'assets': path.resolve(__dirname, '../src/assets'),
            'components': path.resolve(__dirname, '../src/components')
        }
    },
    resolveLoader: {
        fallback: [path.join(__dirname, '../node_modules')]
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel',
            include: projectRoot,
            exclude: /node_modules/
        }, {
            test: /\.json$/,
            loader: 'json'
        }, {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            loader: 'url',
            query: {
                limit: 10000,
                name: utils.assetsPath('img/[name].[ext]')
            }
        }, {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            loader: 'url',
            query: {
                limit: 10000,
                name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
            }
        }]
    },
    postcss: function(webpack) {
        return [
            autoprefixer({browsers: ["last 10 Chrome versions", "last 5 Firefox versions", "Safari >= 6", "ie > 8", "iOS 8"] })
        ]
    },
    externals: {
        'React': true
    }
}