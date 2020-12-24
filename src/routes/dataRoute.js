const express = require('express')
const router =  express.Router()
const logger = require('../../config/logger')
const {Book, Genre} = require('../../models')

router.post('/getBooks',  (req,res) =>{
    try{
        Book.findAll({
            order:[['id','DESC']],
        }).then(result=>{
            res.send({result})
        }).catch(err=>{
            logger.error(err.message)
            res.send("Error fetching books",err.message)
        })
    }catch(err){
        logger.error(err.message)
        res.status(422).send({"Error":err.message})
    }
})

router.get('/getGenres', (req, res)=>{
    try{
        Book.findAll({
            attributes:['id','genre','book_name','image_url'],
            order:[['genre']],
            group:['genre']
        }).then(result =>{
            res.send({result})
        }).catch(err=>{
            logger.error(err.message)
            res.send("Error fetching genres",err.message)
        })
    }catch(err){
        logger.error(err.message)
        res.send({"Error":err.message})
    }
})

router.get('/getAuthors', (req, res)=>{
    try{
        Book.findAll({
            attributes:['id','author','book_name','image_url'],
            order:[['author']],
            group:['author']
        }).then(result =>{
            res.send({result})
        }).catch(err=>{
            logger.error(err.message)
            res.send("Error fetching authors",err.message)
        }) 
    }catch(err){
        logger.error(err.message)
        res.send({"Error":err.message})
    }
})

router.get('/getAllGenres', (req, res)=>{
    try{
        Genre.findAll({
            attributes:['id','genre']
        }).then(result =>{
            res.send({result})
        }).catch(err=>{
            logger.error(err.message)
            res.send("Error fetching genres",err.message)
        }) 
    }catch(err){
        logger.error(err.message)
        res.send({"Error":err.message})
    }
})

router.post('/postBook', async (req, res) =>{
    try{
        const {book_name,author,genre,description,review,image_url} = req.body
        await Book.create({
            book_name,
            author,
            genre,
            description,
            review,
            image_url
        }).catch(err=>{
            logger.error(err.message)
            res.send("Error creating book",err.message)
        })  
    }catch(err){
        logger.error(err)
        res.send({"Error":err.message})
    }
})

router.post('/getComments', async(req, res)=>{
    try{
        const {id} = req.body
        Book.findOne({where:{id:id}})
        .then(values=>{
            if(values.comments != null){
                res.send({result:values.comments})
            }else{
                res.send({result:"No comments yet"})
            }
        }).catch(err =>{
            res.send({Error:err.message})
        })
    }catch(err){
        logger.error(err.message)
    }
})

router.post('/postComment', async(req, res)=>{
    try{
        const {id, email, username, comment} = req.body
        await Book.findOne({where:{id:id}})
            .then(book =>{
                console.log(book.dataValues.comments)
                var comments = book.dataValues.comments
                if(comments == null){
                    comments = []
                    comments = JSON.stringify(comments)
                }
                comments = JSON.parse(comments)
                comments.push({email,username,comment})
                let values = {
                    comments : JSON.stringify(comments)
                }
                book.update(values)
                res.send({result:comments})
            })
            .catch(err =>{
                logger.error(err.message)
                res.send({Error:err.message})
            })        
    }catch(err){
        logger.error(err.message)
    }
})

module.exports = router