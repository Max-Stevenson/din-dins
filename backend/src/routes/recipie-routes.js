const express = require("express");
const fileUpload = require("../middleware/file-upload");
const recipesController = require('../controllers/recipies-controller');
const { check } = require("express-validator");

const router = express.Router();

router.get("/:id", recipesController.getSingleRecipie);

router.get("/", recipesController.getAllRecipies);

router.post(
  "/",
  fileUpload.single("image"),
  [
    check("title")
      .not()
      .isEmpty(),
    check("isVegetarian")
      .not()
      .isEmpty()
  ],
  recipesController.createRecipie
);

router.patch("/:id", recipesController.editRecipie);

router.delete("/:id", recipesController.deleteRecipie);

module.exports = router;