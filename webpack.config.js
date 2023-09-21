const path = require("path");

module.exports = {
  mode: "development",
  entry: {
    mapa: "./src/js/mapa.js",
    agregarImagen: "./src/js/agregarImagen.js",
  },
  output: {
    filename: "[name].js",
    path: path.resolve("public/js"),
  },
};
