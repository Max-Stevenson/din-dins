import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import NavLinks from "./NavLinks";
import SideDrawer from "./SideDrawer";

const Header = props => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  const openDrawer = () => {
    setDrawerIsOpen(true);
  };

  return (
    <React.Fragment>
      {drawerIsOpen && (<SideDrawer>
        <nav className="main-header__drawer-nav">
          <NavLinks />
        </nav>
      </SideDrawer>)}
      <header className="main-header">
        <button className="main-header__menu-btn" onClick={openDrawer}>
          <div />
          <div />
          <div />
        </button>
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
