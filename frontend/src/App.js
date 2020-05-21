import React, { useState, useCallback } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";

import Header from "./shared/components/Navigation/Header";
import Profile from "./profile/pages/UserProfile";
import Recipes from "./recipes/pages/Recipes";
import EditRecipe from "./recipes/pages/EditRecipe";
import NewRecipe from "./recipes/pages/NewRecipe";
import ViewRecipe from "./recipes/pages/ViewRecipe";
import TestPage from "./Test/TestPage";
import "./App.css";
import Auth from "./profile/pages/Auth";
import { AuthContext } from "./shared/context/auth-context";
import ViewCalendar from "./meal_plan/pages/ViewCalendar";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  let routes;
  if (isLoggedIn) {
    routes = (
      <Switch>
        <Route path="/profile" exact={true}>
          <Profile />
        </Route>
        <Route path="/recipes" exact={true}>
          <Recipes />
        </Route>
        <Route path="/recipes/new" exact={true}>
          <NewRecipe />
        </Route>
        <Route path="/recipes/edit/:recipeId" exact={true}>
          <EditRecipe />
        </Route>
        <Route path="/recipes/view/:recipeId" exact={true}>
          <ViewRecipe />
        </Route>
        <Route path="/test" exact={true}>
          <TestPage />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/recipes" exact={true}>
          <Recipes />
        </Route>
        <Route path="/recipes/view/:recipeId" exact={true}>
          <ViewRecipe />
        </Route>
        <Route path="/login" exact={true}>
          <Auth />
        </Route>
        <Route path="/mealplanner" exact={true}>
          <ViewCalendar/>
        </Route>
        <Redirect to="/login" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}
    >
      <Router>
        <Header />
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
