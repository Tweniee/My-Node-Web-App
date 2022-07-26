const express = require("express");
const jwt = require('jsonwebtoken')
const userController = require("../controllers/registration")

const route = express.Router();

route.post("/add",(userController.addUser));
route.post("/login",(userController.findOne));
route.get("/getAll",ensureToken,(userController.getAll));


function ensureToken (req,res,next){
    const bearerHeader = req.headers["authorization"];
    if(typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    }else{
        res.sendStatus(403)
    }
}
module.exports = route;