const express = require("express");
const router = express.Router();
const pool = require("../../db.js");
const passport = require("passport");
const multer = require('multer');
const upload = multer();

const validateUploadInput = require("../../validation/upload.js");

router.post('/upload', upload.single('photo'), (req, res, next) => {
  passport.authenticate('jwt', {session: false}, async(err, user, info) => {
    if (err) {return next(err); }
    if(!user || !user.admin_user) {
      return res.status(401).json({user: "User not authorized."})
    }

    //req.file contains the image.

  })(req, res, next);
});

//Export the routes to be used. DONT FORGET THIS FOR NEW ROUTES!
module.exports = router;