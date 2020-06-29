const express = require("express");
const cors = require("cors");
const pool = require("./db");
const bodyParser = require("body-parser")
const passport = require("passport");
const app = express();

const users = require("./routes/api/users.js");
const blog = require("./routes/api/blog.js");
const upload = require("./routes/api/upload.js");
const projects = require("./routes/api/projects.js");
const keys = require("./config/keys.js");

const port = 5000;

var whitelist = ['https://eriklangille.com', keys.localIP, "http://localhost:3000/"]
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (whitelist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false } // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
}

app.use(cors(corsOptionsDelegate));
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
app.use("/api/upload", upload);
app.use("/api/projects", projects);

// Directories
app.use("/images", express.static(__dirname + '/images'));

// Start server listening on port 5000
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});