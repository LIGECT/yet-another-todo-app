import path from "path";
import { merge } from "webpack-merge";
import common from "./webpack.common.js";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default merge(common, {
  mode: "development",
  //   devtool: "inline-source-map",
  devtool: "eval-source-map",
  devServer: {
    static: { directory: path.resolve(__dirname, "dist") },
    hot: true,
    open: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
});
