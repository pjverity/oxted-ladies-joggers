const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {INDEX_TITLE, INDEX_META_DESCRIPTION} = require('./src/site-constants');

module.exports = {
	output: {
		path: path.resolve(__dirname, 'dist')
	},
	module: {
		rules: [
			{test: /\.jsx$/, exclude: /node_modules/, loader: "babel-loader"},
			{test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"},
			{test: /\.css$/, use: ['style-loader', 'css-loader']},
			{
				test: /\.(scss)$/,
				use: [{
					loader: 'style-loader', // inject CSS to page
				}, {
					loader: 'css-loader', // translates CSS into CommonJS modules
				}, {
					loader: 'postcss-loader', // Run post css actions
					options: {
						plugins: function () { // post css plugins, can be exported to postcss.config.js
							return [
								require('precss'),
								require('autoprefixer')
							];
						}
					}
				}, {
					loader: 'sass-loader' // compiles Sass to CSS
				}]
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, 'src/index.html'),
			title: INDEX_TITLE,
			description: INDEX_META_DESCRIPTION
		})
	]
};