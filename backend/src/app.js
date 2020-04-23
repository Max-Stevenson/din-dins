require("dotenv").config();
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const express = require("express");
const port = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.json());

app.get("/", (req, res) => res.send("Hello World!"));

mongoose
  .connect(
    `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@dindins-cluster-rxgr4.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is up on port:${port}`);
    });
  })
  .catch(error => {
    console.log(error);
  });
