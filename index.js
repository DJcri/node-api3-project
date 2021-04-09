// require your server and launch it
const express = require("express");
const dotenv = require("dotenv").config();
const server = require("./api/server");
const port = process.env.PORT || 9000;
const path = require("path");
const cors = require("cors");

server.use(cors());
server.use(express.static(path.join(__dirname, "client/build")));

server.use("/api/", (_, res) => {
  res.json({ data: "API is accounted for" });
});

server.listen(port, () => {
  console.log(`listening on port ${port}`);
});
