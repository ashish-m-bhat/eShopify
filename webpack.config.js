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
          exclude: /node_modules/,
          loader: 'ts-loader'
      },
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
      },
  {
   test: /\.(css|cdd.d.ts)$/,
   use: ["style-loader", "css-modules-typescript-loader", "css-loader"]
  }
]},
 plugins: [htmlPlugin]
};