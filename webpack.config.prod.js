const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: "./src/index.js",
    mode: "production",
    devtool: "nosources-source-map",
    output: {
        filename: "bundle.js"
    },
    optimization: {
	minimize: true
    },
    plugins: [
	new webpack.DefinePlugin({
		'process.env': {
			'NODE_ENV': JSON.stringify('production')
		}
	}),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname + "/public/index.html"),
            inject: 'head'
        })
	],
    watch: false,
    module: {
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: 'babel-loader'
                },
                {
                    test: /\.css$/,
                    use: [ 'style-loader', 'css-loader' ]
                },
                {
                    test: /\.(html)$/,
                    use: {
                        loader: 'html-loader',
                        query: {
                            attrs: [':data-src'],
                            interpolate: 'require'
                        }
                    }
                },
                {
                    test: /\.(gif|png|jpe?g|svg|ico)$/i,
                    use: [
                        'file-loader',
                        {
                            loader: 'image-webpack-loader',
                            options: {
                                bypassOnDebug: true, // webpack@1.x
                                disable: true, // webpack@2.x and newer
                            },
                        },
                    ],
                }
            ]
        },
    },
    resolve: {
        extensions: [ '.js', '.jsx'],
        alias: {
            Utils: path.resolve(__dirname, "src/utils"),
            Sagas: path.resolve(__dirname, "src/sagas"),
            Stores: path.resolve(__dirname, 'src/stores/'),
            Components: path.resolve(__dirname, 'src/components/'),
            Containers: path.resolve(__dirname, 'src/containers/'),
            Views: path.resolve(__dirname, 'src/views/'),
            Widgets: path.resolve(__dirname, 'src/widgets/'),
            Reducers: path.resolve(__dirname, "src/reducers"),
            Root: path.resolve(__dirname, "src"),
            Images: path.resolve(__dirname, "src/imgs/")
        }
    },
}
