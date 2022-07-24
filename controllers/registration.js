const dbconnect = require("../utils/dbConnect")
const sequalizeModel = require("../models/register");

exports.addUser = (req, res)=>{
    console.log(req.body)
    // const data = new sequalizeModel({
    //     name: 'Deepask',
    //     email: 'rem@matuxppal.sx',
    //     gender: 'male',
    //     password: 'test12s3'
    // })
    const data = new sequalizeModel(req.body)
     data.save().then(user=>{
        console.log("User Add SuccessFully",user.dataValues)
        let response = {
            data: 'Success'
    }
    res.status(200).json(response);
     }).catch(err=>{
         console.log("Error in Add User> ",err)
         let response = {
            data: 'Error'
    }
    res.status(400).json(response);
     }); 
        
}
