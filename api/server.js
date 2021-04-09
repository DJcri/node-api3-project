const express = require("express");
const cors = require("cors");
const { logger } = require("./middleware/middleware");
const usersRouter = require("./users/users-router");

const server = express();
server.use(express.json());
server.use(logger);
server.use(cors());
// remember express by default cannot parse JSON in request bodies

// global middlewares and the user's router need to be connected here

server.use("/api/users", usersRouter);

server.use("/api/", (_, res) => {
  res.json({ data: "API is accounted for" });
});

module.exports = server;
