const express = require("express");
const router = express.Router();
const pool = require("../../db.js");
const passport = require("passport");
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

const validateUploadInput = require("../../validation/upload.js");

const fileExt = (mimetype) => {
  if(mimetype === 'image/jpeg') {
    return '.jpg'
  } else {
    return '.' + mimetype.replace('image/','');
  }
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './images/');
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4() + fileExt(file.mimetype));
  }
});

const fileFilter = (req, file, cb) => {
  if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    // Reject the file from being stored
    cb(null, false);
  }
}

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5 //5 MB.
  },
  fileFilter: fileFilter
});

router.post('/', (req, res, next) => {
  passport.authenticate('jwt', {session: false}, async(err, user, info) => {
    if (err) {return next(err); }
    if(!user || !user.admin_user) {
      return res.status(401).json({user: "User not authorized."})
    }

    console.log("Uploading image!!")

    // res.status(200).json({'Authorized': true});
    next();

  })(req, res, next);
}, upload.single('photo'), async(req, res, next) => {
  //req.file is the file.
  const { errors, isValid } = validateUploadInput(req.body);

  // Check the validation
  if(!isValid) {
    return res.status(400).json(errors);
  }

  const ImageId = req.file.filename.replace(/\..*/,'');
  const ExtType = req.file.filename.match(/\..*/i)[0].substr(1);
  const TypeId = req.body.type;

  // reg.file.filename.match(/\..*/)[0]

  try {
    const fileLog = await pool.query("insert into image_list (image_id, image_ext, image_type) values($1, $2, $3) returning *", [ImageId, ExtType, TypeId]);
    return res.json(fileLog.rows[0]);
  } catch (err) {
    console.error(err);
    return res.status(400).json(err.message);
  }

});

//Export the routes to be used. DONT FORGET THIS FOR NEW ROUTES!
module.exports = router;