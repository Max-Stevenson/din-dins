const express = require('express');
const { check } = require('express-validator');
const fileUpload = require('../middleware/file-upload');
const router = express.Router();

router.post("/recipies", fileUpload.single('image'), [ check("title").not().isEmpty(), check("desc")])