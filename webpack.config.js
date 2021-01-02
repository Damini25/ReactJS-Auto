const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
  entry: "./src/index.tsx",
  target: "web",
  mode: "development",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js",
  },
  resolve: {
    extensions: [".js", ".jsx", ".json", ".ts", ".tsx"],
  },
  devServer: {
    port: 3000,
    contentBase: path.join(__dirname, './public'),
    hot: true,
    open: true,
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: "awesome-typescript-loader",
      },
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader",
      },
      {
        test: /\.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ]
      },
      {
        test: /\.(png|j?g|svg|gif|ico)?$/,
        use: 'file-loader'
      },
      {
        test: /\.json$/,
        loader: "json-loader",
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public/index.html"),
      favicon: path.resolve(__dirname, 'public/favicon.ico'),
      manifest: path.resolve(__dirname, 'public/manifest.json')
    }),
    new MiniCssExtractPlugin({
      filename: "./src/yourfile.css",
    }),
  ],
};
