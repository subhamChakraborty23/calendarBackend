const router = require('express').Router();
const passport = require('passport');

const CLIENT_URL = process.env.CLIENT_URL;

router.get("/login/success", (req, res) => {
  if (req.user) {
      // console.log(req.user);
    res.status(200).json({
      success: true,
      message: "successfull",
      user: req.user,
      //   cookies: req.cookies
    }).redirect(CLIENT_URL)
    
  }
});

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});

router.get("/logout", async(req, res) => {
  await req.logout()
  req.session = null
  req.sessionOptions.maxAge = 0
  return res.status(200).json({
    success: true,
    message: "logout successfull"
  })
});

router.get("/google", passport.authenticate("google", { scope: ["profile","email"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

module.exports = router;