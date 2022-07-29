const Sequelize = require('sequelize');
const utils = require("../utils/dbConnect");

const sequalize = utils.define("Users",{
    id:{
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true  
    },
    name: {
        type: Sequelize.STRING,
        require: true,
    },
    email:{
        type: Sequelize.STRING,
        allownull:false,
        unique:true,
        validate: {
            isEmail: {
              isEmail: true,
              msg: "Must be a valid email address",
            }
          }
    },
    password:{
        type: Sequelize.STRING,
        allownull:false
    },
    gender:{
        type: Sequelize.STRING,
        validate: {
            isIn:{
               args: [['male','female','other']],
               msg:'Please Male and Female'
            }
        }
    }
});

module.exports = sequalize;