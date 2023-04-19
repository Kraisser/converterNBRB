const webpack = require('webpack');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlBundlerPlugin = require('html-bundler-webpack-plugin');
const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

let mode = 'development';
let target = 'web';

if (process.env.NODE_ENV === 'production') {
	mode = 'production';
	target = 'browserslist';
}

module.exports = {
	mode: 'development',
	devtool: 'source-map',
	devServer: {
		historyApiFallback: true,
		static: path.resolve(__dirname, './build'),
		open: true,
		compress: true,
		hot: false,
		port: 8080,
		client: {
			overlay: {
				errors: true,
				warnings: false,
			},
			progress: true,
		},
	},
	entry: {
		main: './src/js/index.js',
		converter: './src/js/converter.js',
	},
	output: {
		path: __dirname + '/build',
		filename: '[name].[contenthash].bundle.js',
		assetModuleFilename: (pathData) => {
			const filepath = path.dirname(pathData.filename).split('/').slice(1).join('/');
			return `${filepath}/[name][ext]`;
		},
		clean: true,
	},
	target,
	module: {
		rules: [
			{
				test: /\.html$/,
				use: 'html-loader',
			},
			{
				test: /\.m?js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
						cacheDirectory: true,
					},
				},
			},
			{
				test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
				exclude: /node_modules/,
				type: mode === 'production' ? 'asset' : 'asset/resource',
			},
			{
				test: /\.m?mp3$/,
				exclude: /node_modules/,
				type: 'asset/resource',
			},
			{
				test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
				exclude: /node_modules/,
				type: 'asset/inline',
			},
			{
				test: /\.(s[ac]|c)ss$/i,
				use: [
					MiniCssExtractPlugin.loader,
					{loader: 'css-loader'},
					{
						loader: 'postcss-loader',
						options: {
							postcssOptions: {
								sourceMap: true,
								plugins: [require('autoprefixer')],
							},
						},
					},
					{loader: 'sass-loader'},
				],
			},
		],
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].[contenthash].css',
		}),
		new HtmlWebpackPlugin({
			title: '[title]',
			template: './src/index.html',
			excludeChunks: ['converter'],
		}),
		new HtmlWebpackPlugin({
			filename: 'converter.html',
			title: '[title]',
			template: './src/converter.html',
			excludeChunks: ['main'],
		}),
	],
};
