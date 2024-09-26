const Users = require("../users/users-model");

function logger(req, res, next) {
  // DO YOUR MAGIC
  console.log(req.method, req.url);
  next();
}

function validateUserId(req, res, next) {
  // DO YOUR MAGIC
  const { id } = req.params;
  const user = Users.getById(id);
  if (!user) {
    res.status(404).json({ message: "user not found" });
  } else {
    req.user = user;
    next();
  }
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
  const { name } = req.body;
  if (!name) {
    res.status(400).json({ message: "missing required name field" });
  } else {
    next();
  }
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
  const { text } = req.body;
  if (!text) {
    res.status(400).json({ message: "missing required text field" });
  } else {
    next();
  }
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost,
};
