import React from "react";
import "./Header.css";

const Header = props => {
  return (
    <header className="main-header">
      <div className="sidebar-icon-container">
        <div />
        <div />
        <div />
      </div>
      <h1>Din Dins</h1>
      <ul className="navbar-links">
        <li>
          <a href="default.asp">Recipies</a>
        </li>
        <li>
          <a href="news.asp">Mealplanner</a>
        </li>
        <li>
          <a href="contact.asp">Profile</a>
        </li>
      </ul>
    </header>
  );
};

export default Header;
