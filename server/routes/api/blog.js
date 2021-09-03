const express = require("express");
const router = express.Router();
const pool = require("../../db.js");
const passport = require("passport");

const validateNewPostInput = require("../../validation/newpost.js");

//Takes the id from after the '.' in the URL string.
function getSecondPart(str) {
  return str.split('.')[1];
}

// @route POST api/blog/newpost
// @desc Create a new post if id is not supplied, or modify an existing post.
// @access Private, admin
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
    const ImageUUID = req.body.ImageUUID === "" || req.body.ImageUUID === undefined ? null : req.body.ImageUUID;
    const Author = user.name;

    if(!URLid || URLid === '0') {
      try {
        const blog = await pool.query("insert into blog (title, post_url, short_desc, post, created_date, modified_date, author, published, image) values($1, $2, $3, $4, current_timestamp, current_timestamp, $5, false, $6) returning *", [Title, URL, ShortDescription, Post, Author, ImageUUID]);
        return res.json(blog.rows[0]);
      } catch (err) {
        console.error(err);
        return res.status(400).json(err.message);
      }
    } else {
      try {
          let blog = null;
        if(ImageUUID === null) {
          blog = await pool.query("update blog set title = $1, post_url = $2, short_desc = $3, post = $4, modified_date = current_timestamp where blog_id = $5 returning *", [Title, URL, ShortDescription, Post, URLid]);
        } else {
          blog = await pool.query("update blog set title = $1, post_url = $2, short_desc = $3, post = $4, image = $5, modified_date = current_timestamp where blog_id = $6 returning *", [Title, URL, ShortDescription, Post, ImageUUID, URLid]);
        }
        return res.json(blog.rows[0]);
      } catch (err) {
        console.error(err);
        return res.status(400).json(err.message);
      }
    }

  })(req, res, next);
});

// @route GET api/blog/posts
// @desc Get all blog posts that are published, if admin then even show ones not published.
// @access Public
router.get("/posts", async(req, res, next) => {
  passport.authenticate('jwt', {session: false}, async(err, user, info) => {
    if (err) {return next(err); }
    if (!user || !user.admin_user) {
      try {
        // const allBlogs = await pool.query("select * from blog where published = true");
        const allBlogs = await pool.query("select blog.*, image_list.image_ext from blog left join image_list on blog.image = image_list.image_id where published = true order by created_date desc"); // temporary while adjusting to Next.js
        return res.json(allBlogs.rows);
      } catch (err) {
        console.error(err.message);
        return res.json(err.message);
      }
    }
    try {
      const allBlogs = await pool.query("select blog.*, image_list.image_ext from blog left join image_list on blog.image = image_list.image_id");
      return res.json(allBlogs.rows);
    } catch (err) {
      console.error(err.message);
      return res.json(err.message);
    }
  })(req, res, next);
});

// @route GET api/projects/recent
// @desc Get the most recent project
// @access Public
router.get("/recent", async(req, res, next) => {
  if (err) {return next(err); }
  try {
    const allBlogs = await pool.query("select blog.*, image_list.image_ext from blog left join image_list on blog.image = image_list.image_id where published = true order by start_date desc limit 1"); // temporary while adjusting to Next.js
    return res.json(allBlogs.rows);
  } catch (err) {
    console.error(err.message);
    return res.json(err.message);
  }
});

// @route GET api/blog/post/:id
// @desc Get a specific blog post
// @access Public
router.get("/post/:id", async(req, res, next) => {
  passport.authenticate('jwt', {session: false}, async(err, user, info) => {
    if (err) {return next(err); }
    if (!user || !user.admin_user) {
      try {
        const { id } = req.params;
        const blogId = getSecondPart(id);
        const blogPost = await pool.query("select blog.*, image_list.image_ext from blog left join image_list on blog.image = image_list.image_id where blog_id = $1 and published = true", [blogId]); //Also modified temp
        return res.json(blogPost.rows[0]);
      } catch (err) {
        console.error(err);
        return res.json(err.message)
      }
    }
    try {
      const { id } = req.params;
      const blogId = getSecondPart(id);
      const blogPost = await pool.query("select blog.*, image_list.image_ext from blog left join image_list on blog.image = image_list.image_id where blog_id = $1", [blogId]);
      return res.json(blogPost.rows[0]);
    } catch (err) {
      console.error(err);
      return res.json(err.message)
    }
  })(req, res, next);
});

// @route PUSH api/blog/publish/:id
// @desc Publish a blog post
// @access Private, admin
router.post("/publish/:id", async(req, res, next) => {
  passport.authenticate('jwt', {session: false}, async(err, user, info) => {
    if (err) {return next(err); }
    if (!user || !user.admin_user) {
      return res.status(401).json({user: "User not authorized."})
    }
    try {
      const { id } = req.params;
      const blogId = getSecondPart(id);
      const blogPost = await pool.query("update blog set published = true where blog_id = $1 returning *", [blogId]);
      return res.json(blogPost.rows[0]);
    } catch (err) {
      console.error(err);
      return res.json(err.message)
    }
  })(req, res, next);
});

// @route PUSH api/blog/unpublish/:id
// @desc Unpublish a blog post
// @access Private, admin
router.post("/unpublish/:id", async(req, res, next) => {
  passport.authenticate('jwt', {session: false}, async(err, user, info) => {
    if (err) {return next(err); }
    if (!user || !user.admin_user) {
      return res.status(401).json({user: "User not authorized."})
    }
    try {
      const { id } = req.params;
      const blogId = getSecondPart(id);
      const blogPost = await pool.query("update blog set published = false where blog_id = $1 returning *", [blogId]);
      return res.json(blogPost.rows[0]);
    } catch (err) {
      console.error(err);
      return res.json(err.message)
    }
  })(req, res, next);
});


//Export the routes to be used. DONT FORGET THIS FOR NEW ROUTES!
module.exports = router;