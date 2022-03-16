import { Fragment, react } from "react";
import { useState } from "react";
import { CSSTransition } from "react-transition-group";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Logout from "./../images/log_out.svg";

import "./Header.css";

const Header = () => {
  const history = useHistory();
  const [open, setOpen] = useState(false);

  let openCss = open ? "active" : "";
  let openDropdown = open ? "dropdown_active" : "";

  const openHandler = () => {
    setOpen(!open);
  };

  const logoutHandler = () => {
    localStorage.removeItem("user");
    window.location.reload(false);
  };

  return (
    <Fragment>
      <header className="header">
        <div className="header_wrapper">
          <Link to="/">
            <h2 className="header_title">birthday</h2>
          </Link>
          <div
            className={"hamburger-menu " + openCss}
            onClick={openHandler}
            id="hamburger-menu"
          >
            <div className="menu-bar1"></div>
            <div className="menu-bar2"></div>
            <div className="menu-bar3"></div>
          </div>
        </div>
      </header>

      <div className="header_space"></div>

      <div className={"dropdown " + openDropdown}>
        <div onClick={logoutHandler} className="dropdown_logout">
          <img src={Logout} alt="logut" />
          <span>Log out</span>
        </div>
      </div>
    </Fragment>
  );
};

export default Header;
