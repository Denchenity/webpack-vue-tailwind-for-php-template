const path = require('path');
const CssMin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const {VueLoaderPlugin} = require('vue-loader');
const {DefinePlugin} = require('webpack');


const isDev = process.env.NODE_ENV === 'development';
const IsProd = !isDev;

const pathToFont = path.join(__dirname, './src/assets/font/');
const pathToImage = path.join(__dirname, './src/assets/image');
const pathToService = path.join(__dirname, './src/components/Service/');
const pathToComponent = path.join(__dirname, './src/components/UI/');
const pathToStyle = path.join(__dirname, './src/style/');

const PORT = 8080;

module.exports = {
    mode: 'development',
    resolve:{
        alias:{
            '@font': pathToFont,
            '@image': pathToImage,
            '@service': pathToService,
            '@component': pathToComponent,
            '@style': pathToStyle,
        }
    },
    entry: {
        visa: path.resolve(__dirname, './src/services/visa/visa.js'),
        test: path.resolve(__dirname, './src/services/test/test.js'),
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'services/[name]/[name].js',
        clean: true,
    },
    devServer: {
        static: {
            directory: path.join(__dirname, `./dist`),
        },
        compress: true,
        port: PORT,
    },
    devtool: isDev ? 'source-map': false,
    module: {
        rules: [
            //vue
            {
                test: /\.vue$/,
                use:'vue-loader'
            },
            //js
            {
                test: /\.js$/,
                use:{
                    loader: 'babel-loader',
                },
            },
            // CSS, PostCSS, Sass
            {
                test:/\.css$/i,
                use: [
                    CssMin.loader,
                    'css-loader',
                    'postcss-loader',
                ],
            },
            {
                test:/\.s[ac]ss$/i,
                use: [
                    CssMin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                ],
            },
            //image
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/image/[name][ext]'
                }
            },
            //Шрифты
            {
                test: /\.ttf$/,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/fonts/[name][ext]'
                }
            }
        ],
    },
    plugins: [
        new CssMin({
            filename: 'style/[name]/[name].css',
        }),
        new VueLoaderPlugin(),
        new DefinePlugin({
            __VUE_OPTIONS_API__: true,
            __VUE_PROD_DEVTOOLS__: true
        }),
        new HtmlWebpackPlugin({
            template: `./src/views/visa.html`,
            filename: `./views/visa.html`,
            inject: false,
        }),
        new HtmlWebpackPlugin({
            template: `./src/views/test.html`,
            filename: `./views/test.html`,
            inject: false,
        }),
    ],
}
