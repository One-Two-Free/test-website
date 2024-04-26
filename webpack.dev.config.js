const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: { index: "./src/index.js", second: "./src/second.js" },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "./dist"),
    publicPath: "",
    clean: true,
  },
  mode: "development",
  devServer: {
    // contentBase: path.resolve(__dirname, "./dist"),
    // index: "index.html",
    open: true,
    historyApiFallback: true,
    hot: true,
    static: {
      directory: path.resolve(__dirname, "./dist"),
    },
    devMiddleware: {
      index: "index.html",
      writeToDisk: true,
    },
    port: 9000,
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg)$/,
        type: "asset/resource",
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/env"],
          },
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
    }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      chunks: ["index"],
      template: "src/index.html",
      minify: false,
    }),
    new HtmlWebpackPlugin({
      filename: "second.html",
      chunks: ["second"],
      template: "src/second.html",
      minify: false,
    }),
  ],
};
