module.exports = {
    output: {
      publicPath: './dist',
      chunkFilename: '[name].js'
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          loader: "babel-loader",
          options: {
            presets: [[
              "@babel/preset-env", {
                useBuiltIns: false
              }],
              "@babel/preset-react"],
            plugins: [
              "@babel/plugin-proposal-class-properties",
              "@babel/plugin-proposal-export-default-from",
              ["@babel/plugin-transform-runtime", {
                "regenerator": true
              }]
            ]
          }
        },
        {
          test: /\.(png|jpg)$/,
          loader: 'url-loader'
        },
        { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" },
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader']
        }
      ]
    },
    watch: true
};