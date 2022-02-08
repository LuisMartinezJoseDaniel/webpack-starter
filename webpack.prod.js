const HTMLWebpack = require("html-webpack-plugin");
const MiniCssExtract = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const CssMinimizer = require('css-minimizer-webpack-plugin');
const Terser = require('terser-webpack-plugin');

module.exports = {
  mode: "production",

  output: {
    //Eliminar los archivos html de dist y volver a crearlos
    clean: true,
    filename: "main.[contenthash].js",
  },

  module: {
    rules: [
      {
        //Para todos los .html
        test: /\.html$/,
        loader: "html-loader", //utilizar el plugin: html-loader
        options: {
          sources: false, //Se usa para mover imagenes, y otros recursos
        },
      },
      {
        test: /\.css$/,
        exclude: /styles.css$/, //Se excluye, para poder ejecutar la siguiente regla
        use: ["style-loader", "css-loader"],
      },
      {
        test: /styles.css$/,
        use: [MiniCssExtract.loader, "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif)/,
        loader: "file-loader",
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },

  optimization: {
    minimize: true,
    minimizer: [new CssMinimizer(), new Terser()],
  },
  plugins: [
    //Configurar el titulo y el nombre del archivo en dist
    new HTMLWebpack({
      title: "Mi WebPack App",
      // filename: 'index.html' //opcional, por defecto index.html
      template: "./src/index.html",
    }),
    new MiniCssExtract({
      filename: "[name].[fullhash].css", //Utilizar el css con nombre hash
      ignoreOrder: false,
    }),
    new CopyPlugin({
      patterns: [{ from: "src/assets/", to: "assets/" }], //Mover recursos estaticos
    }),
  ],
};
