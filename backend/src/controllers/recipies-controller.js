const Recipie = require("../models/recipie");
const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");

exports.createRecipie = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid input passed, please check your data", 422)
    );
  }

  const recipie = new Recipie(req.body);
  try {
    await recipie.save();
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
  res.status(201).send({ recipie });
};

exports.getAllRecipies = async (req, res, next) => {
  let recipies;
  try {
    recipies = await Recipie.find();
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
  res.status(200).send({ recipies });
};

exports.getSingleRecipie = async (req, res, next) => {
  let id = req.params.id;
  console.log(id);
  let recipie;
  try {
    recipie = await Recipie.findById(id);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
  res.status(200).send(recipie);
};
