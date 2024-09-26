const express = require("express");
const Users = require("./users-model");
const {
  validateUserId,
  validateUser,
  validatePost,
} = require("../middleware/middleware");

// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required

const router = express.Router();

router.get("/", async (req, res) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  try {
    const users = await Users.get();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id", validateUserId, async (req, res) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  try {
    const user = await req.user;
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", validateUser, async (req, res) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  try {
    const user = await Users.insert(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put("/:id", validateUserId, validateUser, async (req, res) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  try {
    const { id } = req.params;
    const updates = await Users.update(id, await req.user);
    res.status(200).json(updates);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete("/:id", validateUserId, async (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  try {
    const { id } = req.params;
    const user = await Users.remove(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id/posts", validateUserId, async (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  try {
    const { id } = req.params;
    const posts = await Users.getUserPosts(id);
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/:id/posts", validateUserId, validatePost, async (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  try {
    const { id } = req.params;
    const posts = await Users.getUserPosts(id);
    posts.unshift(req.body);
    res.status(201).json(req.body);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// do not forget to export the router
module.exports = router;
