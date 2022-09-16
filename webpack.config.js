const path = require('path');
const CssMin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const {VueLoaderPlugin} = require('vue-loader');
const {DefinePlugin} = require('webpack');


const isDev = process.env.NODE_ENV === 'development';
const IsProd = !isDev;



const BaseComponentPath = path.join(__dirname, './src/components/BaseComponent.vue');
const ComponentPath = path.join(__dirname, './src/components/');
const StylePath = path.join(__dirname, './src/style/');
const StorePath = path.join(__dirname, './src/store/');
const HelpersPath = path.join(__dirname, './src/helpers/');
const NodeModules = path.join(__dirname, './node_modules/');
const FontPath = path.join(__dirname, './src/assets/font/');
const ImagePath = path.join(__dirname, './src/assets/image/');
const MixinPath = path.join(__dirname, './src/mixins/');
const DirectivesPath = path.join(__dirname, './src/directives/');
const CompositionsPath = path.join(__dirname, './src/composition/');

const bundle_name = 'dist';

const PORT = 8080;

module.exports = {
    mode: 'development',
    resolve:{
        alias:{
            '@component': ComponentPath,
            '@style': StylePath,
            '@baseComponent': BaseComponentPath,
            '@store': StorePath,
            '@helpers': HelpersPath,
            '@': NodeModules,
            '@font': FontPath,
            '@image': ImagePath,
            '@mixins': MixinPath,
            '@directives': DirectivesPath,
            '@composition': CompositionsPath,
        }
    },
    entry: {
        test: path.resolve(__dirname, './src/module/test/test.js'),
    },
    output: {
        path: path.resolve(__dirname, `./${bundle_name}`),
        filename: 'module/[name]/[name].js',
        clean: true,
    },
    devServer: {
        static: {
            directory: path.join(__dirname, `./${bundle_name}`),
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
                    'sass-loader',
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
            filename: 'module/[name]/[name].css',
        }),
        new VueLoaderPlugin(),
        new DefinePlugin({
            __VUE_OPTIONS_API__: true,
            __VUE_PROD_DEVTOOLS__: isDev
        }),
        new HtmlWebpackPlugin({
            template: `./src/module/test/test.html`,
            filename: `./module/test/test.html`,
            inject: false,
        }),
    ],
}