module.exports = (sequelize, DataTypes) =>{
    const Genre = sequelize.define("Genre",{
        genre:{
            type:DataTypes.STRING,
            allowNull:false
        }
    },{
        freezeTableName: true,
    })

    return Genre
}