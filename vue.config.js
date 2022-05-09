const CopyWebpackPlugin = require("copy-webpack-plugin");
const webpack = require("webpack");
const path = require("path");

module.exports = {
  runtimeCompiler: true,
  publicPath:
    process.env.NODE_ENV === "production" ? "/\n" + "vue-cesium-example/" : "/",
  resolve: {
    extenstions: ['.js', '.vue', '.json'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    }
  },
  configureWebpack: {
    plugins: [
      new CopyWebpackPlugin({
        patterns: [
          { from: "node_modules/cesium/Build/Cesium/Workers", to: "Workers" },
          {
            from: "node_modules/cesium/Build/Cesium/ThirdParty",
            to: "ThirdParty"
          },
          { from: "node_modules/cesium/Build/Cesium/Assets", to: "Assets" },
          { from: "node_modules/cesium/Build/Cesium/Widgets", to: "Widgets" }
        ]
      }),
      new webpack.DefinePlugin({
        // Define relative base path in cesium for loading assets
        CESIUM_BASE_URL: JSON.stringify("")
      }),
    ],
    module: {
      rules: [
        {
          test: /\.png$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
          } 
        }
      ],
      unknownContextCritical: false,
      unknownContextRegExp: /\/cesium\/cesium\/Source\/Core\/buildModuleUrl\.js/
    }
  }
};
