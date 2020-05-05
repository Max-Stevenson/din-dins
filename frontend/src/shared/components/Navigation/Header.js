import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import NavLinks from "./NavLinks";
import SideDrawer from "./SideDrawer";

const Header = props => {
  return (
    <React.Fragment>
      <SideDrawer>
        <nav className="main-header__drawer-nav">
          <NavLinks />
        </nav>
      </SideDrawer>
      <header className="main-header">
        <div className="main-header__menu-btn">
          <div />
          <div />
          <div />
        </div>
        <h1 className="main-header__title">
          <Link to="/" exact>
            Din Dins
          </Link>
        </h1>
        <nav className="main_header__nav-links">
          <NavLinks />
        </nav>
      </header>
    </React.Fragment>
  );
};

export default Header;
