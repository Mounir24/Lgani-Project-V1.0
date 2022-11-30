import React, { useState, useEffect } from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Switch from "@mui/material/Switch";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import axios from "axios";

// IMPORT ASSETS
import HumainAvatar from "../Assets/SVG/user-avatar.png";
//import PetsAvatar from "../Assets/SVG/pets-avatar.png";

function CreateIDTag() {
  // STATE MANAGEMENT
  const [isGPSEnabled, setIsGPSEnabled] = useState(false);
  const [avatar, setAvatar] = useState("");
  const [allCountries, setAllCountries] = useState([]);

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
  }, []);

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
    });
  };

  return (
    <div className="container mt-3">
      <div className="dash_tags_creation_container">
        <h2 className="dash_section_label">New ID Tag Qr Code</h2>
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
                      className="form-control owner_form_input"
                      name="f_name"
                      placeholder="First Name"
                    ></input>
                  </div>
                  <div className="form-group col-md-6 col-sm-6 col-6">
                    <input
                      type="text"
                      className="form-control owner_form_input"
                      name="l_name"
                      placeholder="Last Name"
                    ></input>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6 col-6 col-sm-6">
                    <select name="country" className="form-select mr-sm-2">
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
                  </div>
                  <div className="form-group col-md-6 col-6 col-sm-6">
                    <input
                      type="text"
                      className="form-control owner_form_input"
                      name="city"
                      placeholder="Enter your city"
                    ></input>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-12 col-12 col-sm-12">
                    <input
                      type="text"
                      className="form-control owner_form_input"
                      name="owner_address"
                      placeholder="Enter Your local Address"
                    ></input>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-sm-6 col-sm-6 col-6">
                    <input
                      type="text"
                      className="form-control owner_form_input"
                      name="zip_code"
                      placeholder="Zip Code"
                    ></input>
                  </div>
                  <div className="form-group col-sm-6 col-sm-6 col-6">
                    <input
                      type="text"
                      className="form-control owner_form_input"
                      name="state"
                      placeholder="State / Province"
                    ></input>
                  </div>
                </div>
                {/*--- OWNER CONTACT AREA  ---*/}
                <span className="dash_form_label"># Owner Contact</span>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <input
                      type="text"
                      className="form-control owner_form_input"
                      name="contact_primary_number"
                      placeholder="Enter Your Primary Number"
                    ></input>
                  </div>
                  <div className="form-group col-md-6">
                    <input
                      type="text"
                      className="form-control owner_form_input"
                      name="contact_second_number"
                      placeholder="Enter Your Secondary Number"
                    ></input>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-12 col-sm-12 col-12">
                    <input
                      type="text"
                      className="form-control owner_form_input"
                      name="contact_email"
                      placeholder="Enter Your E-mail Address"
                    ></input>
                  </div>
                </div>
                {/*--- QR CODE ID TAG PRODUCTS LIST AREA  ---*/}
                <span className="dash_form_label">#ID Tags Products</span>
                <div className="form-row">
                  <div className="form-group col-md-12 col-12 col-sm-12">
                    <select name="tag_product" className="form-select mr-sm-2">
                      <option selected>Select ID Tag Product</option>
                      <option value="Pets">Pets</option>
                      <option value="Humains">Humains</option>
                    </select>
                    <div className="hint-alert-wrap">
                      <Alert severity="info">
                        <AlertTitle>Note</AlertTitle>
                        When you select the Product type , you will redirect to
                        our shop store to order your product, and then make sure
                        to order it with same info: (e-mail - address - Phone
                        Number) to complete your order as soon as possible
                      </Alert>
                    </div>
                    <button className="form-shop-btn-redirect">
                      <i class="bx bx-shopping-bag"></i> Shop Now
                    </button>
                  </div>
                </div>
              </form>
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
                      className="form-control loster_form_input"
                      name="loster_fname"
                      placeholder="First Name"
                    ></input>
                  </div>
                  <div className="form-group col-md-6 col-sm-6 col-6">
                    <input
                      type="text"
                      className="form-control loster_form_input"
                      name="loster_lname"
                      placeholder="Last Name"
                    ></input>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6 col-sm-6 col-6">
                    <select
                      name="loster_gender"
                      className="form-select mr-sm-2"
                    >
                      <option selected>Select gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                  <div className="form-group col-md-6 col-sm-6 col-6">
                    <input
                      type="number"
                      className="form-control loster_form_input"
                      name="loster_age"
                      placeholder="Enter Age"
                    ></input>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6 col-sm-6 col-6">
                    <input
                      type="text"
                      className="form-control loster_form_input"
                      name="loster_color"
                      placeholder="Body Color"
                    ></input>
                  </div>
                  <div className="form-group col-md-6 col-sm-6 col-6">
                    <select
                      name="loster_object_type"
                      className="form-select mr-sm-2"
                    >
                      <option selected>Select Object Type</option>
                      <option value="Pet">Pets</option>
                      <option value="Humain">Humain</option>
                    </select>
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
                <div className="form_create_btn_wrapper">
                  <button className="create-btn">Create Now</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateIDTag;
