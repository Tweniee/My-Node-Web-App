const dbconnect = require("../utils/dbConnect")
const jwt = require("jsonwebtoken")
const sequalizeModel = require("../models/register");

exports.addUser = (req, res)=>{
    const data = new sequalizeModel(req.body)
     data.save().then(user=>{
        let response = {
            data: 'Success'
            }
    res.status(200).json(response);
     }).catch(err=>{
    res.status(400).json(err);
     });         
}

exports.findOne = (req,res)=>{
    // console.log(">>",req)
    let userEmail = req.body.email;
    let userPassword = req.body.password;
    sequalizeModel.findOne({
        where:{
            email: userEmail
        }
    }).then(result=>{
        let user = result.id
        const token = jwt.sign({user},"my_secret_key")
        let response = {}
        if(userEmail == result.email){
            if(result.password == userPassword){
                response  = {
                    data : "Success",
                    token : token
                }
            }else{
                response  = {
                    data : "Wrong Password",
                    token : token
                }
            }            
        }else{
            response  = {
                data : "Email does not exists",
                token : token
            }
        }    
        res.status(200).json(response); 
    }).catch(err=>{
        let response = {
            data: err
        }
        res.status(200).json(response); 
    })
}

exports.getAll = (req,res)=>{
    jwt.verify(req.token, 'my_secret_key', function(err,data){
        if(err){
            res.sendStatus(403);
        }else{
            res.json({
                Message : "Success",
                data: data
            })
        }
    })
}
