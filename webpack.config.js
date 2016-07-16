
module.exports = {
  entry: './src/client.js',
  output: {
    path: './public',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: [ 'es2015', 'stage-1', 'react' ],
          plugins: ["transform-runtime",
          "transform-class-properties"] // if any enter here.
        }
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.json']
  }
};
