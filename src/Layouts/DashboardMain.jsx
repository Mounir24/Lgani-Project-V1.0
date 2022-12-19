import React, { useState, useContext, useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import axios from "axios";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Switch from "@mui/material/Switch";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { UserAuthContext } from "../Context/UserAuthContext";

// ASSETS
import HumainAvatar from "../Assets/SVG/user-avatar.png";

/*--- IMPORT HELPER / UTILS ---*/
import StatisticsAPI from "../Apis/statistics.api";
import ProfilesTagsAPI from "../Apis/tags.api";

function DashboardMain() {
  // STATE MANAGEMENT
  const [location, setLocation] = useState({});
  const [ip, setIp] = useState("");
  const [popupUpdate, setPopupUpdate] = useState(false);
  const [qrTagID, setQrTagID] = useState();
  const [isGPSEnabled, setIsGPSEnabled] = useState(false);
  const [avatar, setAvatar] = useState("");
  const [metrics, setMetrics] = useState({});
  const [profiles, setProfiles] = useState([]);
  const [topVisits, setTopVisits] = useState([]);
  const [profileInfo, setProfileInfo] = useState({});
  const [updateProfile, setUpdateProfile] = useState({});
  const [alertShow, setAlertShow] = useState(null);
  const [alertContext, setAlertContext] = useState(null);
  const [openAlert, setOpenAlert] = useState(null);

  const { user, dispatch } = useContext(UserAuthContext);

  // HANDLE POPUP UPDATE (OPEN & CLOSE) MODAL
  const handlePopupUpdate = (e) => {
    //alert("QR TAG ID: " + e.target.value);
    setPopupUpdate(!popupUpdate);
    setQrTagID(e.target.value);
    getQrTagInfo(e.target.value);
  };

  // FETCH HTTP DATA ONCOMPONENT LOAD
  useEffect(() => {
    const getClientMetrics = async () => {
      try {
        await StatisticsAPI.getDashboardStatistics(
          user._id,
          (err, Client_Metrics) => {
            if (err) {
              alert(err);
              return;
            }

            /*if (Client_Metrics) {
              // APPEND METRICS OBJECT
              setMetrics({
                total_profiles: Client_Metrics["total_profiles"],
                total_visits: Client_Metrics["total_visits"],
                last_ip_visit: Client_Metrics["last_ip_visit"],
              });
              setTopVisits(Client_Metrics.top_countries);
              console.log("---- top countries ----");
              console.log(Client_Metrics.top_countries);
            }*/

            switch (Client_Metrics.codeKey) {
              case 0:
                alert(Client_Metrics.message);
                break;
              case 1:
                // APPEND METRICS OBJECT
                // APPEND METRICS OBJECT
                setMetrics({
                  total_profiles: Client_Metrics["total_profiles"],
                  total_visits: Client_Metrics["total_visits"],
                  last_ip_visit: Client_Metrics["last_ip_visit"],
                });
                setTopVisits(Client_Metrics.top_countries);
                break;
              default:
                return null;
            }
          },
        );
      } catch (err) {
        alert(err);
        console.error(err);
      }
    };
    const getClientProfiles = async () => {
      try {
        await StatisticsAPI.getAllProfileTags(user._id, (err, PROFILES) => {
          if (err) {
            alert(err);
            return;
          }

          switch (PROFILES.codeKey) {
            case 0:
              alert(PROFILES.message);
              break;
            case 1:
              if (PROFILES.profiles_tags.length > 0) {
                setProfiles(PROFILES.profiles_tags);
              } else {
                setProfiles([]);
              }
              break;
            default:
              return null;
          }
        });
      } catch (err) {
        console.error(err);
      }
    };
    getClientMetrics();
    getClientProfiles();
  }, []);

  // RETRIVE QR TAG INFORMATION
  const getQrTagInfo = async (ID_TAG) => {
    const getQrTagInfo = async (ID_TAG) => {
      // API HTTP CALL : GET QR TAG INFORMATION
      try {
        await ProfilesTagsAPI.showProfileInfo(ID_TAG, (err, PAYLOAD) => {
          if (err) {
            alert(err);
            return;
          }

          console.log(PAYLOAD);

          switch (PAYLOAD.codeKey) {
            case 0:
              alert(PAYLOAD.message);
              break;
            case 1:
              setProfileInfo(PAYLOAD.profile_data);
              break;
            default:
              return null;
          }
        });
      } catch (err) {
        alert(err.message);
        console.error(err.message);
      }
    };

    // HANDLE  UPDATE FORM INPUT
    const handleInputChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;

      setUpdateProfile((values) => ({ ...values, [name]: value }));
    };

    // HANDLE SIGNUP PASSWORD SWITCH INPUT
    /*const handleSignupSwitch = (event) => {
    if (event.target.checked) {
      setIsGPSEnabled(true);
    } else {
      setIsGPSEnabled(false);
    }
  };*/

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
        // APPEND PROFILE AVATAR
        setUpdateProfile((values) => ({ ...values, profile_avatar: AVATAR }));
        // APPEND PROFILE AVATAR
        setUpdateProfile((values) => ({ ...values, profile_avatar: AVATAR }));
      });
    };

    // HANDLE UPDATE FORM SUBMIT
    const handleUpdateSubmit = async (event) => {
      event.preventDefault();
      // CHECK IF UPDATE PROFILE HAS PROPERTIES
      if (Object.keys(updateProfile).length > 0) {
        try {
          await ProfilesTagsAPI.updateProfileTag(
            profileInfo._id,
            updateProfile,
            (err, PROFILE) => {
              if (err) {
                alert(err);
                console.error(err);
                return;
              }

              if (PROFILE.isProfileUpdated) {
                // ALERT SUCCESS MESSAGE
                setAlertShow(true);
                setAlertContext("Profile Tag Successfully Updated !");
              } else {
                setAlertShow(false);
                setAlertContext("Profile Tag Update Operation Failed:(");
              }
            },
          );
        } catch (err) {
          alert(err);
          console.error(err);
        }
      } else {
        alert("Profile properties got empty :(");
      }
    };

    // IP LOCATION FUNCTION HANDLER
    const handleLocationSearch = async () => {
      try {
        await axios
          .get(
            `${process.env.REACT_APP_IP_API_URL}api/${ip}?access_key=${process.env.REACT_APP_IP_KEY}`,
          )
          .then(({ data }) => {
            console.log(data);
            setLocation(data);
          })
          .catch((err) => {
            console.error(err);
          });
      } catch (err) {
        alert(err.message);
      }
    };

    // HANDLE IP ADDRESS INPUT CHANGE
    const handleIpAddressChange = (event) => {
      const value = event.target.value;
      setIp(value.trim());
    };

    // HANDLE REMOVE PROFILE TAG
    const handleRemoveProfile = async (event) => {
      const profileId = event.target.value;

      // PROMPTE A CONFIRM POPUP
      const isConfirm = window.confirm(`Are you sure ?`);
      if (!isConfirm) {
        setOpenAlert(false);
        setAlertContext("Operation Aborted !");
        return;
      }

      try {
        await ProfilesTagsAPI.removeProfileTag(profileId, (err, PROFILE) => {
          if (err) {
            alert(err);
            console.log(err);
            return;
          }

          switch (PROFILE.codeKey) {
            case 0:
              setOpenAlert(true);
              setAlertContext(PROFILE.message);
              break;
            case 1:
              setOpenAlert(true);
              setAlertContext(PROFILE.message);
              break;
            default:
              return null;
          }
        });
      } catch (err) {
        alert(err.message);
        console.error(err);
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

    const greeting = () => {
      const date = new Date();
      const hours = date.getHours();

      let message;

      if (hours < 12) {
        message = "Good Morning";
      } else if (hours < 18) {
        message = "Good Afternoon";
      } else {
        message = "Good Evening";
      }

      return message;
    };

    /*const RenderVisitRow = (row) => {
    
  };*/

    return (
      <div className="container w-100">
        <div className="dashboard-containter">
          <h3 className="dash_greeting-alert">
            {greeting()}, <br />{" "}
            <span className="client-username">
              {user.gender !== null ? user.gender : null} {user.full_name}
            </span>
            {greeting()}, <br />{" "}
            <span className="client-username">
              {user.gender !== null ? user.gender : null} {user.full_name}
            </span>
          </h3>

          {/*--- DASH STATISTICS AREA ---*/}
          <section className="dash_statistics_section">
            <div className="row w-100 mt-4">
              <div className="col-4 col-md-4 col-sm-12">
                <div className="dash_statis_box">
                  <div className="statis_icon_wrapper">
                    <i class="bx bx-show"></i>
                  </div>
                  <div className="statis_data_wrapper">
                    <span className="statis_data">
                      {metrics.total_visits ? metrics.total_visits : "0"}
                    </span>
                    <span className="statis_data">
                      {metrics.total_visits ? metrics.total_visits : "0"}
                    </span>
                    <span className="statis_label">Total Visits</span>
                  </div>
                </div>
              </div>
              <div className="col-4 col-md-4 col-sm-12">
                <div className="dash_statis_box">
                  <div className="statis_icon_wrapper">
                    <i class="bx bx-qr-scan"></i>
                  </div>
                  <div className="statis_data_wrapper">
                    <span className="statis_data">
                      {metrics.total_profiles ? metrics.total_profiles : "0"}
                    </span>
                    <span className="statis_data">
                      {metrics.total_profiles ? metrics.total_profiles : "0"}
                    </span>
                    <span className="statis_label">Total ID Tags</span>
                  </div>
                </div>
              </div>
              <div className="col-4 col-md-4 col-sm-12">
                <div className="dash_statis_box">
                  <div className="statis_icon_wrapper">
                    <i class="bx bx-trip"></i>
                  </div>
                  <div className="statis_data_wrapper">
                    <span className="statis_data">
                      {metrics.last_ip_visit !== "0.0.0.0"
                        ? metrics.last_ip_visit
                        : "No record"}
                    </span>
                    <span className="statis_data">
                      {metrics.last_ip_visit !== "0.0.0.0"
                        ? metrics.last_ip_visit
                        : "No record"}
                    </span>
                    <span className="statis_label">Last Visit IP</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/*--- TOP 20 VISITED COUNTRIES LIST SECTION ---*/}
          <section className="dash_countries_visited_section">
            <h3 className="dash_section_label">#Last visits by deomographic</h3>
            <div className="row w-100 mt-4">
              <div className="col-md-6 col-sm-12 col-6">
                <div className="dash_countries_list">
                  {topVisits.length > 0 ? (
                    <List
                      sx={{
                        width: "100%",
                        maxWidth: "100%",
                        bgcolor: "background.paper",
                        position: "relative",
                        overflow: "auto",
                        maxHeight: 300,
                      }}
                    >
                      {topVisits.map((visit, index) => {
                        return (
                          <ListItem key={index}>
                            <ListItemAvatar>
                              <Avatar
                                alt={`${visit.country} / ${visit.city}`}
                                src={visit.country}
                              />
                            </ListItemAvatar>
                            <ListItemText
                              style={{
                                fontFamily: "Montserrat, sans-serif",
                                fontWeight: "500",
                                fontSize: "17px",
                              }}
                              primary={`${visit.country} / ${visit.city}`}
                              secondary={visit.visit_ip}
                            />
                          </ListItem>
                        );
                      })}
                    </List>
                  ) : (
                    <h3 className="block_alert">No Record Found</h3>
                  )}
                  {topVisits.length > 0 ? (
                    <List
                      sx={{
                        width: "100%",
                        maxWidth: "100%",
                        bgcolor: "background.paper",
                        position: "relative",
                        overflow: "auto",
                        maxHeight: 300,
                      }}
                    >
                      {topVisits.map((visit, index) => {
                        return (
                          <ListItem key={index}>
                            <ListItemAvatar>
                              <Avatar
                                alt={`${visit.country} / ${visit.city}`}
                                src={visit.country}
                              />
                            </ListItemAvatar>
                            <ListItemText
                              style={{
                                fontFamily: "Montserrat, sans-serif",
                                fontWeight: "500",
                                fontSize: "17px",
                              }}
                              primary={`${visit.country} / ${visit.city}`}
                              secondary={visit.visit_ip}
                            />
                          </ListItem>
                        );
                      })}
                    </List>
                  ) : (
                    <h3 className="block_alert">No Record Found</h3>
                  )}
                </div>
              </div>
              <div className="col-md-6 col-sm-12 col-6">
                <div className="dash_ip_locator_container">
                  <div className="ip_locator_box">
                    {/*--- IP LOCATOR SEARCH BAR ---*/}
                    <div className="ip_search_input_wrapper">
                      <input
                        type="text"
                        className="ip_locator_input"
                        name="ip_address"
                        onChange={handleIpAddressChange}
                        value={ip}
                        placeholder="ENTER IP ADDRESS LOCATION"
                      />
                      <button
                        className="ip_lcoator_search_btn"
                        onClick={handleLocationSearch}
                      >
                        <i class="bx bx-broadcast"></i>
                      </button>
                    </div>
                    {/*--- IP LOCATOR DATA DISPLAYER BOX ---*/}
                    <div className="ip_locator_displayer_box">
                      <div className="country_flag_location">
                        <img
                          src={
                            location.location !== undefined
                              ? location.location.country_flag
                              : null
                          }
                          alt="Flag Country"
                        />
                      </div>
                      <div className="displayer_content_wrapper">
                        <ul className="list-style p-0 m-0 mb-4">
                          <li className="item-list item-flex">
                            <span className="data_label">
                              <i class="bx bx-globe"></i> Country:
                            </span>
                            <span className="data_value">
                              {location.country_name
                                ? `${location.country_name} (${location.country_code})`
                                : "None"}
                            </span>
                          </li>
                          <li className="item-list item-flex">
                            <span className="data_label">
                              <i class="bx bx-wifi"></i> Zip Code:
                            </span>
                            <span className="data_value">
                              {location.zip ? `${location.zip}` : "None"}
                            </span>
                          </li>
                          <li className="item-list item-flex">
                            <span className="data_label">
                              <i class="bx bx-trip"></i> City, State:
                            </span>
                            <span className="data_value">
                              {location.city
                                ? `${location.city} (${location.region_name})`
                                : "None"}
                            </span>
                          </li>
                          <li className="item-list item-flex">
                            <span className="data_label">
                              <i class="bx bxs-map"></i> Lat, lng:
                            </span>
                            <span className="data_value">
                              {location.latitude
                                ? `${location.latitude} / ${location.longitude}`
                                : "None"}
                            </span>
                          </li>
                        </ul>
                        {/*--- CHECK MAPS BTN  ---*/}
                        {location.latitude && location.longitude ? (
                          <a
                            href={`https://www.google.com/maps/@${location.latitude},${location.longitude},12.98z`}
                            rel="noreferrer"
                            target="_blank"
                            className="maps-viewer-btn"
                          >
                            Check on Maps
                          </a>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/*--- QR CODE ID TAGS SECTION ---*/}
          <section className="dash_tags_cards_section">
            <h4 className="dash_section_label"># Last Qr Code ID Tags</h4>
            <div className="container">
              <div className="row w-100 mt-4">
                {profiles.length > 0
                  ? profiles.map((profile, index) => {
                      return (
                        <div
                          key={index}
                          className="col-md-4 col-sm-12 col-4 mb-3"
                        >
                          <div className="qrcode-tag-box-container">
                            <div className="qrcode-icon-wrapper-top">
                              <i class="bx bx-qr-scan"></i>
                            </div>
                            <div className="tag-box-header">
                              <img
                                src={profile.profile_avatar}
                                alt="Profile Avatar"
                              />
                            </div>
                            <div className="tag-box-body">
                              <h3 className="tag-consumer-name">
                                {profile.full_name}
                              </h3>
                              <span className="tag-consumer-id">
                                #{profile.tag_id}
                              </span>
                            </div>
                            <div className="tag-box-tail">
                              <button
                                className="tag-edit-btn"
                                value={profile._id}
                                onClick={(e) => handlePopupUpdate(e)}
                                type="button"
                              >
                                Edit
                              </button>
                              <button
                                className="tag-remove-btn"
                                value={profile._id}
                                onClick={handleRemoveProfile}
                                type="button"
                              >
                                remove
                              </button>
                            </div>
                            <div className="qrcode-icon-wrapper-bottom">
                              <i class="bx bx-qr-scan"></i>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  : null}
                <div className="col-md-4 col-sm-12 col-4 mb-3">
                  <div className="qrcode-create-new-box">
                    <div className="qrcode-icon-wrapper-top">
                      <i class="bx bx-qr-scan"></i>
                    </div>
                    <div className="box-content-wrapper">
                      <div className="box-icon-wrapper">
                        <Link to="/dashboard/create">
                          <i class="bx bxs-plus-circle"></i>
                        </Link>
                      </div>
                      <span className="box-create-qr-label">
                        Create New Qr ID tag
                      </span>
                    </div>
                    <div className="qrcode-icon-wrapper-bottom">
                      <i class="bx bx-qr-scan"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        {/*--- PROFILE TAG POPUP MODAL ---*/}
        {/*--- PROFILE TAG POPUP MODAL ---*/}
        <Modal
          open={popupUpdate}
          onClose={(e) => setPopupUpdate(false)}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
        >
          <Box sx={{ ...modalStyle, width: 550 }}>
            <section className="login_modal_container">
              {/*----<h3 className="modal_label">Qr Tag Edit - {qrTagID}</h3>----*/}
              <div className="qrtag-modal-header">
                <div className="loster_profile_avtr_wrapper">
                  <img
                    src={
                      updateProfile.profile_avatar ||
                      profileInfo.profile_avatar ||
                      HumainAvatar
                    }
                    alt="Loster Profile Avatar - Ajidq service"
                  />
                </div>
              </div>
              {/*--- LOSTER (PET / HUMAIN) INFO FORM ---*/}
              <form className="loster_info_form" onSubmit={handleUpdateSubmit}>
                <div className="form-row">
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
                        <i class="bx bx-cloud-upload"></i> Update Avatar
                      </label>
                      <p class="file-name-info"></p>
                    </div>
                  </div>
                </div>
                {/*--ALERT CONTEXT --*/}
                {alertShow ? (
                  <Alert severity="success">
                    <AlertTitle>Operation Sucsess</AlertTitle>
                    {alertContext}
                  </Alert>
                ) : alertShow === false ? (
                  <Alert severity="error">
                    <AlertTitle>Operation Failed !</AlertTitle>
                    {alertContext}
                  </Alert>
                ) : null}
                {/*--ALERT CONTEXT --*/}
                {alertShow ? (
                  <Alert severity="success">
                    <AlertTitle>Operation Sucsess</AlertTitle>
                    {alertContext}
                  </Alert>
                ) : alertShow === false ? (
                  <Alert severity="error">
                    <AlertTitle>Operation Failed !</AlertTitle>
                    {alertContext}
                  </Alert>
                ) : null}
                {/*--- LOSTER INFO AREA  ---*/}
                <span className="dash_form_label"># Loster Information</span>
                <div className="form-row">
                  <div className="form-group col-md-6 col-sm-6 col-6">
                    <input
                      type="text"
                      className="form-control loster_form_input"
                      name="first_name"
                      placeholder="First Name"
                      onChange={handleInputChange}
                      value={
                        updateProfile.first_name || profileInfo.first_name || ""
                      }
                    ></input>
                  </div>
                  <div className="form-group col-md-6 col-sm-6 col-6">
                    <input
                      type="text"
                      className="form-control loster_form_input"
                      name="last_name"
                      placeholder="Last Name"
                      onChange={handleInputChange}
                      value={
                        updateProfile.last_name || profileInfo.last_name || ""
                      }
                    ></input>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6 col-sm-6 col-6">
                    <select
                      name="gender"
                      value={updateProfile.gender || profileInfo.gender}
                      onChange={handleInputChange}
                      className="form-select mr-sm-2"
                    >
                      <option selected>Select Gender</option>
                      <option selected>Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                  <div className="form-group col-md-6 col-sm-6 col-6">
                    <input
                      type="number"
                      className="form-control loster_form_input"
                      name="age"
                      value={updateProfile.age || profileInfo.age}
                      onChange={handleInputChange}
                      placeholder="Enter Age"
                    ></input>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6 col-sm-6 col-6">
                    <input
                      type="text"
                      className="form-control loster_form_input"
                      name="body_color"
                      placeholder="Body Color"
                      onChange={handleInputChange}
                      value={updateProfile.body_color || profileInfo.body_color}
                    ></input>
                  </div>
                  <div className="form-group col-md-6 col-sm-6 col-6">
                    <select
                      name="object_type"
                      className="form-select mr-sm-2"
                      onChange={handleInputChange}
                      value={
                        updateProfile.object_type || profileInfo.object_type
                      }
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
                        checked={
                          updateProfile.isGPSEnable || profileInfo.isGPSEnable
                        }
                        color="warning"
                        onChange={(e) => {
                          if (e.target.checked) {
                            setUpdateProfile((values) => ({
                              ...values,
                              isGPSEnable: true,
                            }));
                          } else {
                            setUpdateProfile((values) => ({
                              ...values,
                              isGPSEnable: false,
                            }));
                          }
                        }}
                      />
                    }
                    label="Disbale / Enable"
                  />
                </FormGroup>
                {updateProfile.isGPSEnable || profileInfo.isGPSEnable ? (
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
                  <button className="create-btn" type="submit">
                    Update
                  </button>
                  <button className="create-btn" type="submit">
                    Update
                  </button>
                </div>
              </form>
            </section>
          </Box>
        </Modal>
        {/*--- FIXED ALERT BOX ---*/}
        {openAlert ? (
          <div className="fixed_alert_box">
            <Alert
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpenAlert(null);
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
        ) : openAlert === false ? (
          <div className="fixed_alert_box">
            <Alert
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpenAlert(null);
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
  };
}

export default DashboardMain;
