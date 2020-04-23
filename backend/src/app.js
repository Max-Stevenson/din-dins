require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => res.send("Hello World!"));

mongoose
  .connect(
    `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@dindins-cluster-rxgr4.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server is up on port:${port}`);
    });
  })
  .catch(error => {
    console.log(error);
  });
