const merge = require("webpack-merge");
const path = require("path");
const base = require("./base");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = merge(base, {
  mode: "production",
  output: {
    filename: "bundle.min.js"
  },
  devtool: false,
  performance: {
    maxEntrypointSize: 900000,
    maxAssetSize: 900000
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          output: {
            comments: false
          }
        }
      })
    ]
  },
  resolve: {
    alias: {
      '@Data': path.resolve(__dirname, 'src/data/'),
      '@Maps': path.resolve(__dirname, 'src/maps/'),
      '@Objects': path.resolve(__dirname, 'src/objects/'),
      '@Tileset': path.resolve(__dirname, 'src/tileset/'),
      '@Scenes': path.resolve(__dirname, '../src/scenes/'),
      '@Utilities': path.resolve(__dirname, 'src/utilities/')
    }
  }
});
