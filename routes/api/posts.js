const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
const User = require("../../models/User");
const Profile = require("../../models/Profile");
const Post = require("../../models/Post");

// @route   POST api/posts
// @desc    Add post
// @access  Private

router.post(
  "/",
  [[check("text", "Text is required").not().isEmpty()], auth],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");

      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      });

      const post = await newPost.save();

      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

// @route   GET api/posts
// @desc    Get all posts
// @access  Private

router.get("/", auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });

    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/posts/:post_id
// @desc    Get post by id
// @access  Private

router.get("/:post_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);

    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    res.json(post);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route   DELETE api/posts/:post_id
// @desc    Delete a post
// @access  Private

router.delete("/:post_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);

    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    // Check user

    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    await post.remove();

    res.json({ msg: "Post removed" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route   PUT api/posts/like/:post_id
// @desc    Like a post
// @access  Private

router.put("/like/:post_id", auth, async (req, res) => {
  const post = await Post.findById(req.params.post_id);

  if (!post) {
    return res.status(404).json({ msg: "Post not found" });
  }

  // Check if the post has already been liked by user
  if (
    post.likes.filter((like) => like.user.toString() === req.user.id).length > 0
  ) {
    return res.status(400).json({ msg: "Post already liked" });
  }

  post.likes.unshift({ user: req.user.id });

  await post.save();

  res.json(post.likes);
  try {
  } catch (err) {
    console.error(err.message);
  }
});

// @route   PUT api/posts/unlike/:post_id
// @desc    Unlike a post
// @access  Private

router.put("/unlike/:post_id", auth, async (req, res) => {
  const post = await Post.findById(req.params.post_id);

  if (!post) {
    return res.status(404).json({ msg: "Post not found" });
  }

  // Check if the post has already been liked by user
  if (
    post.likes.filter((like) => like.user.toString() === req.user.id).length ===
    0
  ) {
    return res.status(400).json({ msg: "Post has not yet been liked" });
  }

  post.likes = post.likes.filter(
    (like) => like.user.toString() !== req.user.id
  );

  await post.save();

  res.json(post.likes);
  try {
  } catch (err) {
    console.error(err.message);
  }
});

// @route   POST api/posts/comment/:post_id
// @desc    Comment on a post
// @access  Private

router.post(
  "/comment/:post_id",
  [[check("text", "Text is required").not().isEmpty()], auth],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");
      const post = await Post.findById(req.params.post_id);

      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      };

      post.comments.unshift(newComment);

      await post.save();

      res.json(post.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

// @route   DELETE api/posts/comment/:post_id/:comm_id
// @desc    Delete a comment
// @access  Private

router.delete("/comment/:post_id/:comm_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);

    // Pull out comment
    const comment = post.comments.find(
      (comment) => comment.id === req.params.comm_id
    );

    //Make sure comment exists
    if (!comment) {
      return res.status(404).json({ msg: "Comment not found" });
    }

    // Check user
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    post.comments = post.comments.filter(
      (comment) => comment.id !== req.params.comm_id
    );

    await post.save();
    res.json(post.comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
