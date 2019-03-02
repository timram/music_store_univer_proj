const path = require('path');
const ExtractTextPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

module.exports = {
  mode: 'production',
  entry: {
    'admin-dashboard': './app/admin-dashboard.jsx',
    'catalog-app': './app/catalog-app.jsx'
  },
  output: {
    path: path.resolve(__dirname, './public'),
    publicPath: '/public/',
    filename: '[name].js',
    sourceMapFilename: '[name].map'
  },
  plugins: [
    new ExtractTextPlugin({ fileName: 'stylesBundle.css' })
  ],
  devServer: {
    historyApiFallback: {
      index: 'index.html'
    }
  },
  devtool: '#source-map',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react', 'stage-2']
        }
      },
      {
        test: /\.s?css$/,
        exclude: /node_modules/,
        use: [
          ExtractTextPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          { loader: 'sass-loader' },
          { loader: 'postcss-loader' }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  }
};
