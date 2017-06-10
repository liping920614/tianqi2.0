module.exports={
	entry:'./main.js',

	output:{
		path:__dirname,
		filename:'build.js'
	},

	module:{
		loaders:[
			{test:/\.vue$/, loader:'vue-loader'},
			{
				test:/\.js$/, 
				loader:'babel-loader', 
				exclude:/node_modules/,
				query : {
					presets:['es2015'],
					plugins:['transform-runtime']
				}
			},
			{
	            test: /\.css$/,
	            loader: ["vue-style-loader", "css-loader"]
	        }
		]
	}
};
