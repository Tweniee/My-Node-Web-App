const dbconnect = require("../utils/dbConnect")
const jwt = require("jsonwebtoken")
const sequalizeModel = require("../models/models");
const bcrypt = require('bcrypt');

const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';
exports.addUser = (req, res)=>{
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(req.body.password, salt);
    let json = {
        name : req.body.name,
        password : hash,
        email : req.body.email,
        gender: req.body.gender
    }
    console.log(json)
    const data = new sequalizeModel(json)
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
    let userEmail = req.body.email;
    let userPassword = req.body.password;x
    sequalizeModel.findOne({
        where:{
            email: userEmail
        }
    }).then(result=>{
        let user = result.id
        const token = ''
        let response = {}
        if(userEmail == result.email){
            if(bcrypt.compareSync(userPassword, result.password)){
                response  = {
                    data : "Success",
                    token :  jwt.sign({user},"heyTweniee")
                }
            }else{
                response  = {
                    data : "Wrong Password",
                }
            }            
        }else{
            response  = {
                data : "Email does not exists"
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
    jwt.verify(req.token, 'heyTweniee', function(err,data){
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
