module.exports = {
  entry: './src/app.js',
  output: {
    filename: './dest/app.js',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: [
            'es2015',
          ],
        },
      },
    ],
  },
};
