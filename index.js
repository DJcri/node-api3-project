// require your server and launch it
const dotenv = require("dotenv").config();
const server = require("./api/server");
const cors = require("cors");
const port = process.env.PORT || 9000;

server.use(cors());

server.use("/api/", (_, res) => {
  res.json({ data: "API is accounted for" });
});

server.listen(port, () => {
  console.log(`listening on port ${port}`);
});
