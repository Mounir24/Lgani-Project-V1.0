import React, { useState, useEffect } from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Switch from "@mui/material/Switch";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import axios from "axios";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

// IMPORT ASSETS
import HumainAvatar from "../Assets/SVG/user-avatar.png";
// IMPORT APIs CLASSES
import ProfilesTagsAPI from "../Apis/tags.api";
//import PetsAvatar from "../Assets/SVG/pets-avatar.png";

function CreateIDTag() {
  // STATE MANAGEMENT
  const [isGPSEnabled, setIsGPSEnabled] = useState(false);
  const [avatar, setAvatar] = useState("");
  const [allCountries, setAllCountries] = useState([]);
  const [newProfile, setNewProfile] = useState({});
  const [error, setError] = useState({});
  const [isSafe, setIsSafe] = useState(false);
  const [alertShow, setAlertShow] = useState(null);
  const [alertContext, setAlertContext] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // GLOBAL CONTEXT API
  //const { user } = useContext(UserAuthContext);

  // HANDLE SIGNUP PASSWORD SWITCH INPUT
  const handleSignupSwitch = (event) => {
    if (event.target.checked) {
      setIsGPSEnabled(true);
    } else {
      setIsGPSEnabled(false);
    }
  };

  useEffect(() => {
    // HTTP CALL - COUNTRIES REST API ENDPOINT
    const getCountries = async () => {
      const API_ENDPOINT = "https://restcountries.com/v3.1/all";
      try {
        await axios.get(API_ENDPOINT).then((response) => {
          if (response.status === 200 && response.statusText === "OK") {
            response.data.map((country) => {
              const name = country["name"].common;
              if (allCountries.includes(name)) {
                const itemIndex = allCountries.indexOf(name);
                // REMOVE MULTIPLE VALUES
                allCountries.splice(itemIndex, 1);
              } else {
                setAllCountries((prev) => [...prev, name]);
              }

              return true;
            });
          } else {
            alert("SOMETHING WRONG ON FETCHING COUNTRIES API :(");
          }
        });
      } catch (err) {
        console.error(err);
      }
    };
    getCountries();
  }, [allCountries]);

  // CONVERT FILE IMAGE TO BASE64
  const toBase64 = (FILE) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(FILE);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  // HANDLE PROFILE AVATAR EVENT
  const handleAvatarChange = (event) => {
    const FILE = event.target.files[0];
    // CHECK THE FILE MIME TYPE
    const allowed_mime_types = [
      "image/png",
      "image/svg",
      "image/jpeg",
      "image/webp",
    ];
    if (!allowed_mime_types.includes(FILE.type)) {
      return alert("FILE NOT SUPPORTED: [png - svg - jpeg]");
    }

    // Get the file name and size
    const { name: fileName, size } = FILE;
    // Convert size in bytes to kilo bytes
    const fileSize = (size / 1000).toFixed(2);
    // Set the text content
    const fileNameAndSize = `${fileName} - ${fileSize}KB`;
    document.querySelector(".file-name-info").textContent = fileNameAndSize;

    toBase64(FILE).then((AVATAR) => {
      setAvatar(AVATAR);
      setNewProfile((values) => ({ ...values, profile_avatar: AVATAR }));
    });
  };

  // HANDLE FORM INPUT CHANGE EVENT
  const handleFormInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setNewProfile((values) => ({ ...values, [name]: value }));
    validationInput(event);
  };

  const validationInput = (event) => {
    const { name, value } = event.target;
    setError((prev) => {
      const stateObj = { ...prev, [name]: "" };

      switch (name) {
        case "first_name":
          if (!value) {
            stateObj[name] = "First name  fieldrequired !";
          }
          break;
        case "last_name":
          if (!value) {
            stateObj[name] = "Last name field required !";
          }
          break;
        case "country":
          if (!value || value === "Select Country") {
            stateObj[name] = "Country field required !";
          }
          break;
        case "city":
          if (!value) {
            stateObj[name] = "City field required !";
          }
          break;
        case "local_address":
          if (!value) {
            stateObj[name] = "Address field required !";
          }
          break;
        case "zip_code":
          if (!value) {
            stateObj[name] = "Zip code field required !";
          }
          break;
        case "state":
          if (!value) {
            stateObj[name] = "State field required !";
          }
          break;
        case "primary_phone":
          if (!value) {
            stateObj[name] = "Primary phone field required !";
          }
          break;
        case "secondary_phone":
          if (!value) {
            stateObj[name] = "Secondary phone field required !";
          }
          break;
        case "email":
          if (!value) {
            stateObj[name] = "Email Address field required !";
          }
          break;
        case "tag_product":
          if (!value || value === "Select ID Tag Product") {
            stateObj[name] = "Tag Product field required !";
          }
          break;
        case "loster_fname":
          if (!value) {
            stateObj[name] = "first name field required !";
          }
          break;
        case "loster_lname":
          if (!value) {
            stateObj[name] = "last name field required !";
          }
          break;

        case "loster_gender":
          if (!value || value === "Select gender") {
            stateObj[name] = "Gender field required !";
          }
          break;
        case "loster_color":
          if (!value) {
            stateObj[name] = "Color field required !";
          }
          break;
        case "loster_age":
          if (!value) {
            stateObj[name] = "Age field required !";
          }
          break;
        case "loster_object_type":
          if (!value || value === "Select Object Type") {
            stateObj[name] = "Object Type field required !";
          }
          break;

        default:
          break;
      }
      if (!value && value === "") {
        setIsSafe(false);
      } else {
        setIsSafe(true);
      }
      //isInputValidationSafe();
      return stateObj;
    });
  };

  // HANDLE FORM SUBMMIT EVENT
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    // CHECK IF PROFILE OBJECT HAS VALID PROPERTIES
    if (newProfile && Object.keys(newProfile).length > 0) {
      try {
        await ProfilesTagsAPI.createNewProfileTag(
          newProfile,
          (err, PROFILE) => {
            if (err) {
              setAlertShow(false);
              setAlertContext(err);
              setIsLoading(false);
              return;
            }

            if (PROFILE.codeKey === 1) {
              // ALERT SUCCESS MESSAGE
              setAlertShow(true);
              setAlertContext(PROFILE.message);
              setIsLoading(false);
            } else {
              setAlertShow(false);
              setAlertContext(PROFILE.message);
              setIsLoading(false);
            }
          },
        );
      } catch (err) {
        setAlertShow(false);
        setAlertContext(err);
        setIsLoading(false);
      }
    } else {
      setAlertShow(false);
      setAlertContext("Profile payload got empty !");
    }
  };

  return (
    <div className="container mt-3">
      <div className="dash_tags_creation_container">
        <h2 className="dash_section_label">New ID Tag Profile</h2>
        <div className="row mt-4 w-100">
          <div className="col-md-7 col-7 col-sm-12">
            <div className="dash_left_panel_form">
              <form className="owner_info_form">
                <span className="dash_form_label">
                  # Basic Owner Infomation
                </span>
                {/*--- OWNER INFO AREA ---*/}
                <div className="form-row">
                  <div className="form-group col-md-6 col-sm-6 col-6">
                    <input
                      type="text"
                      className={`form-control owner_form_input ${
                        error.first_name ? "is-invalid" : ""
                      }`}
                      name="first_name"
                      onChange={handleFormInputChange}
                      value={newProfile.first_name}
                      placeholder="First Name"
                      onBlur={validationInput}
                      aria-describedby="field1"
                    ></input>
                    {error.first_name && (
                      <div id="field1" className="invalid-feedback">
                        {error.first_name}
                        <i className="bx bxs-error-circle"></i>
                      </div>
                    )}
                  </div>
                  <div className="form-group col-md-6 col-sm-6 col-6">
                    <input
                      type="text"
                      className={`form-control owner_form_input ${
                        error.last_name ? "is-invalid" : ""
                      }`}
                      name="last_name"
                      onChange={handleFormInputChange}
                      value={newProfile.last_name}
                      placeholder="Last Name"
                      onBlur={validationInput}
                      aria-describedby="field2"
                    ></input>
                    {error.last_name && (
                      <div id="field2" className="invalid-feedback">
                        {error.last_name}
                        <i className="bx bxs-error-circle"></i>
                      </div>
                    )}
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6 col-6 col-sm-6">
                    <select
                      name="country"
                      onChange={handleFormInputChange}
                      className={`form-select  mr-sm-2 ${
                        error.country ? "is-invalid" : ""
                      }`}
                      onBlur={validationInput}
                      aria-describedby="field3"
                    >
                      <option selected>Select Country</option>
                      {allCountries.sort().map((country, index) => {
                        return (
                          <>
                            <option key={index} value={country}>
                              {country}
                            </option>
                          </>
                        );
                      })}
                    </select>
                    {error.country && (
                      <div id="field3" className="invalid-feedback">
                        {error.country}
                        <i className="bx bxs-error-circle"></i>
                      </div>
                    )}
                  </div>
                  <div className="form-group col-md-6 col-6 col-sm-6">
                    <input
                      type="text"
                      className={`form-control owner_form_input ${
                        error.city ? "is-invalid" : ""
                      }`}
                      name="city"
                      onChange={handleFormInputChange}
                      value={newProfile.city}
                      placeholder="Enter your city"
                      onBlur={validationInput}
                      aria-describedby="field4"
                    ></input>
                    {error.city && (
                      <div id="field4" className="invalid-feedback">
                        {error.city}
                        <i className="bx bxs-error-circle"></i>
                      </div>
                    )}
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-12 col-12 col-sm-12">
                    <input
                      type="text"
                      className={`form-control owner_form_input ${
                        error.local_address ? "is-invalid" : ""
                      }`}
                      name="local_address"
                      onChange={handleFormInputChange}
                      value={newProfile.local_address}
                      placeholder="Enter Your local Address"
                      onBlur={validationInput}
                      aria-describedby="field5"
                    ></input>
                    {error.local_address && (
                      <div id="field5" className="invalid-feedback">
                        {error.local_address}
                        <i className="bx bxs-error-circle"></i>
                      </div>
                    )}
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-sm-6 col-sm-6 col-6">
                    <input
                      type="text"
                      className={`form-control owner_form_input ${
                        error.zip_code ? "is-invalid" : ""
                      }`}
                      name="zip_code"
                      onChange={handleFormInputChange}
                      value={newProfile.zip_code}
                      placeholder="Zip Code"
                      onBlur={validationInput}
                      aria-describedby="field5"
                    ></input>
                    {error.zip_code && (
                      <div id="field5" className="invalid-feedback">
                        {error.zip_code}
                        <i className="bx bxs-error-circle"></i>
                      </div>
                    )}
                  </div>
                  <div className="form-group col-sm-6 col-sm-6 col-6">
                    <input
                      type="text"
                      className={`form-control owner_form_input ${
                        error.state ? "is-invalid" : ""
                      }`}
                      name="state"
                      onChange={handleFormInputChange}
                      value={newProfile.state}
                      placeholder="State / Province"
                      onBlur={validationInput}
                      aria-describedby="field6"
                    ></input>
                    {error.state && (
                      <div id="field6" className="invalid-feedback">
                        {error.state}
                        <i className="bx bxs-error-circle"></i>
                      </div>
                    )}
                  </div>
                </div>
                {/*--- OWNER CONTACT AREA  ---*/}
                <span className="dash_form_label"># Owner Contact</span>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <input
                      type="text"
                      className={`form-control owner_form_input ${
                        error.primary_phone ? "is-invalid" : ""
                      }`}
                      name="primary_phone"
                      onChange={handleFormInputChange}
                      value={newProfile.primary_phone}
                      placeholder="Enter Your Primary Number"
                      onBlur={validationInput}
                      aria-describedby="field7"
                    ></input>
                    {error.primary_phone && (
                      <div id="field7" className="invalid-feedback">
                        {error.primary_phone}
                        <i className="bx bxs-error-circle"></i>
                      </div>
                    )}
                  </div>
                  <div className="form-group col-md-6">
                    <input
                      type="text"
                      className={`form-control owner_form_input ${
                        error.secondary_phone ? "is-invalid" : ""
                      }`}
                      name="secondary_phone"
                      onChange={handleFormInputChange}
                      value={newProfile.secondary_phone}
                      placeholder="Enter Your Secondary Number"
                      onBlur={validationInput}
                      aria-describedby="field8"
                    ></input>
                    {error.secondary_phone && (
                      <div id="field8" className="invalid-feedback">
                        {error.secondary_phone}
                        <i className="bx bxs-error-circle"></i>
                      </div>
                    )}
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-12 col-sm-12 col-12">
                    <input
                      type="text"
                      className={`form-control owner_form_input ${
                        error.email ? "is-invalid" : ""
                      }`}
                      name="email"
                      onChange={handleFormInputChange}
                      value={newProfile.email}
                      placeholder="Enter Your Email address"
                      onBlur={validationInput}
                      aria-describedby="field9"
                    ></input>
                    {error.email && (
                      <div id="field9" className="invalid-feedback">
                        {error.email}
                        <i className="bx bxs-error-circle"></i>
                      </div>
                    )}
                  </div>
                </div>
                {/*--- QR CODE ID TAG PRODUCTS LIST AREA  ---*/}
                <span className="dash_form_label">#ID Tags Products</span>
                <div className="form-row">
                  <div className="form-group col-md-12 col-12 col-sm-12">
                    <select
                      onChange={handleFormInputChange}
                      name="tag_product"
                      value={newProfile.tag_product}
                      required
                      className={`form-select mr-sm-2 ${
                        error.tag_product ? "is-invalid" : ""
                      }`}
                      onBlur={validationInput}
                      aria-describedby="field10"
                    >
                      <option selected>Select ID Tag Product</option>
                      <option value="Braclets">Braclets (humains)</option>
                      <option value="Necklace">Necklace (Pets)</option>
                    </select>
                    {error.tag_product && (
                      <div id="field10" className="invalid-feedback">
                        {error.tag_product}
                        <i className="bx bxs-error-circle"></i>
                      </div>
                    )}
                    <div className="hint-alert-wrap">
                      <Alert severity="info">
                        <AlertTitle>Note</AlertTitle>
                        for each product has the same price , the standard price
                        = $24.99 (249 Dhs)
                      </Alert>
                    </div>
                    {/*---<button className="form-shop-btn-redirect">
                      <i class="bx bx-shopping-bag"></i> Shop Now
                        </button>---*/}
                  </div>
                </div>
              </form>
              <div className="form_create_btn_wrapper">
                <button
                  className="create-btn"
                  onClick={handleFormSubmit}
                  type="button"
                  style={{
                    cursor: isSafe ? "pointer" : "not-allowed",
                    opacity: isSafe ? "1" : "0.4",
                  }}
                  disabled={isSafe ? false : true}
                >
                  {isLoading ? "Please Wait..." : "Create Now"}
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-5 col-5 col-sm-12">
            <div className="dash_right_panel_form">
              <div className="loster_profile_avtr_wrapper">
                <img
                  src={avatar || HumainAvatar}
                  alt="Loster Profile Avatar - Lgani service"
                />
              </div>
              {/*--- LOSTER (PET / HUMAIN) INFO FORM ---*/}
              <form className="loster_info_form">
                <div className="form-row mb-5">
                  <div className="form-group col-sm-1é col-sm-12 col-12">
                    <div class="file-input">
                      <input
                        type="file"
                        className="file loster_form_input"
                        id="file"
                        onChange={handleAvatarChange}
                        name="profile_avatar"
                        required
                        placeholder="Upload Loster Profile Avatar"
                      ></input>
                      <label for="file">
                        <i class="bx bx-cloud-upload"></i> Profile Avatar
                      </label>
                      <p class="file-name-info"></p>
                    </div>
                  </div>
                </div>
                {/*--- LOSTER INFO AREA  ---*/}
                <span className="dash_form_label"># Loster Information</span>
                <div className="form-row">
                  <div className="form-group col-md-6 col-sm-6 col-6">
                    <input
                      type="text"
                      className={`form-control loster_form_input ${
                        error.loster_fname ? "is-invalid" : ""
                      }`}
                      name="loster_fname"
                      required
                      onChange={handleFormInputChange}
                      value={newProfile.loster_fname}
                      placeholder="First Name"
                      onBlur={validationInput}
                      aria-describedby="field11"
                    ></input>
                    {error.loster_fname && (
                      <div id="field11" className="invalid-feedback">
                        {error.loster_fname}
                        <i className="bx bxs-error-circle"></i>
                      </div>
                    )}
                  </div>
                  <div className="form-group col-md-6 col-sm-6 col-6">
                    <input
                      type="text"
                      className={`form-control loster_form_input ${
                        error.loster_lname ? "is-invalid" : ""
                      }`}
                      name="loster_lname"
                      onChange={handleFormInputChange}
                      value={newProfile.loster_lname}
                      placeholder="Last Name"
                      onBlur={validationInput}
                      aria-describedby="field12"
                    ></input>
                    {error.loster_lname && (
                      <div id="field12" className="invalid-feedback">
                        {error.loster_lname}
                        <i className="bx bxs-error-circle"></i>
                      </div>
                    )}
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6 col-sm-6 col-6">
                    <select
                      name="loster_gender"
                      onChange={handleFormInputChange}
                      className={`form-select mr-sm-2 ${
                        error.loster_gender ? "is-invalid" : ""
                      }`}
                      onBlur={validationInput}
                      aria-describedby="field13"
                    >
                      <option selected>Select gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                    {error.loster_gender && (
                      <div id="field13" className="invalid-feedback">
                        {error.loster_gender}
                        <i className="bx bxs-error-circle"></i>
                      </div>
                    )}
                  </div>
                  <div className="form-group col-md-6 col-sm-6 col-6">
                    <input
                      type="number"
                      name="loster_age"
                      onChange={handleFormInputChange}
                      value={newProfile.loster_age}
                      placeholder="Enter Age"
                      className={`form-control loster_form_input ${
                        error.loster_age ? "is-invalid" : ""
                      }`}
                      onBlur={validationInput}
                      aria-describedby="field14"
                    ></input>
                    {error.loster_age && (
                      <div id="field14" className="invalid-feedback">
                        {error.loster_age}
                        <i className="bx bxs-error-circle"></i>
                      </div>
                    )}
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6 col-sm-6 col-6">
                    <input
                      type="text"
                      name="loster_color"
                      onChange={handleFormInputChange}
                      value={newProfile.loster_color}
                      placeholder="Body Color"
                      className={`form-control loster_form_input ${
                        error.loster_color ? "is-invalid" : ""
                      }`}
                      onBlur={validationInput}
                      aria-describedby="field15"
                    ></input>
                    {error.loster_color && (
                      <div id="field15" className="invalid-feedback">
                        {error.loster_color}
                        <i className="bx bxs-error-circle"></i>
                      </div>
                    )}
                  </div>
                  <div className="form-group col-md-6 col-sm-6 col-6">
                    <select
                      name="loster_object_type"
                      onChange={handleFormInputChange}
                      value={newProfile.loster_object_type}
                      required
                      className={`form-select mr-sm-2 ${
                        error.loster_object_type ? "is-invalid" : ""
                      }`}
                      onBlur={validationInput}
                      aria-describedby="field16"
                    >
                      <option selected>Select Object Type</option>
                      <option value="Pet">Pets</option>
                      <option value="Humain">Humain</option>
                    </select>
                    {error.loster_object_type && (
                      <div id="field16" className="invalid-feedback">
                        {error.loster_object_type}
                        <i className="bx bxs-error-circle"></i>
                      </div>
                    )}
                  </div>
                </div>
                {/*--- LOSTER GPS NOTIFICATION AREA  ---*/}
                <span className="dash_form_label">
                  # GPS Notification Setting
                </span>
                {/*--- ENABLE / DISBALE PRIVACY CONTROL  ---*/}
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={isGPSEnabled}
                        color="warning"
                        onChange={handleSignupSwitch}
                      />
                    }
                    label="Disbale / Enable"
                  />
                </FormGroup>
                {isGPSEnabled ? (
                  <div className="privacy_hint_alert">
                    <Alert severity="warning">
                      <AlertTitle>Note</AlertTitle>
                      When the visitor hits your profile , and accept sharing
                      geo-localization , we will automatically notify you with
                      coordinates via your e-mail address
                    </Alert>
                  </div>
                ) : null}
              </form>
            </div>
          </div>
        </div>
      </div>
      {/*--- FIXED ALERT BOX ---*/}
      {alertShow ? (
        <div className="fixed_alert_box">
          <Alert
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setAlertShow(null);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            severity="success"
          >
            <AlertTitle>Operation Sucsess</AlertTitle>
            {alertContext}
          </Alert>
        </div>
      ) : alertShow === false ? (
        <div className="fixed_alert_box">
          <Alert
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setAlertShow(null);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            severity="error"
          >
            <AlertTitle>Operation Failed</AlertTitle>
            {alertContext}
          </Alert>
        </div>
      ) : null}
    </div>
  );
}

export default CreateIDTag;
