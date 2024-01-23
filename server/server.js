const express = require("express");
const app = express();
const connectDB = require("./config/connect");
require("dotenv").config();
const port = process.env.PORT;
const cors = require("cors");

const articleRoute = require("./routes/articleRoute");
app.use(cors());
app.use(express.json());

app.use("/articles", articleRoute);
app.use("/getImage", express.static("./upload"));

app.listen(port, () => {
  console.log("Server is active *_*");
});
