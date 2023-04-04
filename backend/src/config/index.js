const dotenv = require("dotenv");
const AppError = require("../misc/AppError");
const errors = require("../misc/errors");

process.env.NODE_ENV = process.env.NODE_ENV ?? "development";
console.log(
  `어플리케이션 서버를 다음 환경으로 시작합니다: ${process.env.NODE_ENV}`
);

const envFound = dotenv.config();
if (envFound.error) {
  throw new AppError(errors.configError, "Couldn't find .env file", false);
}

module.exports = {
  applicationName: process.env.APPLICATION_NAME || "app",

  port: parseInt(process.env.PORT ?? "8000", 10),
};
