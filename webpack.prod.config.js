var path = require('path');
var webpack = require('webpack');

module.exports = {
	entry: './src/main.js',
	output: {
		path: path.resolve(__dirname, './dist'),
		publicPath: '/dist/',
		filename: 'sharary_bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader'
			},
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				query: {
					presets: ['es2015', 'stage-0']
				}
			}
		]
	},
	resolve: {
		alias: {
			'vue$': 'vue/dist/vue.js'
		}
	},
	plugins: [
	    // short-circuits all Vue.js warning code
	    new webpack.DefinePlugin({
	      'process.env': {
	        NODE_ENV: '"production"'
	      }
	    }),

	    //uglify
        new webpack.optimize.UglifyJsPlugin({
            test: /(\.js|\.vue)$/,
            compress: {
                warnings: false
            },
            comments: false
        }),
        
        // optimize module ids by occurrence count
    	new webpack.optimize.OccurrenceOrderPlugin()
    ]

}
