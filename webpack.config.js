import path from "path";

export default {
  mode: "development",
  entry: "./src/public/js/map.js",
  output: {
    filename: "bundle.js",
    path: path.resolve("./src/public/dist"),
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
};
