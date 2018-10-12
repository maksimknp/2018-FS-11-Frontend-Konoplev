module.exports = {
    entry: {
        app: './src/index.js',
    },
    output: {
        filename: 'main.js',
        path: __dirname + '/dist',
        publicPath: 'dist/'
    },
    module: {
        rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader', 'eslint-loader']
            },
            {
                test: /\.css$/,
                use: [{
                        loader: "style-loader",
                    },
                    {
                        loader: "css-loader",
                    },
                ]
            }
        ]
    },
    devtool: 'source-map',
}
