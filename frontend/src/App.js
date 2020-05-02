import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";

import Header from "./shared/components/Header";
import Profile from "./profile/pages/UserProfile";
import Recipes from "./recipes/pages/Recipes";
import "./App.css";

const App = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/profile" exact={true}>
          <Profile />
        </Route>
        <Route path="/recipes" exact={true}>
          <Recipes />
        </Route>
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};

export default App;
