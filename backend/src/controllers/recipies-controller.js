const Recipie = require("../models/recipie");
const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");

exports.createRecipie = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid input passed, please check your data.", 422)
    );
  }

  const recipie = new Recipie(req.body);
  try {
    await recipie.save();
  } catch (err) {
    return next(
      new HttpError("Could not create recipie, please try again.", 500)
    );
  }
  res.status(201).send({ recipie });
};

exports.getAllRecipies = async (req, res, next) => {
  let recipies;

  try {
    recipies = await Recipie.find();
  } catch (err) {
    return next(
      new HttpError("Could not get recipies, please try again.", 500)
    );
  }
  res.status(200).send({ recipies });
};

exports.getSingleRecipie = async (req, res, next) => {
  const id = req.params.id;
  let recipie;

  try {
    recipie = await Recipie.findById(id);
  } catch (err) {
    return next(
      new HttpError("Could not get recipie, please try again.", 500)
    );
  }
  res.status(200).send(recipie);
};

exports.editRecipie = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid input passed, please check your data", 422)
    );
  }

  const { image, title, isVegetarian, mealSize, ingredients, method } = req.body;
  const id = req.params.id;

  let recipie;
  try {
    recipie = await Recipie.findById(id);
  } catch (err) {
    console.log(err);
    
    return next(
      new HttpError("Could not edit recipie, please try again.", 500)
    );
  }

  recipie.image = image;
  recipie.title = title;
  recipie.isVegetarian = isVegetarian;
  recipie.mealSize = mealSize;
  recipie.ingredients = ingredients;
  recipie.method = method;

  try {
    await recipie.save();
  } catch (err) {
    console.log(err);

    return next(
      new HttpError("Could not edit recipie, please try again.", 500)
    );
  }

  res.status(200).send(recipie);
};

exports.deleteRecipie = async (req, res, next) => {};
