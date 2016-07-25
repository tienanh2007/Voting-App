
module.exports = {
  entry: {
    bundle :'./src/client.js',
    pollbundle:'./src/poll.js'
  },
  output: {
    path: './public',
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: [ 'es2015', 'stage-0', 'react' ],
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
