const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: "development",
  devtool: "eval-source-map",
  devServer: {
    historyApiFallback: true,
    contentBase: path.resolve(__dirname, '../src'),
    open: false,
    compress: true,
    hot: true,
    disableHostCheck: true,
    host: '0.0.0.0',
    port: 8080,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: [/\.vert$/, /\.frag$/],
        use: "raw-loader"
      },
      {
        test: /\.(gif|png|jpe?g|svg|xml)$/i,
        use: "file-loader"
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin({
      root: path.resolve(__dirname, "../")
    }),
    new webpack.DefinePlugin({
      CANVAS_RENDERER: JSON.stringify(true),
      WEBGL_RENDERER: JSON.stringify(true)
    }),
    new HtmlWebpackPlugin({
      template: "./index.html"
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  resolve: {
    alias: {
      '@Data': path.resolve(__dirname, '../src/data/'),
      '@Maps': path.resolve(__dirname, '../src/maps/'),
      '@Objects': path.resolve(__dirname, '../src/objects/'),
      '@Tileset': path.resolve(__dirname, '../src/tileset/'),
      '@Scenes': path.resolve(__dirname, '../src/scenes/'),
      '@Utilities': path.resolve(__dirname, '../src/utilities/')
    }
  }
};
