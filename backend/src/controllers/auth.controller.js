const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")
const bcrypt = require('bcryptjs')

async function registerController(req,res){
    const {username, password} = req.body
    const existingUser = await userModel.findOne({username})
    if(existingUser){
        return res.status(400).json({message:"Username already exists"})
    }     
    const user = await userModel.create({username,password: await bcrypt.hashSync(password,10)})
    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)
    res.cookie('token',token)
    return res.status(201).json({message:"User Registered Successfully", user})
}
async function loginController(req,res){
    const {username, password} = req.body

    const user = await userModel.findOne({username})
    if(!user){
        return res.status(400).json({message:"Invalid Usernam"})
    }
    const isPasswordValid = await bcrypt.compare(password,user.password)
    if(!isPasswordValid){
        return res.status(400).json({message:"Invalid Password"})
    }

    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)

    res.cookie("token",token)

    res.status(200).json({
        message:'user loged in Successfully!',
        user
    })
}
module.exports = {
    registerController,
    loginController
}