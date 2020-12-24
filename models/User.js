// const logger = require('../config/logger')
const bcrypt = require('bcrypt')

module.exports = (sequelize, DataTypes) =>{
    const User = sequelize.define("User",{
        name:{
            type:DataTypes.STRING,
            allowNull:false
        },
        email:{
            type:DataTypes.STRING,
            allowNull:false,
            unique: true,        
        },
        password:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        user_type:{
            type:DataTypes.STRING,
            allowNull:false,
            defaultValue: "user"
        }
    },{
        freezeTableName: true,
        hooks:{
            beforeCreate: (user,options)=>{
                return bcrypt.hash(user.password, 10)
                    .then(hash => {
                        user.password = hash;
                    })
                    .catch(err => { 
                        console.log(err)
                        // logger.error(err) 
                    })                
            }
        }
    })
    User.prototype.validPassword = function(password,hash){
        return bcrypt.compare(password, hash);
    }
    return User
}