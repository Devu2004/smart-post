const userModel = require('../models/user.model')
const jwt = require("jsonwebtoken")
const bcrypt = require('bcryptjs')
const postModel = require('../models/post.model')

async function createPostController(req,res){
    const file = req.file
}

module.exports = {
    createPostController
}