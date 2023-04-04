const express = require("express");
const imageRouter = express.Router();
const { imageMiddleware } = require("../middleware");
const { imageController } = require("../controller");

imageRouter.post("/", imageMiddleware.upload.single("image"));

imageRouter.get("/:size", imageController.find);

module.exports = imageRouter;
