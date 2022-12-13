import React from "react";
import { useParams } from "react-router-dom";
//import HumainAvatar from "../Assets/SVG/user-avatar.png";
import Tooltip from "@mui/material/Tooltip";

function LosterProfile() {
  //const { client_id } = useParams();

  return (
    <main className="loster_profile_container">
      {/*--- PROFILE BANNER HEAD ---*/}
      <section className="profile_banner_head">
        <span className="banner_text_container">
          <p className="banner-desc">
            Object Missing - we need your help to return it to its owner
          </p>
        </span>
      </section>
      {/*--- PROFILE INFO DISPLAYER AREA ---*/}
      <section className="profile_displayer_container">
        <div className="profile_head_container">
          <div className="container">
            <div className="row w-100">
              <div className="col-4 col-md-4 col-sm-12">
                <div className="profile_head_content_wrapper">
                  {/*--- PROFILE AVATAR ---*/}
                  <div className="profile_avatar_wrapper">
                    <img
                      src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04"
                      alt="Profile Loster Avatar"
                    />
                  </div>
                  {/*--- PROFILE LOSTER METADATA - (NAME - TAG ID)  ---*/}
                  <div className="profile_metadata_content">
                    <span className="loster_display_name">Delary Fulton</span>
                    <span className="loster_tag_id">Tag ID: #LGN9182764</span>
                  </div>
                </div>
              </div>
              <div className="col-8 col-md-8 col-sm-12">
                <div className="profile_loster_metadata_container">
                  <div className="profile_metadata_content">
                    <ul className="list-style">
                      <li className="item-list">
                        <div className="prfl_metadata_signle">
                          <i class="bx bx-user"></i>
                          <p className="prfl_metadata_label my-auto">
                            Full Name:
                            <span className="prfl_metdata_value">
                              Delary Fulton
                            </span>
                          </p>
                        </div>
                      </li>
                      <li className="item-list">
                        <div className="prfl_metadata_signle">
                          <i class="bx bx-dna"></i>
                          <p className="prfl_metadata_label my-auto">
                            Gender:
                            <span className="prfl_metdata_value">Female</span>
                          </p>
                        </div>
                      </li>
                      <li className="item-list">
                        <div className="prfl_metadata_signle">
                          <i class="bx bx-group"></i>
                          <p className="prfl_metadata_label my-auto">
                            Age:
                            <span className="prfl_metdata_value">18 years</span>
                          </p>
                        </div>
                      </li>
                      <li className="item-list">
                        <div className="prfl_metadata_signle">
                          <i class="bx bx-palette"></i>
                          <p className="prfl_metadata_label my-auto">
                            Body Color:
                            <span className="prfl_metdata_value">
                              Black & White Mixed
                            </span>
                          </p>
                        </div>
                      </li>
                      <li className="item-list">
                        <div className="prfl_metadata_signle">
                          <i class="bx bx-fingerprint"></i>
                          <p className="prfl_metadata_label my-auto">
                            Object Type:
                            <span className="prfl_metdata_value">Humain</span>
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="profile_body_container">
          <div className="container">
            <span className="profile_body_label">#Owner Information</span>
            <div className="row w-100">
              <div className="col-md-6 col-6 col-sm-12">
                <div className="profile_owner_metadata_wrapper">
                  <div className="owner_metadata_content">
                    <ul className="list-style">
                      <li className="item-list">
                        <div className="prfl_metadata_signle">
                          <i class="bx bx-user"></i>
                          <p className="prfl_metadata_label my-auto">
                            Full Name:
                            <span className="prfl_metdata_value">
                              Mounir El bertouli
                            </span>
                          </p>
                        </div>
                      </li>
                      <li className="item-list">
                        <div className="prfl_metadata_signle">
                          <i class="bx bx-phone"></i>
                          <p className="prfl_metadata_label my-auto">
                            Primary Phone Number:
                            <span className="prfl_metdata_value">
                              +212652940991
                            </span>
                          </p>
                        </div>
                      </li>
                      <li className="item-list">
                        <div className="prfl_metadata_signle">
                          <i class="bx bx-phone"></i>
                          <p className="prfl_metadata_label my-auto">
                            Secondary Phone Number:
                            <span className="prfl_metdata_value">
                              +21270972180
                            </span>
                          </p>
                        </div>
                      </li>
                      <li className="item-list">
                        <div className="prfl_metadata_signle">
                          <i class="bx bx-envelope"></i>
                          <p className="prfl_metadata_label my-auto">
                            E-mail address:
                            <span className="prfl_metdata_value">
                              M.brtouli997@gmail.com
                            </span>
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-6 col-sm-12">
                <div className="profile_owner_metadata_wrapper">
                  <div className="owner_metadata_content">
                    <ul className="list-style">
                      <li className="item-list">
                        <div className="prfl_metadata_signle">
                          <i class="bx bx-map"></i>
                          <p className="prfl_metadata_label my-auto">
                            Home Address:
                            <span className="prfl_metdata_value">
                              city Agadir, Tilila, B2 , N388
                            </span>
                          </p>
                        </div>
                      </li>
                      <li className="item-list">
                        <div className="prfl_metadata_signle">
                          <i class="bx bx-trip"></i>
                          <p className="prfl_metadata_label my-auto">
                            City:
                            <span className="prfl_metdata_value">Agadir</span>
                          </p>
                        </div>
                      </li>
                      <li className="item-list">
                        <div className="prfl_metadata_signle">
                          <i class="bx bx-trip"></i>
                          <p className="prfl_metadata_label my-auto">
                            state:
                            <span className="prfl_metdata_value">
                              Sous-massa
                            </span>
                          </p>
                        </div>
                      </li>
                      <li className="item-list">
                        <div className="prfl_metadata_signle">
                          <i class="bx bx-wifi"></i>
                          <p className="prfl_metadata_label my-auto">
                            Zip Code:
                            <span className="prfl_metdata_value">86153</span>
                          </p>
                        </div>
                      </li>
                      <li className="item-list">
                        <div className="prfl_metadata_signle">
                          <i class="bx bx-globe"></i>
                          <p className="prfl_metadata_label my-auto">
                            Country:
                            <span className="prfl_metdata_value">Morocco</span>
                          </p>
                        </div>
                      </li>
                    </ul>
                    <div className="metadata-maps-geo-wrapper">
                      <a
                        href="https://www.fb.com"
                        rel="noreferrer"
                        target="_blank"
                        className="geo-maps-btn"
                      >
                        <i class="bx bx-navigation my-auto"></i>
                        Geo Maps
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="profile_footer_container">
          <div className="container">
            <span className="profile_footer_label">#Contact Actions</span>
            <div className="profile_actions_wrapper">
              <Tooltip title="Call: +212652940991" placement="top-start">
                <button type="button" className="action-call-btn">
                  <i class="bx bx-phone"></i>
                  <a href="tel:+212652940991" rel="noreferrer" target="_blank">
                    Call Me
                  </a>
                </button>
              </Tooltip>
              <Tooltip
                title="E-mail: M.brtouli997@gmail.com"
                placement="top-start"
              >
                <button type="button" className="action-mail-btn">
                  <i class="bx bx-envelope"></i>
                  <a
                    href="mailto:M.brtouli997@gmail.com"
                    rel="noreferrer"
                    target="_blank"
                  >
                    Email Me
                  </a>
                </button>
              </Tooltip>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default LosterProfile;
