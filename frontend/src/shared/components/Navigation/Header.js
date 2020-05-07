import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import NavLinks from "./NavLinks";
import Backdrop from "../UIElements/Backdrop";
import SideDrawer from "./SideDrawer";

const Header = props => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  const openDrawerHandler = () => {
    setDrawerIsOpen(true);
  };

  const closeDrawerHandler = () => {
    setDrawerIsOpen(false);
  };

  return (
    <React.Fragment>
      {drawerIsOpen && <Backdrop onClick={closeDrawerHandler} />}
      <SideDrawer show={drawerIsOpen} onClick={closeDrawerHandler}>
        <nav className="main-header__drawer-nav">
          <NavLinks />
        </nav>
      </SideDrawer>
      <header className="main-header">
        <button className="main-header__menu-btn" onClick={openDrawerHandler}>
          <div />
          <div />
          <div />
        </button>
        <h1 className="main-header__title">
          <Link to="/" exact="true">
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
