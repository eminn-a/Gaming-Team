const router = require("express").Router();
const { TOKEN_KEY } = require("../config/config");
const userManager = require("../managers/userManager");
const { errorHandler } = require("../middlewares/errorHandlerMiddleware");
const { getErrorMessage } = require("../utils/errorHelpers");
const photoManager = require("../managers/photoManager");

router.get("/login", (req, res) => {
  res.render("users/login");
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const token = await userManager.login(username, password);
    res.cookie("token", token);
    res.redirect("/");
  } catch (err) {
    res.render("users/login", { error: getErrorMessage(err) });
  }
});

router.get("/register", (req, res) => {
  res.render("users/register");
});

router.post("/register", async (req, res) => {
  const { username, email, password, repeatPassword } = req.body;

  try {
    const token = await userManager.register({
      username,
      email,
      password,
      repeatPassword,
    });
    res.cookie(TOKEN_KEY, token);
    res.redirect("/");
  } catch (err) {
    res.render("users/register", { error: getErrorMessage(err) });
  }
});

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/");
});

router.get("/profile", async (req, res) => {
  const user = req.user;

  const photos = await photoManager.getByOwner(req.user.id);
  const counter = photos.length;
  console.log(photos);
  res.render("profile.hbs", { user, photos, counter });
});
module.exports = router;
