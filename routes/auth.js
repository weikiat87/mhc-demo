const express = require("express");
const passport = require("passport");
const router = express.Router();
// AUTHENTICATION Routes
router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/",
    failureMessage: "failed to login"
  }),
  (req, res) => {
    const { _id, _type } = req.user;
    res.send({ _id, _type });
    console.log(req.user);
  }
);

router.post("/logout", (req, res) => {
  req.logout();
  res.send({ message: "logout" });
});

module.exports = router;
