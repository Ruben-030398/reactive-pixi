const path = require('path');
const common = require('./webpack.common');
const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const HTMLInlineScriptPlugin = require('html-inline-script-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  output: {
    filename: 'main.[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: ''
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HTMLInlineScriptPlugin(),
  ],
  optimization: {
    minimizer: [
      new TerserPlugin({ extractComments: false }),
    ]
  },
  module: {
    rules: [
      {
        test: /.s?css$/,
        use: [
          "style-loader",
          "css-loader"
        ],
      },
    ]
  },
});
