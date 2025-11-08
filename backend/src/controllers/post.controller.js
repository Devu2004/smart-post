const userModel = require('../models/user.model')
const jwt = require("jsonwebtoken")
const bcrypt = require('bcryptjs')
const postModel = require('../models/post.model')
const uploadFile = require('../services/storage.service');
const generateCaption = require("../services/ai.service");
const {v4:uuidv4} = require('uuid')

async function createPostController(req, res) {
  try {
    console.log("📸 Route hit - Creating Post");
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "No image uploaded" });
    }

    const base64Image = file.buffer.toString("base64");
    const caption = await generateCaption(base64Image);
    const result = await uploadFile(file.buffer , `${uuidv4()}`)
    const post = await postModel.create({
      caption:caption,
      image:result.url,
      user:req.user._id
    })

    res.status(200).json({message:'post created Succefully',
      post
    });
  } catch (err) {
    console.error("❌ Post Controller Error:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
}

module.exports = { createPostController };
