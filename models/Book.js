module.exports = (sequelize, DataTypes) =>{
    const Book = sequelize.define("Book",{
        book_name:{
            type:DataTypes.STRING,
            allowNull:false
        },
        author:{
            type:DataTypes.STRING,
            allowNull:false
        },
        genre:{
            type:DataTypes.STRING,
            allowNull:false
        },
        description:{
            type:DataTypes.TEXT,
            allowNull:false
        },
        review:{
            type:DataTypes.TEXT,
            allowNull:false
        },
        comments:{
            type:DataTypes.TEXT
        },
        image_url:{
            type:DataTypes.STRING,
            allowNull:false
        },
        
    },{
        freezeTableName: true,
    })

    return Book
}