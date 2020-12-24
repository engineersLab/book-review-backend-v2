const express = require('express')
const router =  express.Router()
const logger = require('../../config/logger')

const {User} = require('../../models')

router.post('/signup', async (req, res)=>{
    try{
        const {name,email,password} = req.body
        await User.create({
            email,
            password,
            name
        }).catch(err=>{
            logger.error(err.errors[0].message)
            res.send(err.errors[0].message)
            return
        })
        res.send({username:name,email})
        
    }catch(err){
        logger.error(err.message)
    }
})

router.post('/signin', async(req, res)=>{
    try{
        const {email, password} = req.body
        const user = await User.findOne({where:{email: email}})
        if(!user){
            return res.send("No user")
        }
        const check = await user.validPassword(password,user.password)
        if(!check){
            return res.send("Password wrong")
        }
        res.send({username:user.name,email:user.email,user_type:user.user_type})
    }catch(err){
        logger.error(err.message)
        res.send({error: "Invalid password or email"})
    }
})


module.exports = router