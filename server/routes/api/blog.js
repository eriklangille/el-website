const express = require("express");
const router = express.Router();
const pool = require("../../db.js");
const passport = require("passport");

const validateNewPostInput = require("../../validation/newpost.js");

//Takes the id from after the '.' in the URL string.
function getSecondPart(str) {
  return str.split('.')[1];
}

router.post("/newpost", async(req, res, next) => {
  passport.authenticate('jwt', {session: false}, async(err, user, info) => {
    if (err) {return next(err); }
    if(!user || !user.admin_user) {
      return res.status(401).json({user: "User not authorized."})
    }
    
    const { errors, isValid } = validateNewPostInput(req.body);

    //Check the validation
    if(!isValid) {
      return res.status(400).json(errors);
    }

    const Title = req.body.Title;
    const URL = req.body.URL;
    const ShortDescription = req.body.ShortDescription;
    const Post = req.body.Post;
    const URLid = req.body.URLid
    const Author = user.name;

    if(!URLid || URLid === '0') {
      try {
        const blog = await pool.query("insert into blog (title, post_url, short_desc, post, created_date, modified_date, author, published) values($1, $2, $3, $4, current_timestamp, current_timestamp, $5, false) returning *", [Title, URL, ShortDescription, Post, Author]);
        return res.json(blog.rows[0]);
      } catch (err) {
        console.error(err);
        return res.status(400).json(err.message);
      }
    } else {
      try {
        const blog = await pool.query("update blog set title = $1, post_url = $2, short_desc = $3, post = $4, modified_date = current_timestamp where blog_id = $5 returning *", [Title, URL, ShortDescription, Post, URLid]);
        return res.json(blog.rows[0]);
      } catch (err) {
        console.error(err);
        return res.status(400).json(err.message);
      }
    }

  })(req, res, next);
});

// @route GET api/blog/postss
// @desc Get all blog posts that are published, if admin then even show ones not published.
// @access Public
router.get("/posts", async(req, res, next) => {
  passport.authenticate('jwt', {session: false}, async(err, user, info) => {
    if (err) {return next(err); }
    if (!user || !user.admin_user) {
      try {
        // const allBlogs = await pool.query("select * from blog where published = true");
        const allBlogs = await pool.query("select * from blog where published = true order by blog_id"); // temporary while adjusting to Next.js
        return res.json(allBlogs.rows);
      } catch (err) {
        console.error(err.message);
        return res.json(err.message);
      }
    }
    try {
      const allBlogs = await pool.query("select * from blog");
      return res.json(allBlogs.rows);
    } catch (err) {
      console.error(err.message);
      return res.json(err.message);
    }
  })(req, res, next);
});



// @route GET api/blog/:id
// @desc Get a specific blog post
// @access Public
router.get("/post/:id", async(req, res, next) => {
  passport.authenticate('jwt', {session: false}, async(err, user, info) => {
    if (err) {return next(err); }
    if (!user || !user.admin_user) {
      try {
        const { id } = req.params;
        const blogId = getSecondPart(id);
        const blogPost = await pool.query("select * from blog where blog_id = $1 and published = true", [blogId]); //Also modified temp
        return res.json(blogPost.rows[0]);
      } catch (err) {
        console.error(err);
        return res.json(err.message)
      }
    }
    try {
      const { id } = req.params;
      const blogId = getSecondPart(id);
      const blogPost = await pool.query("select * from blog where blog_id = $1", [blogId]);
      return res.json(blogPost.rows[0]);
    } catch (err) {
      console.error(err);
      return res.json(err.message)
    }
  })(req, res, next);
});



//Export the routes to be used. DONT FORGET THIS FOR NEW ROUTES!
module.exports = router;