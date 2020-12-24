module.exports = (sequelize, DataTypes) =>{
    const Author = sequelize.define("Author",{
        author_name:{
            type:DataTypes.STRING,
            allowNull:false
        }
    },{
        freezeTableName: true,
    })

    return Author
}