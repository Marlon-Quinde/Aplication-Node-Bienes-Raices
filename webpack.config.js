const path = require("path");

module.exports = {
  mode: "development",
  entry: {
    mapa: "./src/js/mapa.js",
  },
  output: {
    filename: "[name].js",
    path: path.resolve("public/js"),
  },
};
