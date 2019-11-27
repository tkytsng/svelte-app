const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "index_bundle.js"
  },
  plugins: [new HtmlWebpackPlugin()],
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
      }
    ]
  }
};
