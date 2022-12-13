import React, { useState, useContext } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { UserAuthContext } from "../Context/UserAuthContext";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Switch from "@mui/material/Switch";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { useNavigate } from "react-router-dom";

// IMPORT ASSETS (IMAGES -  SVG - GIFs)
// PETS ASSETS
import Step1 from "../Assets/Images/step1.png";
import Step2 from "../Assets/Images/step2.png";
import Step3 from "../Assets/Images/step3.png";
import Step4 from "../Assets/Images/step4.png";

// HUMAINS ASSETS
import Humain1 from "../Assets/Images/humain-1.png";
import Humain2 from "../Assets/Images/humain-2.png";
import Humain3 from "../Assets/Images/humain-3.png";
import Humain4 from "../Assets/Images/humain-4.png";

import AboutSRV from "../Assets/Images/about-us.png";
import CheckMark from "../Assets/SVG/check.png";

/*--- IMPORT HELPER / UTILS ---*/
import AuthAPI from "../Apis/auth.api";

function Home() {
  // STATE MANAGEMENT
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSectionSwitched, setIsSectionSwitched] = useState(false);
  const [account, setAccount] = useState({});
  const [isUserRegistered, setIsUserRegistered] = useState(null);
  const [userEmail, setUserEmail] = useState("");
  const [msgError, setMsgError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoginError, setIsLoginError] = useState(null);
  const [loginError, setLoginError] = useState("");
  const [isRedirectLoading, setIsRedirectLoading] = useState(false);

  const { signup_open: open, dispatch } = useContext(UserAuthContext);
  const { login_open } = useContext(UserAuthContext);
  const navigateTo = useNavigate();

  // HANDLE SIGNUP CLOSE MODAL
  const handlePopupClose = () => {
    dispatch({ type: "SIGNUP_CLOSE_POPUP" });
  };

  // HANDLE LOGIN CLOSE MODAL
  const handleLoginPopupClose = () => {
    dispatch({ type: "LOGIN_CLOSE_POPUP" });
  };

  // HANDLE SIGNUP OPEN MODAL
  const handleSignupPopupOpen1 = () => {
    dispatch({ type: "SIGNUP_OPEN_POPUP" });
  };

  // HANDLE SIGNUP PASSWORD SWITCH INPUT
  const handleSignupSwitch = (event) => {
    if (event.target.checked) {
      setIsSignupOpen(true);
    } else {
      setIsSignupOpen(false);
    }
  };

  // HANDLE LOGIN PASSWORD SWITCH INPUT
  const handleLoginSwitch = (event) => {
    if (event.target.checked) {
      setIsLoginOpen(true);
    } else {
      setIsLoginOpen(false);
    }
  };

  // HANDLE HOW IT WORKS SECTION SWITCH
  const handleHowItWorksSwitch = (event) => {
    if (event.target.checked) {
      setIsSectionSwitched(true);
    } else {
      setIsSectionSwitched(false);
    }
  };

  // HANDLE REGISTER FORM INPUTS
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setAccount((values) => ({ ...values, [name]: value }));
  };

  // HANDLE SUBMIT USER DATA - REGISTER CLIENT
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (Object.keys(account).length > 0 && account !== undefined) {
      // CREATE NEW USER -->
      try {
        setIsLoading(true);
        await AuthAPI.resgiterClient(account, (err, PAYLOAD) => {
          if (err) {
            console.error(err);
            setIsUserRegistered(false);
            return setMsgError(err.message || "Error raised :(");
          }

          if (Array.isArray(PAYLOAD)) {
            // CHECK IF THE ERRORS ARRAY CONTAINS MORE THAN +1 OBJECT ERROR
            if (PAYLOAD.length > 0) {
              //let genericErrorString;
              let errorsSK = [];
              const errors_stack = PAYLOAD.map((error_obj) => {
                const errorMsg = error_obj.msg;
                const inputParam = error_obj.param;
                errorsSK.push(`* ${inputParam}: ${errorMsg} \n`);
                return errorsSK;
              });
              setIsUserRegistered(false);
              setMsgError(
                errors_stack.map((error) => {
                  return error;
                }),
              );
              setIsLoading(false);
            } else {
              const errorMsg = PAYLOAD[0].msg;
              const inputParam = PAYLOAD[0].param;
              setIsUserRegistered(false);
              setMsgError(`* ${inputParam}: ${errorMsg} \n`);
              setIsLoading(false);
            }
          }

          switch (PAYLOAD.isCreated) {
            case false:
              setIsUserRegistered(PAYLOAD.isCreated);
              setMsgError(PAYLOAD.message);
              setIsLoading(false);
              break;
            case true:
              setIsUserRegistered(PAYLOAD["isCreated"]);
              setUserEmail(PAYLOAD["registeredEmail"]);
              setIsLoading(false);
              break;
            default:
              return null;
          }
          setIsLoading(false);
        });
      } catch (err) {
        setMsgError("Something went wrong :(");
        console.log(err);
      }
    } else {
      setMsgError("Client regsiter form data empty :(");
      setIsLoading(false);
    }
  };

  // HANDLE SUBMIT USER DATA - AUTHENTICATE CLIENT
  const handleLoginFormSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    if (Object.keys(account).length > 0 && account !== undefined) {
      // CREATE NEW USER -->
      try {
        await AuthAPI.AuthClientLogin(account, (err, CLIENT) => {
          if (err) {
            alert(err);
            setIsLoginError(true);
            setLoginError(err || "Auth Login Failed :(");
            setIsLoading(false);
            return;
          }

          switch (CLIENT.isLoged) {
            case false:
              setIsLoginError(true);
              setLoginError(CLIENT.message);
              setIsLoading(false);
              break;
            case true:
              setIsLoginError(false);
              setIsLoading(false);
              dispatch({
                type: "LOGOUT",
              });
              dispatch({
                type: "LOGIN_SUCCESS",
                payload: CLIENT.user_payload,
              });
              setIsRedirectLoading(true);
              setTimeout(() => {
                navigateTo("/dashboard/home");
              }, 2000);
              break;
            default:
              return null;
          }
          setIsLoading(false);
        });
      } catch (err) {
        setMsgError("Something went wrong :(");
        console.log(err);
      }
    } else {
      setIsLoginError(true);
      setLoginError("Client login form data empty :(");
      setIsLoading(false);
    }
  };

  // MODAL STYLE
  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    background: "hsl(204, 8%, 98%)",
    boxShadow: 24,
    padding: "2.5rem",
    borderRadius: "14px",
  };

  return (
    <main
      className="l-home-container"
      style={{
        filter: isRedirectLoading ? "blur(20px)" : "blur(0px)",
        width: "100%",
        height: "100%",
      }}
    >
      {/*--- HOME - HERO BANNER ---*/}
      <div className="hero-section-container">
        <div className="shape-right"></div>
        <div className="hero-banner-content">
          <h1 className="hero-banner-title">
            A new experience at your fingertips
          </h1>
          <p className="hero-banner-desc">
            Help lost people & pets reunite with their family safer and faster.
          </p>
          <button type="button" className="hero-banner-started">
            Get started Now
          </button>
        </div>
        <div className="shape-left"></div>
      </div>
      {/*--- HOME - HOW ITS WORKS SECTION ---*/}
      <section className="home-how-it-works" id="how-it-works">
        <div className="container mt-5">
          <h1 className="section-label">How it works</h1>
          <div className="home-setting-row">
            {/*--- ENABLE / DISBALE PRIVACY CONTROL  ---*/}
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    checked={isSectionSwitched}
                    color="warning"
                    onChange={handleHowItWorksSwitch}
                  />
                }
                className="switch_label"
                label="Pets / Humains"
              />
            </FormGroup>
          </div>
          {!isSectionSwitched ? (
            <div className="row w-100 mt-5">
              
              <div className="col-md-3 col-3 col-sm-12">
                <div className="step-box-container">
                  {/*--- POSTER BOX ---*/}
                  <div className="step-poster-wrapper">
                    <img className="step2" src={Step1} alt="Lgani - How it works? step 1" />
                  </div>

                  {/*--STEP BOX CONTENT --*/}
                  <div className="step-box-content">
                    <h3 className="step-title">
                      Get a PetQ ID tag and create profile for your pet
                    </h3>
                    <p className="step-desc">
                      Link the profile and tag, Keep your contact details and
                      pet’s critical information up-to-date.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-3 col-3 col-sm-12" >
                <div className="step-box-container" id="swp">
                  {/*--STEP BOX CONTENT --*/}
                  <div className="step-box-content">
                    <h3 className="step-title">If your pet goes missing</h3>
                    <p className="step-desc">
                      Make sure you have enabled all critical information, so
                      finder can view them through your pet's profile.
                    </p>
                  </div>
                  {/*--- POSTER BOX ---*/}
                  <div className="step-poster-wrapper">
                    <img src={Step2} alt="Lgani - How it works? step 2" className="setp2"/>
                  </div>
                </div>
              </div>
              <div className="col-md-3 col-3 col-sm-12">
                <div className="step-box-container">
                  {/*--- POSTER BOX ---*/}
                  <div className="step-poster-wrapper">
                    <img src={Step3} alt="Lgani - How it works? step 3" />
                  </div>

                  {/*--STEP BOX CONTENT --*/}
                  <div className="step-box-content">
                    <h3 className="step-title">
                      Finder scan the tag or visit profile online
                    </h3>
                    <p className="step-desc">
                      Any one with a smart phone can scan the tag or visit your
                      pet's profile online to view your contact details and
                      pet's critical information.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-3 col-3 col-sm-12">
                <div className="step-box-container" id = "swp">
                  {/*--STEP BOX CONTENT --*/}
                  <div className="step-box-content">
                    <h3 className="step-title">Reunited with your pet</h3>
                    <p className="step-desc">
                      With the detailed contact information, finders can contact
                      you immediately, and your pet gets home faster.
                    </p>
                  </div>
                  {/*--- POSTER BOX ---*/}
                  <div className="step-poster-wrapper">
                    <img src={Step4} alt="Lgani - How it works? step 4" />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="row w-100 mt-5">
              <div className="col-md-3 col-3 col-sm-12">
                <div className="step-box-container">
                  {/*--- POSTER BOX ---*/}
                  <div className="step-poster-wrapper">
                    <img src={Humain1} alt="Lgani - How it works? step 1" />
                  </div>

                  {/*--STEP BOX CONTENT --*/}
                  <div className="step-box-content">
                    <h3 className="step-title">
                      Get a Qr ID tag and create profile for your Kids / Adults
                    </h3>
                    <p className="step-desc">
                      Link the profile and tag, Keep your contact details and
                      pet’s critical information up-to-date.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-3 col-3 col-sm-12">
                <div className="step-box-container" id="swp">
                  {/*--STEP BOX CONTENT --*/}
                  <div className="step-box-content">
                    <h3 className="step-title">
                      If your Kids / Adults goes mising
                    </h3>
                    <p className="step-desc">
                      Make sure you have enabled all critical information, so
                      finder can view them through your kids's / adults's
                      profile.
                    </p>
                  </div>
                  {/*--- POSTER BOX ---*/}
                  <div className="step-poster-wrapper">
                    <img src={Humain2} alt="Lgani - How it works? step 2" />
                  </div>
                </div>
              </div>
              <div className="col-md-3 col-3 col-sm-12">
                <div className="step-box-container">
                  {/*--- POSTER BOX ---*/}
                  <div className="step-poster-wrapper">
                    <img src={Humain3} alt="Lgani - How it works? step 3" />
                  </div>

                  {/*--STEP BOX CONTENT --*/}
                  <div className="step-box-content">
                    <h3 className="step-title">
                      Finder scan the tag or visit profile online
                    </h3>
                    <p className="step-desc">
                      Any one with a smart phone can scan the tag or visit your
                      kids's / adults's profile online to view your contact
                      details and kids's / adults's critical information.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-3 col-3 col-sm-12">
                <div className="step-box-container" id = "swp">
                  {/*--STEP BOX CONTENT --*/}
                  <div className="step-box-content">
                    <h3 className="step-title">
                      Reunited with your kids / adults
                    </h3>
                    <p className="step-desc">
                      With the detailed contact information, finders can contact
                      you immediately, and your kids / adults gets home faster.
                    </p>
                  </div>
                  {/*--- POSTER BOX ---*/}
                  <div className="step-poster-wrapper">
                    <img src={Humain4} alt="Lgani - How it works? step 4" />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/*--- HOME - ABOUT OUR SERVICE ---*/}
      <section className="home-about-lgani">
        <div className="container mt-5">
          <h1 className="section-label">
            Why <span className="brand_name">Ajidq</span> service{" "}
          </h1>
          <div className="row w-100 mt-5">
            <div className="col-md-6 col-6 col-sm-12" id="ajidq">
              <div className="box-poster-wrapper">
                <img
                  src={AboutSRV}
                  alt="Lgani - About our service & missions"
                />
              </div>
            </div>
            <div className="col-md-6 col-6 col-sm-12" id="aji">
              <div className="box-content-wrapper">
                <p className="content-desc">
                  Ajidq ID tag provides much more vital information to the
                  finders when your pet goes missing, such as multiple contact
                  details, pet medical conditions, allergies, dietary needs and
                  more.
                  <br />
                  <br />
                  As a great additon to microchip implants, These vita
                  information linked with Lgani ID tag can be easily scanned by
                  any smartphone, and best of all, it costs the same as a
                  regular pets & humains tag.
                </p>
                <div className="our-features-box">
                  <ul className="list-style">
                    <li className="list-item">
                      <div className="check-mark-holder">
                        <img src={CheckMark} alt="Lgani - Features" />
                      </div>
                      <span className="feature-label">
                        Free Online Pets & Humains Profile
                      </span>
                    </li>
                    <li className="list-item">
                      <div className="check-mark-holder">
                        <img src={CheckMark} alt="Lgani - Features" />
                      </div>
                      <span className="feature-label">
                        Affordable Hi-tech Tag
                      </span>
                    </li>
                    <li className="list-item">
                      <div className="check-mark-holder">
                        <img src={CheckMark} alt="Lgani - Features" />
                      </div>
                      <span className="feature-label">Name & No. Engraved</span>
                    </li>
                    <li className="list-item">
                      <div className="check-mark-holder">
                        <img src={CheckMark} alt="Lgani - Features" />
                      </div>
                      <span className="feature-label">
                        Accessable 24/7, anywhere, anytime
                      </span>
                    </li>
                    <li className="list-item">
                      <div className="check-mark-holder">
                        <img src={CheckMark} alt="Lgani - Features" />
                      </div>
                      <span className="feature-label">
                        Responsive profile page suites all mobile screens
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*--- HOME - BANNER ---*/}
      <section className="home-banner-container">
        <div className="banner-content">
          <h1 className="banner-label">
            Easy to manage, Beautifully displayed
          </h1>
          <ul className="list-style p-0 mt-4">
            <li className="list-item">
              <i class="bx bx-edit"></i>
              Super easy to manage & update
            </li>
            <li className="list-item">
              <i class="bx bx-mobile-alt"></i>
              Responsive profile page suites all mobile screens
            </li>
            <li className="list-item">
              <i class="bx bx-time-five"></i>
              Accessable 24/7, anywhere, anytime
            </li>
          </ul>
          <div className="banner-footer-wrapper">
            <button
              className="btn-get-started"
              onClick={handleSignupPopupOpen1}
              type="button"
            >
              Create An account Now
            </button>
            <span className="btn-extension-label">Its free</span>
          </div>
        </div>
      </section>
      {/*--- HOME - HOW TO GET STARTED SECTION ---*/}
      <section className="home-get-started-section">
        <div className="container mt-5">
          <h1 className="section-label">How to get started</h1>
          <div className="row mt-5 w-100">
            <div className="col-md-4 col-sm-12 col-4">
              <div className="box-container">
                <div className="box-icon-wrapper">
                  <i class="bx bx-user-plus"></i>
                </div>
                <div className="box-content-wrapper">
                  <h3 className="box-label">1. Create your account</h3>
                  <p className="box-desc">Create your Ajidq account</p>
                  {/*-- --*/}
                  <button className="box-btn" type="button">
                    Create an account
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-4 col-sm-12 col-4">
              <div className="box-container">
                <div className="box-icon-wrapper">
                  <i class="bx bx-qr-scan"></i>
                </div>
                <div className="box-content-wrapper">
                  <h3 className="box-label">2. Select Qr Tag Product</h3>
                  <p className="box-desc">
                    Select your minimalist design Qr tag product
                  </p>
                  <button
                    className="box-btn"
                    onClick={handleSignupPopupOpen1}
                    type="button"
                  >
                    Pick a product
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-4 col-sm-12 col-4">
              <div className="box-container">
                <div className="box-icon-wrapper">
                  <i class="bx bx-link"></i>
                </div>
                <div className="box-content-wrapper">
                  <h3 className="box-label">3. Create a Qr Tag profile</h3>
                  <p className="box-desc">
                    create your pet's / humain's profile & make it live
                  </p>
                  <button className="box-btn" type="button">
                    Create profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*--- HOME - FEATURES SECTION ---*/}
      <section className="home-our-features-section">
        <div className="container mt-5">
          <h1 className="section-label mb-5">Our Features</h1>
          <div className="row w-100 " id = "feature">
            <div className="col-md-4 col-sm-12 col-4">
              <div className="feature-box-wrapper">
                <div className="feature-circle-wrapper">
                  <span className="feature-label-count">1</span>
                </div>
                <div className="feature-content-wrapper">
                  <h3 className="feature-title">up-to-date contact info</h3>
                  <p className="feature-desc">Update your contact info 24/7</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 col-sm-12 col-4">
              <div className="feature-box-wrapper">
                <div className="feature-circle-wrapper">
                  <span className="feature-label-count">2</span>
                </div>
                <div className="feature-content-wrapper">
                  <h3 className="feature-title">Easy to manage</h3>
                  <p className="feature-desc">
                    Easy to use management dashboard
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4 col-sm-12 col-4">
              <div className="feature-box-wrapper">
                <div className="feature-circle-wrapper">
                  <span className="feature-label-count">3</span>
                </div>
                <div className="feature-content-wrapper">
                  <h3 className="feature-title">Laser Engraved</h3>
                  <p className="feature-desc">
                    Durable laser engraved aluminum tags
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4 col-sm-12 col-4">
              <div className="feature-box-wrapper">
                <div className="feature-circle-wrapper">
                  <span className="feature-label-count">4</span>
                </div>
                <div className="feature-content-wrapper">
                  <h3 className="feature-title">Privacy control</h3>
                  <p className="feature-desc">
                    You have complete control of the data
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4 col-sm-12 col-4">
              <div className="feature-box-wrapper">
                <div className="feature-circle-wrapper">
                  <span className="feature-label-count">5</span>
                </div>
                <div className="feature-content-wrapper">
                  <h3 className="feature-title">
                    One account, Multiple Profiles
                  </h3>
                  <p className="feature-desc">
                    Easy to manage all your family & pets ID Tags
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4 col-sm-12 col-4">
              <div className="feature-box-wrapper">
                <div className="feature-circle-wrapper">
                  <span className="feature-label-count">6</span>
                </div>
                <div className="feature-content-wrapper">
                  <h3 className="feature-title">GPS Notification</h3>
                  <p className="feature-desc">
                    GPS notification when profile been viewed
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*--- SIGNUP POPUP MODAL ---*/}
      <Modal
        open={open}
        onClose={handlePopupClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...modalStyle, width: 550 }}>
          <section className="register_modal_container">
            <h3 className="modal_label">Create New Account</h3>
            {isUserRegistered ? (
              <Alert severity="success">
                <AlertTitle>Great Step !</AlertTitle>
                confirmation link has been sent to : {userEmail}
              </Alert>
            ) : isUserRegistered === false ? (
              <Alert severity="error">
                <AlertTitle>Register Failed !</AlertTitle>
                {msgError}
              </Alert>
            ) : null}
            <form className="mt-4" onSubmit={handleFormSubmit}>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <input
                    type="text"
                    className="form-control signup_modal_input"
                    name="first_name"
                    onChange={handleChange}
                    value={account.first_name}
                    placeholder="First Name"
                  ></input>
                </div>
                <div className="form-group col-md-6">
                  <input
                    type="text"
                    className="form-control signup_modal_input"
                    name="last_name"
                    onChange={handleChange}
                    value={account.last_name}
                    placeholder="Last Name"
                  ></input>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-12">
                  <input
                    type="text"
                    className="form-control signup_modal_input"
                    name="email"
                    onChange={handleChange}
                    value={account.email}
                    placeholder="E-mail address"
                  ></input>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <input
                    type={isSignupOpen ? "text" : "password"}
                    className="form-control signup_modal_input"
                    name="password"
                    onChange={handleChange}
                    value={account.password}
                    placeholder="Password"
                  ></input>
                </div>
                <div className="form-group col-md-6">
                  <input
                    type={isSignupOpen ? "text" : "password"}
                    className="form-control signup_modal_input"
                    name="re_password"
                    onChange={handleChange}
                    value={account.re_password}
                    placeholder="Confirm Password"
                  ></input>
                </div>
              </div>
              {/*--- SHOW PASSWORD ---*/}
              <FormGroup>
                <FormControlLabel
                  control={
                    <Switch
                      checked={isSignupOpen}
                      color="warning"
                      onChange={handleSignupSwitch}
                    />
                  }
                  label="Show Password"
                />
              </FormGroup>

              <button type="submit" className="register-btn">
                {isLoading ? "Wait..." : "Register"}
              </button>
            </form>
          </section>
        </Box>
      </Modal>

      {/*--- LOGIN POPUP MODAL ---*/}
      <Modal
        open={login_open}
        onClose={handleLoginPopupClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...modalStyle, width: 550 }}>
          <section className="login_modal_container">
            <h3 className="modal_label">Login</h3>
            {isLoginError === false ? (
              <Alert severity="success">
                <AlertTitle>Successfuly Authenticated !</AlertTitle>
                You Will redirect after 2 seconds
              </Alert>
            ) : isLoginError === true ? (
              <Alert severity="error">
                <AlertTitle>Authentication Failed !</AlertTitle>
                {loginError}
              </Alert>
            ) : null}
            <form className="mt-4" onSubmit={handleLoginFormSubmit}>
              <div className="form-row">
                <div className="form-group col-md-12">
                  <input
                    type="text"
                    className="form-control login_modal_input"
                    name="email"
                    onChange={handleChange}
                    value={account.email}
                    placeholder="Email address"
                  ></input>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <input
                    type={isLoginOpen ? "text" : "password"}
                    className="form-control login_modal_input"
                    name="password"
                    onChange={handleChange}
                    value={account.password}
                    placeholder="Password"
                  ></input>
                </div>
                <div className="form-group col-md-6">
                  <input
                    type={isLoginOpen ? "text" : "password"}
                    className="form-control login_modal_input"
                    name="re_password"
                    onChange={handleChange}
                    value={account.re_password}
                    placeholder="Confirm Password"
                  ></input>
                </div>
              </div>
              {/*--- SHOW PASSWORD ---*/}
              <FormGroup>
                <FormControlLabel
                  control={
                    <Switch
                      checked={isLoginOpen}
                      color="warning"
                      onChange={handleLoginSwitch}
                    />
                  }
                  label="Show Password"
                />
              </FormGroup>
              <button type="submit" className="login-btn">
                {isLoading ? "Authenticating..." : "Login"}
              </button>
            </form>
          </section>
        </Box>
      </Modal>
    </main>
  );
}

export default Home;
