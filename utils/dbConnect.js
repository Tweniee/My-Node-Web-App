const Sequelize = require("sequelize");

const seq = new Sequelize('my-web-app','root','abhi3006',{
    dialect: "mysql",
    host: 'localhost',
    logging:false,
})

seq.authenticate().then(res=>{
    console.log("Connected");
}).catch(err=>{
    console.log(err)
})
module.exports = seq;