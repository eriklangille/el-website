const express = require("express");
const cors = require("cors");
const pool = require("./db");
const bodyParser = require("body-parser")
const passport = require("passport");
const app = express();

const users = require("./routes/api/users.js");

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
app.use(passport.initialize());// Passport config
require("./config/passport")(passport);// Routes
app.use("/api/users", users);

// --- Routing ---

function getSecondPart(str) {
  return str.split('.')[1];
}

// Get all Blog Posts
app.get("/blog", async(req, res) => {
  try {
    const allBlogs = await pool.query("select * from blog");
    res.json(allBlogs.rows);
  } catch (err) {
    console.error(err.message);
    res.json(err.message);
  }
});

// Get a specific Blog post
app.get("/blog/:id", async(req, res) => {
  try {
    const { id } = req.params;
    const blogId = getSecondPart(id);
    const blogPost = await pool.query("select * from blog where blog_id = $1", [blogId]);
    res.json(blogPost.rows[0]);
  } catch (err) {
    console.error(err);
  }
});

// Start server listening on port 5000
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});