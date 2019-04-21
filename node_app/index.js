const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");

const mongoose = require("mongoose");

const passport = require("passport");

const users = require("./routes/api/users");
const posts = require("./routes/api/posts");
const profiles = require("./routes/api/profiles");
const multer = require("multer");

const app = express();

//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

const db = require("./config/Key").mongoURI;

mongoose
  .connect(db)
  .then(() => console.log("connected to db"))
  .catch(err => console.log(err));

app.use(passport.initialize());

require("./config/passport")(passport);

app.use("/api/users", users);
app.use("/api/posts", posts);
app.use("/api/profile", profiles);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Running on port: ${port}`);
});
