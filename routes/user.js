const express = require("express");
const router = express.Router();
const User = require("../models/user");

const { getAllUsers, getUserById } = require("../controllers/userController");
const { isLoggedIn } = require("../middlewares/user");

router.get("/users", getAllUsers);
router.get("/users/:id", getUserById);

router.get("/user", async (req, res) => {
  try {
    if (req.user) {
        // console.log(req.user)
      const user = await User.findOne({
          where:{
              email:req.user.email
          }
      })
      // console.log(user)
      res.status(200).json({
        success: true,
        message: "successfull",
        user: user
        //   cookies: req.cookies
      });
    } else {
      res.status(401).json({
        success: false,
        message: "failure",
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

module.exports = router;
