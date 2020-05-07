import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";

import Header from "./shared/components/Navigation/Header";
import Profile from "./profile/pages/UserProfile";
import Recipes from "./recipes/pages/Recipes";
import Recipe from "./recipes/pages/Recipe";
import NewRecipe from "./recipes/pages/NewRecipe";
import "./App.css";

const App = () => {
  return (
    <Router>
      <Header />
      <main>
        <Switch>
          <Route path="/profile" exact={true}>
            <Profile />
          </Route>
          <Route path="/recipes" exact={true}>
            <Recipes />
          </Route>
          <Route path="/recipes/:recipeId" exact={true}>
            <Recipe />
          </Route>
          <Route path="/recipes/new" exact={true}>
            <NewRecipe />
          </Route>
          <Redirect to="/" />
        </Switch>
      </main>
    </Router>
  );
};

export default App;
