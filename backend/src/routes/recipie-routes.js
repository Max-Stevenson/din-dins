const express = require("express");
const { check } = require("express-validator");
const fileUpload = require("../middleware/file-upload");
const Recipie = require("../models/recipie");
const router = express.Router();

router.post("/", fileUpload.single("image"), [
  check("title")
    .not()
    .isEmpty(),
  check("isVegetarian")
    .not()
    .isEmpty()
], async (req, res) => {
  const recipie = new Recipie(req.body);
  try {
    await recipie.save();
    res.status(201).send({recipie});
  } catch (err) {
    console.log(err);
    res.status(500).send(err)
  };
});

module.exports = router;
