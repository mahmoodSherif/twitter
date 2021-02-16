const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require('passport-jwt');

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const db = require('./db');

passport.use(new LocalStrategy(
  async (username, password, done) => {
    const query = `SELECT users.* FROM users INNER JOIN usersCredential ON users.id = usersCredential.id 
            WHERE users.username = '${username}' AND usersCredential.password = '${password}'`;
    let retUser;
    try {
      [retUser] = (await db.query(query)).rows;
    } catch (err) {
      return done(err);
    }
    if (retUser?.id) {
      return done(null, retUser);
    }
    return done(null, false, { message: 'wrong credentials' });
  },
));

passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT,
}, async (jwtPayload, done) => {
  const query = `SELECT * FROM users WHERE id = '${jwtPayload.id}'`;
  try {
    const [user] = (await db.query(query)).rows;
    return done(null, user);
  } catch (err) {
    done(err);
  }
  return done(null, false);
}));
