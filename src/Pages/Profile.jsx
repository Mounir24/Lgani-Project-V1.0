import React, { useState } from "react";

function Profile() {
  // STATE MANAGEMENT
  const [avatar, setAvatar] = useState("");

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
                      name="f_name"
                      placeholder="Enter your first name"
                    ></input>
                  </div>
                  <div className="form-group col-md-6 col-sm-6 col-6">
                    <input
                      type="text"
                      className="form-control profile_form_input"
                      name="l_name"
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
                      placeholder="Enter your phone"
                    ></input>
                  </div>
                  <div className="form-group col-md-6 col-6 col-sm-6">
                    <select name="gender" className="form-select mr-sm-2">
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
                      name="address_line"
                      placeholder="Enter your address / location"
                    ></input>
                  </div>
                  <div className="form-group col-md-4 col-4 col-sm-12">
                    <select name="country" className="form-select mr-sm-2">
                      <option selected>Country</option>
                      <option value="Morocco">Morocco</option>
                      <option value="U.S.A">U.S.A</option>
                    </select>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-4 col-sm-12 col-4">
                    <select name="city" className="form-select mr-sm-2">
                      <option selected>City</option>
                      <option value="Agadir">Agadir</option>
                      <option value="Casa Blanca">Casa Blanca</option>
                      <option value="Chefchaoun">Chefchaoun</option>
                    </select>
                  </div>
                  <div className="form-group col-md-4 col-sm-12 col-4">
                    <select
                      name="state_province"
                      className="form-select mr-sm-2"
                    >
                      <option selected>State / Province</option>
                      <option value="Sous-massa">Sous-massa</option>
                      <option value="Tafilalt">Tafilalt</option>
                      <option value="Houceima">Houceima</option>
                    </select>
                  </div>
                  <div className="form-group col-md-4 col-sm-12 col-4">
                    <input
                      type="text"
                      className="form-control profile_form_input"
                      name="zip_code"
                      placeholder="Zip Code"
                    ></input>
                  </div>
                </div>
              </form>
              <div className="form_dash_btn_wrapper">
                <button className="dash_profile-save-btn">Save All</button>
              </div>
            </div>
          </div>
          {/*--- PROFILE RIGHT SIDE ---*/}
          <div className="col-md-5 col-sm-12 col-5">
            <div className="dash_profile_right_panel">
              <div className="profile_info_display_wrapper">
                <div className="client_profile_avtr_wrapper">
                  <img
                    src={
                      avatar
                        ? avatar
                        : "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04"
                    }
                    alt="Client Profile"
                  />
                </div>
                <div className="client_profile_content_box">
                  <h4 className="profile_client_fname">Mounir el bertouli</h4>
                  <span className="profile_client_country">
                    Morocco, Agadir (MA)
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
    </div>
  );
}

export default Profile;
