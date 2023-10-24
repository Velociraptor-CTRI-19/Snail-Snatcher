const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./client/index.js",
  output: {
    path: path.join(__dirname, "dist"),
    filename: "bundle.js",
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: "./client/index.html",
    }),
  ],
  module: {
    rules: [
      {
        test: /.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  devServer: {
    historyApiFallback: true,
    proxy: {
      // "/sellers": "http://localhost:3000/sellers",
      // "/buyers/display": "http://localhost:3000/buyers/display",
      // "/buyers/purchaseItem": "http://localhost:3000/buyers/purchaseItem",
      "/": "http://localhost:3000",
    },
    port: 8080,
  },
};
