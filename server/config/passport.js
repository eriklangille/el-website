const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const pool = require("../db.js");
const keys = require("../config/keys.js");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, async(jwt_payload, done) => {
      try {
        const user = await pool.query("select * from users where user_id = $1", [jwt_payload.id]).rows[0];
        if(user) {
          return done(null, user);
        }
        return done(null, false);
      } catch (err) {
        console.error(err);
      }
    })
  );
};