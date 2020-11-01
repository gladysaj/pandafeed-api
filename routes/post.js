const { Router } = require("express");
const router = Router();

const Post = require('../models/Post');
const { veryToken } = require("../utils/auth");
const { findByIdAndUpdate } = require("../models/Post");

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

// Get board posts 
router.get("/get-posts/:boardId", async (req, res) => {
  const { boardId } = req.params;

   try {
    const posts = await Post.find({ board: boardId });
     res.status(200).json(posts);
   } catch(error) {
     res.status(400).json(error);
   }
})

// Upvote a post 
router.post("/upvote-post", veryToken, async (req, res) => {
  const { postId } = req.body;
  const { _id: userId } = req.user;

  try {
    const { user: ownerId } = await Post.findById(postId);

    if (String(ownerId) === String(userId)) {
      throw "You can't upvote your own post!"
    }

    const post = await Post.findByIdAndUpdate(
      postId,
    {
      $inc: { upvotes: 1 }
    });
    res.status(200).json(post);
  } catch (error) {
    res.status(400).json(error);
  }
})

module.exports = router;
