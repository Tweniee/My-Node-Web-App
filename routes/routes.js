const express = require("express");

const userController = require("../controllers/registration")

const route = express.Router();

route.post("/add",(userController.addUser));

module.exports = route;