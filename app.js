const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
require("dotenv").config();
const cookieSession = require("cookie-session");
const passport = require("passport");
const passportConfig = require("./middlewares/passport");



const app = express();

//middleware
app.use(morgan("tiny"));
app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(
  cookieSession({
    maxAge: 3*24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY],
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.json({
    message: "🦄🌈✨👋🌎🌍🌏✨🌈🦄",
  });
});
const auth = require("./middlewares/auth");
const user = require("./routes/user");
const event = require("./routes/event");
app.use("/api/v1",user)
app.use("/auth",auth)
app.use("/api/v1",event)

module.exports = app;
