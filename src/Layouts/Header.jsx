import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserAuthContext } from "../Context/UserAuthContext";

// IMPORT ASSETS (LOGO - ...)
import Logo from "../Assets/lgani-logo.png";

function Header() {
  const { dispatch } = useContext(UserAuthContext);

  //HANDLE OPEN CREATE CATEGORY MODAL
  const handleSignupPopupOpen = () => {
    dispatch({ type: "SIGNUP_OPEN_POPUP" });
  };

  //HANDLE OPEN CREATE CATEGORY MODAL
  const handleLoginPopupOpen = () => {
    dispatch({ type: "LOGIN_OPEN_POPUP" });
  };

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light">
        <button
          className="navbar-toggler"
          type="button"
          tilt-data=""
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i class="bx bxs-grid-alt"></i>
        </button>
        <Link to="/" className="logo-wrapper">
          {/*---<i class="bx bxl-meta"></i>---*/}
          <img src={Logo} alt="Lgani" />
        </Link>
        {/*--- HEADER LINKS ---*/}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item lnk-pad active">
              <Link to="/">Home</Link>
            </li>
            <li className="nav-item lnk-pad">
              <Link to="/shop">Shop</Link>
            </li>
            <li className="nav-item lnk-pad">
              <Link to="#get-started">Get Started</Link>
            </li>
          </ul>
        </div>
        {/*--- HEADER BTNS (SIGN-UP & LOGIN)---*/}

        <div className="header_btns">
          <ul className="btn_list">
            <li className="btn-item">
              <button className="login-btn" onClick={handleLoginPopupOpen}>
                Login
              </button>
            </li>
            <li className="btn-item">
              <button className="signup-btn" onClick={handleSignupPopupOpen}>
                Register
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;
