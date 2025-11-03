const express = require('express');
const { createPostController } = require('../controllers/post.controller');
const { authMiddlwares } = require('../middlewares/auth.middlewares');
const multer = require('multer')

const upload = multer({storage:multer.memoryStorage()})
const router = express.Router();

router.post('/',authMiddlwares,upload.single('image'), createPostController)

module.exports = router