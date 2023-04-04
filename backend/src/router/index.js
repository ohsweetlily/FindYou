const express = require("express");
const itemRouter = require("./itemRouter");
const authRouter = require("./authRouter");
const imageRouter = require("./imageRouter");
const mainRouter = require("./mainRouter");
const userRouter = require("./userRouter");
const boardRouter = require("./boardRouter");
const v1Router = express.Router();
const cors = require("cors");

v1Router.use(cors({ credentials: true, origin: true }));
v1Router.use("/items", itemRouter);
v1Router.use("/auth", authRouter);
v1Router.use("/images", imageRouter);
v1Router.use("/main", mainRouter);
v1Router.use("/users", userRouter);
v1Router.use("/boards", boardRouter);

module.exports = {
  v1: v1Router,
};
