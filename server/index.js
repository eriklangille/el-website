const express = require("express");
const cors = require("cors");
const pool = require("./db");
const bodyParser = require("body-parser")
const passport = require("passport");
const app = express();

const users = require("./routes/api/users.js");
const blog = require("./routes/api/blog.js");

const port = 5000;

app.use(cors());
app.use(express.json());

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);

// Routes
app.use("/api/users", users);
app.use("/api/blog", blog);

// Start server listening on port 5000
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});