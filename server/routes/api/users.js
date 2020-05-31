const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require('uuid');
const pool = require("../../db.js");
const keys = require("../../config/keys.js");

//Input Validation
const validateRegisterInput = require("../../validation/register.js");
const validateLoginInput = require("../../validation/login.js");

//User model (not using)
// const User = require("../../models/User");

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", async(req, res) => {
  //Form Validation

  const {errors, isValid} = validateRegisterInput(req.body);

  if(!isValid) {
    return res.status(400).json(errors);
  }

  const emailExist = await pool.query("select count(*) from users where email = $1", [req.body.email]);

  if(emailExist > 1) {
    return res.status(400).json({ email: "Email already exists"});
  } else {
    let {name, email, password} = req.body;
    

    //Hash password
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, async(err, hash) => {
        if (err) throw err;
        password = hash;
        try {
          
          const user = await pool.query("insert into users (user_id, name, email, password, created_date, admin_user) values($1, $2, $3, $4, current_timestamp, false) returning *", [uuidv4(), name, email, password]);
          res.json(user.rows[0]);
        } catch (err) {
          console.error(err);
        }
      });
    });
  }
});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", async(req, res) => {

  const { errors, isValid } = validateLoginInput(req.body);

  //Check the validation
  if(!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  

  // Find user by email.
  try {
    const query = await pool.query("select * from users where email = $1", [email]);
    const user = query.rows[0];
    if (query.rows.length < 1) {
      return res.status(404).json({ emailNotFound: "Email not found"});
    }

    //Check Password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        //User matched, create JWT payload.
        const payload = {
          id: user.user_id,
          name: user.name
        };

        //Sign token
        jwt.sign(payload, keys.secretOrKey, {expiresIn: 31556926}, (err, token) => {
          res.json({
            success: true,
            token: "Bearer "+ token
          });
        });
      } else {
        return res.status(400).json({ passwordIncorrect: "Password Incorrect"});
      }
    }).catch(err => {
      console.error(err);
    });



  } catch (err) {
    console.error(err);
  }

  
});

module.exports = router;