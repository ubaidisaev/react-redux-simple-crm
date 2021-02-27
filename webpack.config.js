const path = require(`path`);

module.exports = {
  mode: "production",
  entry: path.resolve(__dirname, "src/index.tsx"),
  output: {
    filename: `bundle.js`,
    path: path.join(__dirname, `public`),
  },
  devServer: {
    // eslint-disable-next-line no-undef
    contentBase: path.join(__dirname, `public`),
    compress: false,
    port: 1337,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader"
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
      //   {
      //     test: /\.(js|jsx)$/,
      //     exclude: /node_modules/,
      //     use: {
      //       loader: `babel-loader`,
      //     },
      //   },
      {
        test: /\.(ts|tsx)$/,
        use: {
          loader: `ts-loader`,
        },
      },
    ],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src/"),
    },
    extensions: [`.ts`, `.tsx`, `.js`, `json`],
  },
  devtool: `source-map`,
};
