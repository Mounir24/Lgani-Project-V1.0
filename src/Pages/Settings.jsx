import React, { useState } from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Switch from "@mui/material/Switch";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

function Settings() {
  // SETTING STATE MANAGEMENT
  const [settings, setSettings] = useState({});

  // HANDLE SETTINGS SWITCH CHANGE
  const handleSettingsChange = (event) => {
    if (event.target.checked) {
      // CHECK IF THE INPUT NAME == isSubscribed
      if (event.target.name === "isSubscribed") {
        setSettings((values) => ({
          ...values,
          [event.target.name]: true,
        }));
      } else {
        const name = event.target.name;

        setSettings((values) => ({ ...values, [name]: true }));
      }
    } else {
      const name = event.target.name;

      setSettings((values) => ({ ...values, [name]: false }));
    }
  };

  // HANDLE SAVE SETTINGS
  const handleSettingsSave = () => {
    //event.preventDefault();
    alert("THANKS FOR SAVING YOUR SETTINGS !!");
    console.log(settings);
  };

  return (
    <div className="container mt-3">
      <div className="dash_settings_container">
        <h2 className="dash_section_label">Settings</h2>
        <div className="row w-100 mt-5">
          <div className="col-md-6 col-sm-12 col-6">
            <div className="dash_settings_left_panel">
              {/*--- PRIVACY CONTROL AREA  ---*/}
              <span className="dash_form_label">
                #Privacy Control Information
              </span>
              <div className="dash_settings_row">
                {/*--- ENABLE / DISBALE PRIVACY CONTROL  ---*/}
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={settings.fName_isChecked}
                        color="warning"
                        name="fName_isChecked"
                        onChange={handleSettingsChange}
                      />
                    }
                    label="Show / Hide (Full Name)"
                  />
                </FormGroup>
              </div>
              <div className="dash_settings_row">
                {/*--- ENABLE / DISBALE PRIVACY CONTROL  ---*/}
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={settings.email_isChecked}
                        color="warning"
                        name="email_isChecked"
                        onChange={handleSettingsChange}
                      />
                    }
                    label="Show / Hide (E-mail Address)"
                  />
                </FormGroup>
              </div>
              <div className="dash_settings_row">
                {/*--- ENABLE / DISBALE PRIVACY CONTROL  ---*/}
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={settings.country_isChecked}
                        color="warning"
                        name="country_isChecked"
                        onChange={handleSettingsChange}
                      />
                    }
                    label="Show / Hide (Country)"
                  />
                </FormGroup>
              </div>
              <div className="dash_settings_row">
                {/*--- ENABLE / DISBALE PRIVACY CONTROL  ---*/}
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={settings.city_isChecked}
                        color="warning"
                        name="city_isChecked"
                        onChange={handleSettingsChange}
                      />
                    }
                    label="Show / Hide (City)"
                  />
                </FormGroup>
              </div>
              <div className="dash_settings_row">
                {/*--- ENABLE / DISBALE PRIVACY CONTROL  ---*/}
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={settings.state_isChecked}
                        color="warning"
                        name="state_isChecked"
                        onChange={handleSettingsChange}
                      />
                    }
                    label="Show / Hide (State / Province)"
                  />
                </FormGroup>
              </div>

              <div className="dash_settings_row">
                {/*--- ENABLE / DISBALE PRIVACY CONTROL  ---*/}
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={settings.zip_isChecked}
                        color="warning"
                        name="zip_isChecked"
                        onChange={handleSettingsChange}
                      />
                    }
                    label="Show / Hide (Zip Code)"
                  />
                </FormGroup>
              </div>
              <div className="dash_settings_row">
                {/*--- ENABLE / DISBALE PRIVACY CONTROL  ---*/}
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={settings.address_isChecked}
                        color="warning"
                        name="address_isChecked"
                        onChange={handleSettingsChange}
                      />
                    }
                    label="Show / Hide (Address Home)"
                  />
                </FormGroup>
              </div>
              <div className="dash_settings_row">
                {/*--- ENABLE / DISBALE PRIVACY CONTROL  ---*/}
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={settings.phone_isChecked}
                        color="warning"
                        name="phone_isChecked"
                        onChange={handleSettingsChange}
                      />
                    }
                    label="Show / Hide (Primary Phone)"
                  />
                </FormGroup>
              </div>
              <div className="privacy_hint_alert">
                <Alert severity="info">
                  <AlertTitle>Info</AlertTitle>
                  You can control your information privacy , by Enable / Disable
                  information options , so that you can Show / Hide your
                  senstive info , from the public
                </Alert>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-sm-12 col-6">
            <div className="dash_settings_right_panel">
              {/*--- PRIVACY CONTROL AREA  ---*/}
              <span className="dash_form_label">#Account Settings</span>
              <div className="dash_settings_row">
                {/*--- ENABLE / DISBALE PRIVACY CONTROL  ---*/}
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={settings.isSubscribed}
                        name="isSubscribed"
                        color="warning"
                        onChange={handleSettingsChange}
                      />
                    }
                    label="Subscribe me to newsletter"
                  />
                </FormGroup>
              </div>
              <div className="dash_setting_password_wrapper">
                <span className="wrapper_label">Change Password</span>
                <form className="dash_settings_form">
                  <div className="form-row">
                    <div className="form-group col-md-12 col-sm-12 col-12">
                      <input
                        type="text"
                        className="form-control settings_form_input"
                        name="curr_password"
                        onChange={handleSettingsChange}
                        value={settings.curr_password}
                        placeholder="Enter Current Password"
                      ></input>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-6 col-sm-12 col-6">
                      <input
                        type="text"
                        className="form-control settings_form_input"
                        name="new_password"
                        onChange={handleSettingsChange}
                        value={settings.new_password}
                        placeholder="New Password"
                      ></input>
                    </div>
                    <div className="form-group col-md-6 col-sm-12 col-6">
                      <input
                        type="text"
                        className="form-control settings_form_input"
                        name="confirm_password"
                        onChange={handleSettingsChange}
                        value={settings.confirm_password}
                        placeholder="Confirm Password"
                      ></input>
                    </div>
                  </div>

                  <div className="setting_form_btn_wrap">
                    <button
                      className="settings-form-btn"
                      onClick={handleSettingsSave}
                      type="button"
                    >
                      Save All
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
