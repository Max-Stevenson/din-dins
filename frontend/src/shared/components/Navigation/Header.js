import React from "react";
import "./Header.css";

const Header = props => {
  return (
    <header className="main-header">
      <div className="main-header__menu-btn">
        <div />
        <div />
        <div />
      </div>
      <h1 className="main-header__title">Din Dins</h1>
      <nav className="main_header__nav-links">
        <a className="main_header__nav-link" href="/recipes">Recipes</a>
        <a className="main_header__nav-link" href="/mealplanner">Mealplanner</a>
        <a className="main_header__nav-link" href="/profile">Profile</a>
      </nav>
    </header>
  );
};

export default Header;
