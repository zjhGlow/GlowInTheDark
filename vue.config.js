const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})

const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
 
const CopyWebpackPlugin = require("copy-webpack-plugin");
const webpack = require("webpack");
const cesiumSource = "./node_modules/cesium/Source";
 
function resolve(dir) {
  return path.join(__dirname, dir);
}
 
module.exports = {
  publicPath: './',
  outputDir: 'dist', // 输出文件目录
  devServer: {
    port: 8080,
    open: true,
    proxy: {
      //配置代理服务器来解决跨域问题
      "/api": {
        target: "http://localhost:80/api/", //配置要替换的后台接口地址
        changOrigin: true, //配置允许改变Origin
        pathRewrite: {
          "^/api/": "/",
        },
      },
    },
  },
  lintOnSave: false,
  configureWebpack: {
    output: {
      sourcePrefix: " ", // 1 让webpack 正确处理多行字符串配置 amd参数
    },
    amd: {
      // 2
      toUrlUndefined: true, // webpack在cesium中能友好的使用require
    },
    resolve: {
      extensions: [".js", ".vue", ".json"],
      alias: {
        //'vue$': 'vue/dist/vue.esm.js',
        "@": path.resolve("src"),
        components: path.resolve("src/components"),
        assets: path.resolve("src/assets"),
        views: path.resolve("src/views"),
        cesium: path.resolve(__dirname, cesiumSource),
      },
    },
    plugins: [
      // 4
      new CopyWebpackPlugin({
        patterns:[
          { from: path.join(cesiumSource, "Workers"), to: "Workers" },
        ]
      }),
      new CopyWebpackPlugin({
        patterns:[
          { from: path.join(cesiumSource, "Assets"), to: "Assets" },
        ]
      }),
      new CopyWebpackPlugin({
        patterns:[
          { from: path.join(cesiumSource, "Widgets"), to: "Widgets" },
        ]
      }),
      new CopyWebpackPlugin({
        patterns:[
          {
            from: path.join(cesiumSource, "ThirdParty/Workers"),
            to: "ThirdParty/Workers",
          },
        ]
      }),
      new webpack.DefinePlugin({
        // 5
        CESIUM_BASE_URL: JSON.stringify("./"),
      }),
    ],
    module: {
        unknownContextCritical:false,  
      rules: [
        {
          test: /\.js$/,
          use: {
            loader: "@open-wc/webpack-import-meta-loader",
          },
        },
        {
          test: /\.(glb|gltf)?$/,
          use: {
            loader: "url-loader",
          },
        },
      ],
    },
  },
};
