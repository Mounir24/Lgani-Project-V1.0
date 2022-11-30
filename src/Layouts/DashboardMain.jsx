import React, { useState } from "react";
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

// ASSETS
import MoroccoFlag from "../Assets/SVG/morocco-flag.jpg";
import FranceFlag from "../Assets/SVG/france-flag.png";
import USAFlag from "../Assets/SVG/U.S.A-flag.webp";
import HumainAvatar from "../Assets/SVG/user-avatar.png";

function DashboardMain() {
  // STATE MANAGEMENT
  const [location, setLocation] = useState({});
  const [ip, setIp] = useState("");
  const [popupUpdate, setPopupUpdate] = useState(false);
  const [qrTagID, setQrTagID] = useState();
  const [isGPSEnabled, setIsGPSEnabled] = useState(false);
  const [avatar, setAvatar] = useState("");

  // HANDLE POPUP UPDATE (OPEN & CLOSE) MODAL
  const handlePopupUpdate = (e) => {
    //alert("QR TAG ID: " + e.target.value);
    setPopupUpdate(!popupUpdate);
    setQrTagID(e.target.parentElement.value);
    getQrTagInfo(e.target.parentElement.value);
  };

  // RETRIVE QR TAG INFORMATION
  const getQrTagInfo = (ID_TAG) => {
    // API HTTP CALL : GET QR TAG INFORMATION
    if (ID_TAG.length > 0 && ID_TAG !== undefined) {
      alert("GETTING QR TAG INFO: " + ID_TAG);
    }
  };

  // HANDLE SIGNUP PASSWORD SWITCH INPUT
  const handleSignupSwitch = (event) => {
    if (event.target.checked) {
      setIsGPSEnabled(true);
    } else {
      setIsGPSEnabled(false);
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
    });
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
    <div className="container w-100">
      <div className="dashboard-containter">
        <h3 className="dash_greeting-alert">
          Good morning, <br />{" "}
          <span className="client-username">Mr.Mounir El bertouli</span>
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
                  <span className="statis_data">127</span>
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
                  <span className="statis_data">7</span>
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
                  <span className="statis_data">41.83.12.9</span>
                  <span className="statis_label">Last Visit IP</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/*--- TOP 20 VISITED COUNTRIES LIST SECTION ---*/}
        <section className="dash_countries_visited_section">
          <h3 className="dash_section_label"># Top 20 visited countries</h3>
          <div className="row w-100 mt-4">
            <div className="col-md-6 col-sm-12 col-6">
              <div className="dash_countries_list">
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
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar alt="Morocco" src={MoroccoFlag} />
                    </ListItemAvatar>
                    <ListItemText
                      style={{
                        fontFamily: "Montserrat, sans-serif",
                        fontWeight: "500",
                        fontSize: "17px",
                      }}
                      primary="Morocco"
                      secondary="41.83.128.22"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar alt="U.S.A" src={USAFlag} />
                    </ListItemAvatar>
                    <ListItemText
                      style={{
                        fontFamily: "Montserrat, sans-serif",
                        fontWeight: "500",
                        fontSize: "17px",
                      }}
                      primary="United States Of America"
                      secondary="36.82.128.11"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar alt="France" src={FranceFlag} />
                    </ListItemAvatar>
                    <ListItemText
                      style={{
                        fontFamily: "Montserrat, sans-serif",
                        fontWeight: "500",
                        fontSize: "17px",
                      }}
                      primary="France"
                      secondary="129.83.53.18"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar alt="France" src={FranceFlag} />
                    </ListItemAvatar>
                    <ListItemText
                      style={{
                        fontFamily: "Montserrat, sans-serif",
                        fontWeight: "500",
                        fontSize: "17px",
                      }}
                      primary="France"
                      secondary="129.83.53.18"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar alt="France" src={FranceFlag} />
                    </ListItemAvatar>
                    <ListItemText
                      style={{
                        fontFamily: "Montserrat, sans-serif",
                        fontWeight: "500",
                        fontSize: "17px",
                      }}
                      primary="France"
                      secondary="129.83.53.18"
                    />
                  </ListItem>
                </List>
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
                            : MoroccoFlag
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
              <div className="col-md-4 col-sm-12 col-4 mb-3">
                <div className="qrcode-tag-box-container">
                  <div className="qrcode-icon-wrapper-top">
                    <i class="bx bx-qr-scan"></i>
                  </div>
                  <div className="tag-box-header">
                    <img src={USAFlag} alt="Profile Avatar" />
                  </div>
                  <div className="tag-box-body">
                    <h3 className="tag-consumer-name">Delary Fulton</h3>
                    <span className="tag-consumer-id">#LGN837547</span>
                  </div>
                  <div className="tag-box-tail">
                    <button
                      className="tag-edit-btn"
                      value="LGN982983"
                      onClick={(e) => handlePopupUpdate(e)}
                      type="button"
                    >
                      <i class="bx bx-edit-alt"></i>
                    </button>
                    <button className="tag-remove-btn" type="button">
                      <i class="bx bxs-trash-alt"></i>
                    </button>
                  </div>
                  <div className="qrcode-icon-wrapper-bottom">
                    <i class="bx bx-qr-scan"></i>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-sm-12 col-4 mb-3">
                <div className="qrcode-tag-box-container">
                  <div className="qrcode-icon-wrapper-top">
                    <i class="bx bx-qr-scan"></i>
                  </div>
                  <div className="tag-box-header">
                    <img src={FranceFlag} alt="Profile Avatar" />
                  </div>
                  <div className="tag-box-body">
                    <h3 className="tag-consumer-name">Jeannie Paculba</h3>
                    <span className="tag-consumer-id">#LGN73624</span>
                  </div>
                  <div className="tag-box-tail">
                    <button
                      className="tag-edit-btn"
                      value="LGN11118888"
                      onClick={(e) => handlePopupUpdate(e)}
                      type="button"
                    >
                      <i class="bx bx-edit-alt"></i>
                    </button>
                    <button className="tag-remove-btn" type="button">
                      <i class="bx bxs-trash-alt"></i>
                    </button>
                  </div>
                  <div className="qrcode-icon-wrapper-bottom">
                    <i class="bx bx-qr-scan"></i>
                  </div>
                </div>
              </div>
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
      {/*--- LOGIN POPUP MODAL ---*/}
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
                  src={avatar || HumainAvatar}
                  alt="Loster Profile Avatar - Lgani service"
                />
              </div>
            </div>
            {/*--- LOSTER (PET / HUMAIN) INFO FORM ---*/}
            <form className="loster_info_form">
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
                  <select name="loster_gender" className="form-select mr-sm-2">
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
          </section>
        </Box>
      </Modal>
    </div>
  );
}

export default DashboardMain;
