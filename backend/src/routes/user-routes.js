const express = require("express");
const { check } = require("express-validator");
const router = express.Router();
const usersControllers = require("../controllers/users-controller");

router.get("/me", usersControllers.getProfile);

router.post(
  "/",
  [
    check("name")
      .not()
      .isEmpty(),
    check("email")
      .normalizeEmail()
      .isEmail(),
    check("password").isLength({ min: 6 })
  ],
  usersControllers.createUser
);

router.patch(
  "/me",
  [
    check("name")
      .not()
      .isEmpty(),
    check("email")
      .normalizeEmail()
      .isEmail(),
    check("password").isLength({ min: 6 })
  ],
  usersControllers.editProfile
);

router.post("/login", usersControllers.login);

router.post("/logout", usersControllers.logout);

module.exports = router;
