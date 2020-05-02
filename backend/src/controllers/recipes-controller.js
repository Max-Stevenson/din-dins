const Recipe = require("../models/recipe");
const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");

exports.createRecipe = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid input passed, please check your data.", 422)
    );
  }

  const recipe = new Recipe(req.body);
  try {
    await recipe.save();
  } catch (err) {
    return next(
      new HttpError("Could not create recipe, please try again.", 500)
    );
  }
  res.status(201).send({ recipe });
};

exports.getAllRecipes = async (req, res, next) => {
  let recipes;

  try {
    recipes = await Recipe.find();
  } catch (err) {
    return next(
      new HttpError("Could not get recipes, please try again.", 500)
    );
  }
  res.status(200).send({ recipes });
};

exports.getSingleRecipe = async (req, res, next) => {
  const id = req.params.id;
  let recipe;

  try {
    recipe = await Recipe.findById(id);
    if (!recipe) {
      return next(new HttpError("Recipe does not exist, please try again.", 404));
    }
  } catch (err) {
    return next(new HttpError("Could not get recipe, please try again.", 500));
  }
  res.status(200).send(recipe);
};

exports.editRecipe = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid input passed, please check your data", 422)
    );
  }

  const {
    image,
    title,
    isVegetarian,
    mealSize,
    ingredients,
    method
  } = req.body;
  const id = req.params.id;

  let recipe;
  try {
    recipe = await Recipe.findById(id);
    if (!recipe) {
      return next(
        new HttpError("Could not find recipe to edit, please try again.", 404)
      );
    }
  } catch (err) {
    console.log(err);

    return next(
      new HttpError("Could not edit recipe, please try again.", 500)
    );
  }

  recipe.image = image;
  recipe.title = title;
  recipe.isVegetarian = isVegetarian;
  recipe.mealSize = mealSize;
  recipe.ingredients = ingredients;
  recipe.method = method;

  try {
    await recipe.save();
  } catch (err) {
    return next(
      new HttpError("Could not edit recipe, please try again.", 500)
    );
  }

  res.status(200).send(recipe);
};

exports.deleteRecipe = async (req, res, next) => {
  let recipe;
  const id = req.params.id;
  try {
    recipe = await Recipe.findByIdAndDelete(id);
    if (!recipe) {
      return next(
        new HttpError(
          "Could not find recipe to delete, please try again.", 404)
      );
    }
  } catch (err) {
    return next(
      new HttpError("Could not delete recipe, please try again.", 500)
    );
  }

  res.status(200).send(recipe)
};
