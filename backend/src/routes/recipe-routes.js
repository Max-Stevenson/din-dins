const express = require("express");
const fileUpload = require("../middleware/file-upload");
const recipesController = require('../controllers/recipes-controller');
const { check } = require("express-validator");

const router = express.Router();

router.get("/:id", recipesController.getSingleRecipe);

router.get("/", recipesController.getAllRecipes);

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
  recipesController.createRecipe
);

router.patch("/:id", recipesController.editRecipe);

router.delete("/:id", recipesController.deleteRecipe);

module.exports = router;