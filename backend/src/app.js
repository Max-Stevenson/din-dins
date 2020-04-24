require("dotenv").config();
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;

const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const express = require("express");
const port = process.env.PORT || 3000;

const multer = require('multer');
const fileUpload = require('./middleware/file-upload');



const app = express();
// body parser to read json form data and store as js object
app.use(bodyParser.json());

app.get("/", (req, res) => res.send("Hello World!"));

app.post('/image/upload', fileUpload.single(`image`), (req, res) => {
  res.send();
});

mongoose
  .connect(
    `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@dindins-cluster-rxgr4.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true
    }
  )
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is up on port:${port}`);
    });
  })
  .catch(error => {
    console.log(error);
  });
