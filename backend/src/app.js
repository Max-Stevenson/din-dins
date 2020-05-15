require("dotenv").config();
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;

const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const express = require("express");
const port = process.env.PORT || 3000;
const HttpError = require("./models/http-error");

const recipesRoutes = require("./routes/recipe-routes");
const userRoutes = require("./routes/user-routes");

const app = express();
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  next();
});

app.use("/api/v1/recipes", recipesRoutes);
app.use("/api/v1/users", userRoutes);

app.use((req, res, next) => {
  throw new HttpError("Could not find this route.", 404);
});

app.use((error, req, res, next) => {
  if (req.file) {
    fs.unlink(req.file.path, err => {
      console.log(err);
    });
  }
  if (res.headerSent) {
    return next(error);
  }

  res.status(typeof error.code === "number" ? error.code : 500);
  res.json({ message: error.message || "An unknown error occurred" });
});

mongoose
  .connect(
    `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@dindins-cluster-rxgr4.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`,
    {
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
