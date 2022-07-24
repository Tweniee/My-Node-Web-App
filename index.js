const express = require('express')
const dbConnection =  require("./utils/dbConnect")
const cors = require('cors')
const routes = require('./routes/routes')
const bodyParser = require('body-parser')
const app = express()
const registerController = require("./controllers/registration")
// db.execute("")
app.use(cors())

// app.get("/add",registerController.addUser)

// create application/json parser
var jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use('/',jsonParser,routes)
dbConnection.sync()
.then(res=>{
    console.log("db Connected")
    app.listen(3000, () => console.log('Example app listening on port 3000!'))
}).catch(err=>{
    console.log(err)
})
