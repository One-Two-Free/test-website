const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  devtool: "source-map",
  devServer: {
    open: true,
    hot: true,
    static: {
      directory: path.resolve(__dirname, "dist"),
    },
    // devMiddleware: {
    //   index: "index.html",
    //   writeToDisk: true,
    // },
    port: 3000,
  },

  entry: { 
    index: path.resolve(__dirname,'src','index.js'), 
    second: path.resolve(__dirname,'src','second.js') 
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
    // publicPath: "",
    clean: true,
    assetModuleFilename: 'assets/[name][ext]',
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: "index.html",
      // chunks: ["index"],
      template: path.resolve(__dirname, "src", "index.html"),
      // minify: false,
    }),
    new HtmlWebpackPlugin({
      filename: "second.html",
      // chunks: ["second"],
      template: path.resolve(__dirname, "src", "second.html"),
      // minify: false,
    }),
  ],

  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: /\.(css|sass|scss)$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
        generator: {
          filename: "fonts/[name][ext]",
        },
      },
      {
        test: /\.(jpe?g|png|webp|gif|svg)$/i,
        use: [
          {
            loader: "image-webpack-loader",
            options: {
              mozjpeg: {
                progressive: true,
              },
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: [0.65, 0.9],
                speed: 4,
              },
              gifsicle: {
                interlaced: false,
              },
              webp: {
                quality: 75,
              },
            },
          },
        ],
        type: 'asset/resource',
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
};
