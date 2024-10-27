const Dotenv = require("dotenv-webpack");
const path = require("path");

module.exports = {
  // Các thiết lập khác của Webpack...
  plugins: [
    new Dotenv({
      path: path.resolve(__dirname, "env/.env"), // Đường dẫn đến file .env trong thư mục env
    }),
  ],
};
