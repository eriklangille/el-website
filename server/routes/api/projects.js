const express = require("express");
const router = express.Router();
const pool = require("../../db.js");
const passport = require("passport");

const validateNewProjectInput = require("../../validation/newproject.js");

// @route POST api/blog/newpost
// @desc Create a new post if id is not supplied, or modify an existing post.
// @access Private, admin
router.post("/modify", async(req, res, next) => {
  passport.authenticate('jwt', {session: false}, async(err, user, info) => {
    if (err) {return next(err); }
    if(!user || !user.admin_user) {
      return res.status(401).json({user: "User not authorized."})
    }
    
    const { errors, isValid } = validateNewProjectInput(req.body);

    //Check the validation
    if(!isValid) {
      return res.status(400).json(errors);
    }

    const Title = req.body.Title;
    const ShortDescription = req.body.ShortDescription;
    const ButtonText = req.body.ButtonText;
    const ButtonLink = req.body.ButtonLink;
    const Projectid = req.body.Projectid;
    const StartDate = req.body.StartDateStr;
    const FinishDate = req.body.FinishDateStr;
    const ImageUUID = req.body.ImageUUID === "" || req.body.ImageUUID === undefined ? null : req.body.ImageUUID;

    if(!Projectid || Projectid === '0') {
      try {
        const projects = await pool.query("insert into projects (created_date, modified_date, start_date, finish_date, title, image, description, button_text, button_link, published) values(current_timestamp, current_timestamp, $1, $2, $3, $4, $5, $6, $7, false) returning *", [StartDate, FinishDate, Title, ImageUUID, ShortDescription, ButtonText, ButtonLink]);
        return res.json(projects.rows[0]);
      } catch (err) {
        console.error(err);
        return res.status(400).json(err.message);
      }
    } else {
      try {
          let projects = null;
        if(ImageUUID === null) {
          projects = await pool.query("update projects set title = $1, start_date = $2, finish_date = $3, description = $4, button_text = $5, button_link = $6, modified_date = current_timestamp where project_id = $7 returning *", [Title, StartDate, FinishDate, ShortDescription, ButtonText, ButtonLink, Projectid]);
        } else {
          projects = await pool.query("update projects set title = $1, start_date = $2, finish_date = $3, description = $4, button_text = $5, button_link = $6, image = $7, modified_date = current_timestamp where project_id = $8 returning *", [Title, StartDate, FinishDate, ShortDescription, ButtonText, ButtonLink, ImageUUID, Projectid]);
        }
        return res.json(projects.rows[0]);
      } catch (err) {
        console.error(err);
        return res.status(400).json(err.message);
      }
    }

  })(req, res, next);
});

// @route GET api/projects/
// @desc Get all projects that are published, if admin then even show ones not published.
// @access Public
router.get("/", async(req, res, next) => {
  passport.authenticate('jwt', {session: false}, async(err, user, info) => {
    if (err) {return next(err); }
    if (!user || !user.admin_user) {
      try {
        // const allBlogs = await pool.query("select * from blog where published = true");
        const allProjects = await pool.query("select projects.*, image_list.image_ext from projects left join image_list on projects.image = image_list.image_id where published = true order by start_date desc"); // temporary while adjusting to Next.js
        return res.json(allProjects.rows);
      } catch (err) {
        console.error(err.message);
        return res.json(err.message);
      }
    }
    try {
      const allProjects = await pool.query("select projects.*, image_list.image_ext from projects left join image_list on projects.image = image_list.image_id order by start_date desc");
      return res.json(allProjects.rows);
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
    const allProjects = await pool.query("select projects.*, image_list.image_ext from projects left join image_list on projects.image = image_list.image_id where published = true order by start_date desc limit 1"); // temporary while adjusting to Next.js
    return res.json(allProjects.rows);
  } catch (err) {
    console.error(err.message);
    return res.json(err.message);
  }
});

// @route GET api/projects/:id
// @desc Get a specific project
// @access Public
router.get("/:id", async(req, res, next) => {
  passport.authenticate('jwt', {session: false}, async(err, user, info) => {
    if (err) {return next(err); }
    if (!user || !user.admin_user) {
      try {
        const { id } = req.params;
        const allProjects = await pool.query("select projects.*, image_list.image_ext from projects left join image_list on projects.image = image_list.image_id where published = true and project_id = $1 order by project_id", [id]); // temporary while adjusting to Next.js
        return res.json(allProjects.rows[0]);
      } catch (err) {
        console.error(err.message);
        return res.json(err.message);
      }
    }
    try {
      const { id } = req.params;
      const allProjects = await pool.query("select projects.*, image_list.image_ext from projects left join image_list on projects.image = image_list.image_id where project_id = $1", [id]);
      return res.json(allProjects.rows[0]);
    } catch (err) {
      console.error(err.message);
      return res.json(err.message);
    }
  })(req, res, next);
});

// @route PUSH api/projects/publish/:id
// @desc Publish a project.
// @access Private, admin
router.post("/publish/:id", async(req, res, next) => {
  passport.authenticate('jwt', {session: false}, async(err, user, info) => {
    if (err) {return next(err); }
    if (!user || !user.admin_user) {
      return res.status(401).json({user: "User not authorized."})
    }
    try {
      const { id } = req.params;
      const Project = await pool.query("update projects set published = true where project_id = $1 returning *", [id]);
      return res.json(Project.rows[0]);
    } catch (err) {
      console.error(err);
      return res.json(err.message)
    }
  })(req, res, next);
});

// @route PUSH api/projects/unpublish/:id
// @desc Unpublish a project
// @access Private, admin
router.post("/unpublish/:id", async(req, res, next) => {
  passport.authenticate('jwt', {session: false}, async(err, user, info) => {
    if (err) {return next(err); }
    if (!user || !user.admin_user) {
      return res.status(401).json({user: "User not authorized."})
    }
    try {
      const { id } = req.params;
      const Project = await pool.query("update projects set published = false where project_id = $1 returning *", [id]);
      return res.json(Project.rows[0]);
    } catch (err) {
      console.error(err);
      return res.json(err.message)
    }
  })(req, res, next);
});

//Export the routes to be used. DONT FORGET THIS FOR NEW ROUTES!
module.exports = router;