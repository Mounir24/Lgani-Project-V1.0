import React, { useState, useEffect, useContext } from "react";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { UserAuthContext } from "../Context/UserAuthContext";
import axios from "axios";

// IMPORT APIs CLASSES
import AuthAPI from "../Apis/auth.api";

function Profile() {
  // STATE MANAGEMENT
  const [avatar, setAvatar] = useState("");
  const [profile, setProfile] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);
  const [alertContext, setAlertContext] = useState("");
  const [allCountries, setAllCountries] = useState([]);

  // GLOBAL STATE MANAGEMENT
  const { user, dispatch } = useContext(UserAuthContext);

  useEffect(() => {
    // SET PAGE TITLE
    document.title = `Ajidq || ${user.full_name}'s profile`;
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
            setIsError(false);
            setAlertContext("Countries API failed to operate :(");
          }
        });
      } catch (err) {
        console.error(err);
      }
    };
    getCountries();
  }, [allCountries]);

  // HANDLE PROFILE CHANGE  EVENT
  const handleProfileUpdate = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    // UPDATE PROFILE OBJECT
    setProfile((values) => ({ ...values, [name]: value }));
  };

  // HANDLE PROFILE PROFILE SUBMIT (UPDATE) EVENT
  const updateProfileForm = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      await AuthAPI.updateClientProfile(profile, user._id, (err, CLIENT) => {
        if (err) {
          alert(err.message);
          console.log(err);
          setIsError(false);
          setAlertContext(err.message);
          return;
        }

        switch (CLIENT.codeKey) {
          case 0:
            setIsError(true);
            setAlertContext(CLIENT.message);
            break;
          case 1:
            //UPDATE CLIENT GLOBAL STATE MANAGEMENT
            console.log(CLIENT);
            dispatch({ type: "PROFILE_UPDATE", profile: CLIENT.payload });
            // SET AN ALERT
            setIsError(true);
            setAlertContext("Profile successfully updated");
            break;
          default:
            break;
        }
      });
    } catch (err) {
      setIsError(false);
      setAlertContext(err.message);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

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
      setProfile((values) => ({ ...values, profile_avatar: AVATAR }));
    });
  };

  return (
    <div className="container mt-3">
      <div className="dash_profile_container">
        <h2 className="dash_section_label">My Profile</h2>
        <div className="row w-100">
          {/*--- PROFILE LEFT SIDE ---*/}
          <div className="col-md-7 col-sm-12 col-7">
            <div className="dash_profile_left_panel">
              <form className="dash_profile_form_top">
                <span className="profile_form_label">General Information</span>
                <div className="form-row">
                  <div className="form-group col-md-6 col-sm-6 col-6">
                    <input
                      type="text"
                      className="form-control profile_form_input"
                      name="first_name"
                      onChange={handleProfileUpdate}
                      value={profile.first_name || user.first_name}
                      placeholder="Enter your first name"
                    ></input>
                  </div>
                  <div className="form-group col-md-6 col-sm-6 col-6">
                    <input
                      type="text"
                      className="form-control profile_form_input"
                      name="last_name"
                      onChange={handleProfileUpdate}
                      value={profile.last_name || user.last_name}
                      placeholder="Enter your last name"
                    ></input>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6 col-sm-6 col-6">
                    <input
                      type="text"
                      className="form-control profile_form_input"
                      name="primary_phone"
                      onChange={handleProfileUpdate}
                      value={profile.primary_phone || user.phone.primary}
                      placeholder="Enter your phone"
                    ></input>
                  </div>
                  <div className="form-group col-md-6 col-6 col-sm-6">
                    <select
                      name="gender"
                      onChange={handleProfileUpdate}
                      value={profile.gender || user.gender}
                      className="form-select mr-sm-2"
                    >
                      <option selected>Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-12 col-sm-12 col-12">
                    <input
                      type="text"
                      className="form-control profile_form_input"
                      name="email"
                      onChange={handleProfileUpdate}
                      value={profile.email || user.email}
                      style={{ cursor: "not-allowed" }}
                      disabled
                      placeholder="Enter your e-mail address"
                    ></input>
                  </div>
                </div>
              </form>
              <form className="dash_profile_form_bottom">
                <span className="profile_form_label">Address </span>
                <div className="form-row">
                  <div className="form-group col-md-8 col-sm-12 col-8">
                    <input
                      type="text"
                      className="form-control profile_form_input"
                      name="local_address"
                      onChange={handleProfileUpdate}
                      value={
                        profile.local_address || user.geo_location.local_address
                      }
                      placeholder="Enter your address / location"
                    ></input>
                  </div>
                  <div className="form-group col-md-4 col-4 col-sm-12">
                    <select
                      name="country"
                      onChange={handleProfileUpdate}
                      value={profile.country || user.geo_location.country}
                      className="form-select mr-sm-2"
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
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-4 col-sm-12 col-4">
                    <input
                      type="text"
                      className="form-control profile_form_input"
                      name="city"
                      onChange={handleProfileUpdate}
                      value={profile.city || user.geo_location.city}
                      placeholder="Enter your city"
                    ></input>
                  </div>
                  <div className="form-group col-md-4 col-sm-12 col-4">
                    <input
                      type="text"
                      className="form-control profile_form_input"
                      name="state"
                      onChange={handleProfileUpdate}
                      value={profile.state || user.geo_location.state}
                      placeholder="State / Province"
                    ></input>
                  </div>
                  <div className="form-group col-md-4 col-sm-12 col-4">
                    <input
                      type="text"
                      className="form-control profile_form_input"
                      name="zip_code"
                      onChange={handleProfileUpdate}
                      value={profile.zip_code || user.geo_location.zip_code}
                      placeholder="Zip Code"
                    ></input>
                  </div>
                </div>
              </form>
              <div className="form_dash_btn_wrapper">
                <button
                  onClick={updateProfileForm}
                  type="button"
                  className="dash_profile-save-btn"
                >
                  {isLoading ? "Saving..." : "Save"}
                </button>
              </div>
            </div>
          </div>
          {/*--- PROFILE RIGHT SIDE ---*/}
          <div className="col-md-5 col-sm-12 col-5">
            <div className="dash_profile_right_panel">
              <div className="profile_info_display_wrapper">
                <div className="client_profile_avtr_wrapper">
                  <img
                    src={avatar ? avatar : user.profile_avatar}
                    alt="Client Profile"
                  />
                </div>
                <div className="client_profile_content_box">
                  <h4 className="profile_client_fname">{user.full_name}</h4>
                  <span className="profile_client_country">
                    {user.geo_location.country} / {user.geo_location.city}
                  </span>
                </div>
                {/*--- FILE PROFILE UPLAOD INPUT  ---*/}
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
          </div>
        </div>
      </div>
      {/*--- FIXED ALERT BOX ---*/}
      {isError ? (
        <div className="fixed_alert_box">
          <Alert
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setIsError(null);
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
      ) : isError === false ? (
        <div className="fixed_alert_box">
          <Alert
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setIsError(null);
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

export default Profile;
