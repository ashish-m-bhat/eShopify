const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");

const htmlPlugin = new HtmlWebPackPlugin({
 template: "./public/index.html",
 filename: "./index.html",
 manifest: "./public/manifest.json",
});

module.exports = {
entry: './src/index.tsx',
output: {
  path: path.resolve(__dirname, "build"),
  filename: "main.js"
},
resolve: {
  extensions: [".ts", ".js", ".tsx", ".jsx", '.css'],
},
  module: {
    rules: [
      {
          test: /\.tsx?$/,
          exclude: /node_modules(?!\/@ashish-m-bhat\/*)/,
          loader: 'ts-loader',
          options: {
            "allowTsInNodeModules": true,
          }
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules(?!\/@ashish-m-bhat\/*)/,
        use: 'babel-loader',
      },
      {
        test: /\.(css|less)$/,
        use: ["style-loader", "css-modules-typescript-loader", "css-loader", "less-loader"]
      }
]},
 plugins: [htmlPlugin]
};