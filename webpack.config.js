const path = require('path');
module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'snake',
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: [
            [
              '@babel/preset-env',
              {
                targets: {
                  ie: 11,
                },
              },
            ],
          ],
        },
      },
    ],
  }
}
