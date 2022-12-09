import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";

function IDTagsManager() {
  // DATA GRID TABLE - COLUMNS & ROWs

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 70,
      renderCell: ({ row }) => {
        const id = row.id;
        return (
          <div style={{ width: "100%", textAlign: "center", margin: "0 auto" }}>
            <span
              style={{
                fontFamily: "'Rajdhani', sans-serif",
                fontSize: "16px",
                padding: "2px 10px",
              }}
            >
              {id}
            </span>
          </div>
        );
      },
    },
    {
      field: "loster_name",
      headerName: "Loster Name",
      width: 150,
      renderCell: ({ row }) => {
        const loster_name = row.loster_name;
        return (
          <div style={{ width: "100%", textAlign: "center", margin: "0 auto" }}>
            <span
              style={{
                fontFamily: "'Rajdhani', sans-serif",
                fontSize: "16px",
                padding: "2px 10px",
              }}
            >
              {loster_name}
            </span>
          </div>
        );
      },
    },
    {
      field: "object_type",
      headerName: "Object Type",
      width: 110,
      renderCell: ({ row }) => {
        const object_type = row.object_type;
        return (
          <div style={{ width: "100%", textAlign: "center", margin: "0 auto" }}>
            <span
              style={{
                fontFamily: "'Rajdhani', sans-serif",
                fontSize: "16px",
                padding: "2px 10px",
              }}
            >
              {object_type}
            </span>
          </div>
        );
      },
    },
    {
      field: "profile_avtr",
      headerName: "Profile Avatar",
      width: 120,
      renderCell: ({ row }) => {
        //const profile_avtr = row.profile_avtr;
        const profile_avtr =
          "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04";
        return (
          <div style={{ width: "100%", textAlign: "center", margin: "0 auto" }}>
            <div
              style={{
                width: "2rem",
                height: "2rem",
                borderRadius: "100%",
                margin: "auto",
              }}
            >
              <img
                src={profile_avtr}
                alt="profile"
                className="profile_avatar_img"
              ></img>
            </div>
          </div>
        );
      },
    },
    {
      field: "issued_date",
      headerName: "Issued Date",
      width: 120,
      renderCell: ({ row }) => {
        const issued_date = row.issued_date;
        return (
          <div style={{ width: "100%", textAlign: "center", margin: "0 auto" }}>
            <span
              style={{
                fontFamily: "'Rajdhani', sans-serif",
                fontSize: "16px",
                padding: "2px 10px",
              }}
            >
              {issued_date}
            </span>
          </div>
        );
      },
    },
    {
      field: "status",
      headerName: "Status",
      width: 100,
      renderCell: ({ row }) => {
        const status = row.status;
        return (
          <div style={{ width: "100%", textAlign: "center", margin: "0 auto" }}>
            <span
              style={{
                fontFamily: "'Rajdhani', sans-serif",
                fontSize: "16px",
                padding: "2px 10px",
                borderRadius: "24px",
                backgroundColor: status === "Active" ? "#bcf0da" : "#fbd5d5",
                color: status === "Active" ? "#105545" : "#771d1d",
              }}
            >
              {status}
            </span>
          </div>
        );
      },
    },
    {
      field: "profile_visits",
      headerName: "Total Visits",
      width: 120,
      renderCell: ({ row }) => {
        const total_visits = row.profile_visits;
        return (
          <div style={{ width: "100%", textAlign: "center", margin: "0 auto" }}>
            <span
              style={{
                fontFamily: "'Rajdhani', sans-serif",
                fontSize: "16px",
                padding: "2px 10px",
              }}
            >
              {total_visits}
            </span>
          </div>
        );
      },
    },
    {
      field: "profile_link",
      headerName: "Profile Link",
      width: 120,
      renderCell: ({ row }) => {
        const profile_link = row.profile_link;
        return (
          <div style={{ width: "100%", textAlign: "center", margin: "0 auto" }}>
            <span
              style={{
                fontFamily: "'Rajdhani', sans-serif",
                fontSize: "16px",
                padding: "2px 10px",
              }}
            >
              <a
                href={profile_link}
                className="profile-view-btn"
                rel="noreferrer"
                target="_blank"
              >
                View
              </a>
            </span>
          </div>
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: () => {
        return (
          <div className="dash_qrtags_actions">
            <select
              name="qrtag_action"
              className="form-select mr-sm-2 qrtags_actions_select"
            >
              <option selected>Actions</option>
              <option value="block">Block</option>
              <option value="remove">Remove</option>
              <option value="unblock">Unblock</option>
            </select>
          </div>
        );
      },
    },
  ];

  const rows = [
    {
      id: 1,
      loster_name: "John Doe",
      object_type: "Humains",
      profile_avtr: "my profile",
      issued_date: "2022/02/21",
      status: "Active",
      profile_visits: 834,
      profile_link: "http://localhost:3000/profile/delary_fl",
    },
    {
      id: 2,
      loster_name: "Linda Parokov",
      object_type: "Pets",
      profile_avtr: "my profile",
      issued_date: "2022/09/21",
      status: "Active",
      profile_visits: 434,
      profile_link: "http://localhost:3000/profile/parkov_alex",
    },
    {
      id: 3,
      loster_name: "Delary Fulton",
      object_type: "Humains",
      profile_avtr: "my profile",
      issued_date: "2020/09/21",
      status: "Inactive",
      profile_visits: 734,
      profile_link: "http://localhost:3000/profile/mounir_el",
    },
  ];

  return (
    <div className="container mt-3">
      <div className="dash_qrtags_container">
        <h2 className="dash_section_label">Qr ID Tags Manager </h2>
        <div className="row w-100 mt-4">
          <div className="col-md-12 col-12 col-sm-12">
            {/*---- FILTER INPUTS CONTAINER  ----*/}
            <section className="dash_filter_section">
              <span className="dash_form_label">#Filter</span>
              <form className="qrtags_filter_inputs">
                <div className="form-row">
                  <div className="form-group col-md-3 col-3 col-sm-4">
                    <select name="fl_status" className="form-select mr-sm-2">
                      <option selected>Filter By Status</option>
                      <option value="true">Active</option>
                      <option value="false">Inactive</option>
                    </select>
                  </div>
                  <div className="form-group col-md-3 col-3 col-sm-4">
                    <select name="fl_date" className="form-select mr-sm-2">
                      <option selected>Filter By Object Type </option>
                      <option value="Humains">Humains</option>
                      <option value="Pets">Pets</option>
                    </select>
                  </div>
                  <div className="form-group col-md-3 col-sm-3 col-4">
                    <input
                      type="text"
                      className="form-control filter_form_input"
                      name="fl_name"
                      placeholder="Filter by Full Name"
                    ></input>
                  </div>
                </div>
              </form>
            </section>
            {/*--- QR TAGS -  CREATE NEW QR ID TAG (PAGE REDIRECTION)  ---*/}
            <div className="dash_qrtags_btn_wrapper">
              <button className="qrtag-btn-create-redirect">
                <Link to="/dashboard/create">Create new Tag</Link>
              </button>
            </div>

            {/*--- QR TAGS - TABLE CONTAINER ---*/}
            <div className="dash_qrtags_table_wrapper">
              <div style={{ height: "550px", width: "100%" }}>
                <DataGrid
                  rows={rows}
                  columns={columns}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                  checkboxSelection
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IDTagsManager;
