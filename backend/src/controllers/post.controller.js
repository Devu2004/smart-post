const userModel = require('../models/user.model')
const jwt = require("jsonwebtoken")
const bcrypt = require('bcryptjs')
const postModel = require('../models/post.model')
const genrateCaption = require('../services/ai.service')

const generateCaption = require("../services/ai.service");

async function createPostController(req, res) {
  try {
    console.log("📸 Route hit - Creating Post");
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "No image uploaded" });
    }

    const base64Image = file.buffer.toString("base64");
    const caption = await generateCaption(base64Image);

    res.status(200).json({ success: true, caption });
  } catch (err) {
    console.error("❌ Post Controller Error:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
}

module.exports = { createPostController };
