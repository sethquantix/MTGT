const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: "./src/index.js",
    mode: "development",
    devtool: "eval-source-map",
    output: {
        filename: "bundle.js"
    },
    plugins: [
        new HtmlWebpackPlugin()
    ],
    devServer: {
        publicPath: '/',
        historyApiFallback: true,
    },
    watch: true,
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
                test: /\.svg$/,
                loader: 'svg-inline-loader'
            },
            {
                test: /\.(html)$/,
                use: {
                    loader: 'html-loader',
                    options: {
                        attrs: [':data-src']
                    }
                }
            }
        ]
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
            Root: path.resolve(__dirname, "src")
        }
    },
}
