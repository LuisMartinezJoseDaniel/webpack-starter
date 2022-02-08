const HTMLWebpack = require("html-webpack-plugin");
const MiniCssExtract = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "development",

  output: {
    //Eliminar los archivos html de dist y volver a crearlos
    clean: true,
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
    ],
  },

  optimization: {},
  plugins: [
    //Configurar el titulo y el nombre del archivo en dist
    new HTMLWebpack({
      title: "Mi WebPack App",
      // filename: 'index.html' //opcional, por defecto index.html
      template: "./src/index.html",
    }),
    new MiniCssExtract({
      filename: "[name].css", //Utilizar el css con nombre hash
      ignoreOrder: false,
    }),
    new CopyPlugin({
      patterns: [{ from: "src/assets/", to: "assets/" }],//Mover recursos estaticos
    }),
  ],
};
