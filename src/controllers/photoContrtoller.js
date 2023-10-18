const router = require("express").Router();

router.get("/create", (req, res) => {
  res.render("photos/create");
});

router.post("/create", (req, res) => {
  const { name, age, description, location, imageURL } = req.body;
  console.log(name, age, description, location, imageURL);

  res.redirect("/");
});

module.exports = router;
