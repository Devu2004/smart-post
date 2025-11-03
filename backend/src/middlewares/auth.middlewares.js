const userModel = require('../models/user.model')
const jwt = require("jsonwebtoken")
const bcrypt = require('bcryptjs')

async function authMiddlwares(req,res){
    const token = req.cookies.token

    if(!token){
        return res.status(401).json({
            message: 'Unauthorized Access!'
        })
    }
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        const user = await userModel.findOne({
            _id : decoded.id
        })
        req.user = user
    }
    catch(err){
        return res.status(401).json({
            message:"Invailid token!"
        })
    }
}

module.exports = {
    authMiddlwares
}
