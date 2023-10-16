const router = require("express").Router();
const userManager = require("../managers/userManager");

router.get("/login", (req, res) => {
  res.render("users/login");
});

router.post("/login", (req, res) => {
  const loginData = req.body;
  console.log(loginData);
  res.redirect("/");
});

router.get("/register", (req, res) => {
  res.render("users/register");
});

module.exports = router;
