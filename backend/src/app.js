const http = require("http");
const express = require("express");
const config = require("./config");
const AppError = require("./misc/AppError");
const errors = require("./misc/errors");
const apiRouter = require("./router");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const path = require("path");

async function create() {
  console.log("express application을 초기화합니다.");
  const expressApp = express();

  expressApp.use(express.json());
  expressApp.use(express.urlencoded({ extended: false }));

  expressApp.use(cookieParser());

  expressApp.use(
    session({
      secret: process.env.SECRET,
      resave: false,
      saveUninitialized: true,
    })
  );

  // Health check API
  expressApp.get("/health", (req, res, next) => {
    res.json({
      status: "OK",
    });
  });

  // uploads안의 정적 파일을 제공
  expressApp.use("/uploads", express.static("uploads"));

  // version 1의 api router를 등록
  expressApp.use("/api", apiRouter.v1);

  // Swagger
  const swaggerSpec = YAML.load(path.join(__dirname, "./swagger/swagger.yaml"));
  expressApp.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // 해당되는 URL이 없을 때를 대비한 미들웨어
  expressApp.use((req, res, next) => {
    next(
      new AppError(
        errors.errorCodes.RESOURCE_ERROR,
        404,
        errors.errorMessages.RESOURCE_ERROR
      )
    );
  });

  // 에러 핸들러 등록
  expressApp.use((error, req, res, next) => {
    res.statusCode = error.httpCode ?? 500;
    console.log(error);
    res.json({
      errorCode: error.name,
      errorMessage: error.message,
    });
  });
  console.log("express application 준비가 완료되었습니다.");

  // express와 http.Server을 분리해서 관리하기 위함.
  const server = http.createServer(expressApp);

  const app = {
    start() {
      server.listen(config.port);
      server.on("listening", () => {
        console.log(`🚀 게시판 서버가 포트 ${config.port}에서 운영중입니다.`);
      });
    },
    stop() {
      console.log("🔥 서버를 중지 작업을 시작합니다.");
      this.isShuttingDown = true;
      return new Promise((resolve, reject) => {
        server.close(async (error) => {
          if (error !== undefined) {
            console.log(`- HTTP 서버 중지를 실패하였습니다: ${error.message}`);
            reject(error);
          }
          console.log("- 들어오는 커넥션을 더 이상 받지 않도록 하였습니다.");
          console.log("- DB 커넥션을 정상적으로 끊었습니다.");
          console.log("🟢 서버 중지 작업을 성공적으로 마쳤습니다.");
          this.isShuttingDown = false;
          resolve();
        });
      });
    },
    isShuttingDown: false,
    _app: expressApp,
  };

  return app;
}

module.exports = create;
