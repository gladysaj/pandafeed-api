const { Router } = require("express");
const router = Router();

const Post = require('../models/Post');
const { veryToken } = require("../utils/auth");

// Create your post if you have a user
router.post("/create-post", veryToken, async (req, res) => {
  const { _id: userId } = req.user;
  const data = { ...req.body, user: userId };

  try {
    const post = await Post.create(data);
    res.status(200).json(post);
  } catch(error) {
    res.status(400).json(error);
  }
});

module.exports = router;