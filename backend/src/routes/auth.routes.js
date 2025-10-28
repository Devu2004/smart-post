const express = require('express')
const userModel = require('../models/user.model')
const router = express.Router()

router.post('/register' ,async (req,res)=>{
    const {username,password} = req.body
    const existingUser = await userModel.findOne({username})
    if(!existingUser){
        return res.status(409).json({
            message:'User Already exist'
        })
    }
    const user = await userModel.create({
        username,password
    })
    console.log(user);
    
    res.status(201).json({
        message:'User created Successfully!',
        user
    })
})

module.exports = router