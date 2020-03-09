/**
 * COMMON WEBPACK CONFIGURATION
 */

const path = require('path');
const webpack = require('webpack');

module.exports = options => ({
	mode: options.mode,
	entry: options.entry,
	output: Object.assign(
		{
			// Compile into js/build.js
			path: path.resolve(process.cwd(), 'build'),
			publicPath: '/',
		},
		options.output,
	), // Merge with env dependent settings
	optimization: options.optimization,
	module: {
		rules: [
			{
				test: /\.scss$/,
				exclude: /node_modules/,
				use: ['style-loader', 'css-loader', 'sass-loader'],
			}
		],
	},
	plugins: options.plugins.concat([
		// Always expose NODE_ENV to webpack, in order to use `process.env.NODE_ENV`
		// inside your code for any environment checks; Terser will automatically
		// drop any unreachable code.
		new webpack.EnvironmentPlugin({
			NODE_ENV: 'development',
		}),
	]),
	resolve: {
		modules: ['node_modules', 'app'],
		extensions: ['.js', '.jsx', '.react.js'],
		mainFields: ['browser', 'jsnext:main', 'main'],
	},
	devtool: options.devtool,
	target: 'web', // Make web variables accessible to webpack, e.g. window
	performance: options.performance || {},
});