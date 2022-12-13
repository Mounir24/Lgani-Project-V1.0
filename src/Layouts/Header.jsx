import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserAuthContext } from "../Context/UserAuthContext";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

// IMPORT ASSETS (LOGO - ...)
import Logo from "../Assets/ajidq-logo.png";
import HumainAvatar from "../Assets/SVG/user-avatar.png";

function Header() {
  // STATE MANGEMENT
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const { dispatch, user } = useContext(UserAuthContext);

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
          <img src={Logo} alt="Ajidq - Smart Qr tags" />
        </Link>
        {/*--- HEADER LINKS ---*/}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item lnk-pad active">
              <Link to="/">Home</Link>
            </li>
            <li className="nav-item lnk-pad">
              <Link to="/#how-it-works">How it works</Link>
            </li>
          </ul>
        </div>
        {/*--- HEADER BTNS (SIGN-UP & LOGIN)---*/}
        {user ? (
          <Tooltip title={user.full_name}>
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <Avatar sx={{ width: 50, height: 50 }}>
                <img
                  src={user.profile_avatar || HumainAvatar}
                  alt={user.full_name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </Avatar>
            </IconButton>
          </Tooltip>
        ) : (
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
        )}
      </nav>
    </header>
  );
}

export default Header;
