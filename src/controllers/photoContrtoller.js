const { isAuth } = require("../middlewares/authMiddleware");
const { getErrorMessage } = require("../utils/errorHelpers");

const photoManager = require("../managers/photoManager");
const { insertMany } = require("../models/Photo");

const router = require("express").Router();

router.get("/create", isAuth, (req, res) => {
  res.render("photos/create");
});

router.post("/create", async (req, res) => {
  const photoData = req.body;
  photoData["owner"] = req.user.id;

  try {
    await photoManager.create(photoData);
    res.redirect("/users/catalog");
  } catch (err) {
    console.log(err);
    res.render("photos/create", { error: getErrorMessage(err) });
  }
});

router.get("/catalog", async (req, res) => {
  try {
    const photos = await photoManager.getAll();

    res.render("photos/catalog", { photos });
  } catch (err) {
    res.render("404", { error: getErrorMessage(err) });
  }
});

router.get("/:id/details", async (req, res) => {
  const petId = req.params.id;

  try {
    const photo = await photoManager.getOne(petId);
    const isOwner = photo.owner._id.toString() === req.user?.id;
    res.render("photos/details", { photo, isOwner });
  } catch (err) {
    res.render("404", { error: getErrorMessage(err) });
  }
});

router.get("/:id/delete", async (req, res) => {
  const petId = req.params.id;
  try {
    await photoManager.delete(petId);
    res.redirect("/users/catalog");
  } catch (err) {
    res.render("404", { error: getErrorMessage(err) });
  }
});

router.get("/:id/edit", async (req, res) => {
  const petId = req.params.id;

  try {
    const pet = await photoManager.getOne(petId);
    res.render("photos/edit", { pet });
  } catch (err) {
    res.render("404", { error: getErrorMessage(err) });
  }
});

router.post("/:id/edit", async (req, res) => {
  const petId = req.params.id;
  const pet = req.body;

  try {
    await photoManager.update(petId, pet);
    res.redirect(`/users/${petId}/details`);
  } catch (err) {
    res.render("photos/edit", { error: "Unable to upload photo", pet });
  }
});

router.post("/:id/comments", async (req, res) => {
  const petId = req.params.id;
  const { message } = req.body;
  const user = req.user.username;

  try {
    await photoManager.addComment(petId, { user, message });
    res.redirect(`/users/${petId}/details`);
  } catch (err) {
    res.render("404", { error: getErrorMessage(err) });
  }
});

module.exports = router;
