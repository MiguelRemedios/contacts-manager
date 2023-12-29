const express = require("express");
const homeController = require("./src/controllers/homeController");
const route = express.Router();

//Homepage routes
route.get("/", homeController.homepage);
route.post("/", homeController.postForm);

module.exports = route;
