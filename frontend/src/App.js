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
import Recipe from "./recipes/pages/Recipe";
import NewRecipe from "./recipes/pages/NewRecipe";
import TestPage from "./Test/TestPage";
import "./App.css";
import Auth from "./profile/pages/Auth";
import { AuthContext } from "./shared/context/auth-context";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);
  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}
    >
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
            <Route path="/recipes/new" exact={true}>
              <NewRecipe />
            </Route>
            <Route path="/recipes/:recipeId" exact={true}>
              <Recipe />
            </Route>
            <Route path="/test" exact={true}>
              <TestPage />
            </Route>
            <Route path="/login" exact={true}>
              <Auth />
            </Route>
            <Redirect to="/" />
          </Switch>
        </main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
