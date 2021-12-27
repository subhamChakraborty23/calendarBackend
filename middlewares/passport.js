const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const User = require("../models/user");

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

passport.serializeUser((user, done) => {
  return done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findOne({
    where: {
      id: id,
    },
  })
    .then((user) => {
      return done(null, user);
    })
    .catch((err) => {
      return done(err, null);
    });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      // console.log(profile);
      //create user in database
      User.findOne({
        where: {
          googleId: profile.id,
        },
      })
        .then((currentUser) => {
          if (currentUser) {
            console.log("user is: " + currentUser);
            done(null, currentUser);
          } else {
            new User({
              googleId: profile.id,
              name: profile.displayName,
              email: profile.emails[0].value,
            })
              .save()
              .then((newUser) => {
                console.log("new user created: " + newUser);
                done(null, newUser);
              });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  )
);
