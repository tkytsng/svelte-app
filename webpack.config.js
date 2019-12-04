const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const Dotenv = require("dotenv-webpack");

module.exports = {
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "index.js"
  },
  plugins: [
    new Dotenv(),
    new HtmlWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "asset/bulma.css"
    })
  ],
  resolve: {
    // see below for an explanation
    alias: {
      svelte: path.resolve("node_modules", "svelte")
    },
    extensions: [".mjs", ".js", ".ts", ".svelte"],
    mainFields: ["svelte", "browser", "module", "main"]
  },
  module: {
    rules: [
      {
        test: /\.(html|svelte)$/,
        include: path.resolve(__dirname, "./src"),
        exclude: /node_modules/,
        use: "svelte-loader"
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader"
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.ts$/,
        exclude: /node_modules|svelte\/src/,
        loader: "ts-loader",
        options: {
          appendTsSuffixTo: [/\.svelte$/]
        }
      }
    ]
  }
};
