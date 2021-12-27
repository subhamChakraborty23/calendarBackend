const isLoggedIn = (req, res, next) => {
  
  if (req.user) {
    next();
  } else {
    res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }
};

module.exports = isLoggedIn;
