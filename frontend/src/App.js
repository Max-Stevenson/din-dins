import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";

import Header from "./shared/components/Header";
import Users from "./users/pages/Users";
import Recipies from "./recipies/pages/Recipies";
import "./App.css";

const App = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/profile" exact={true}>
          <Users />
        </Route>
        <Route path="/recipies" exact={true}>
          <Recipies />
        </Route>
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};

export default App;
