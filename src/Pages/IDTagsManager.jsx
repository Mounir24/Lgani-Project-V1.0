import React, { useEffect, useState, useContext } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { UserAuthContext } from "../Context/UserAuthContext";
import Loader from "../Components/Loader";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

// IMPORT APIs CLASSES
import ProfilesTagsAPI from "../Apis/tags.api";

function IDTagsManager() {
  // STATE MANAGEMENT
  const [profiles, setProfiles] = useState([]);
  const [isError, setIsError] = useState(null);
  const [errorContext, setErrorContext] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState({});

  // GLOBAL API CONTEXT - STATE MANAGEMENT
  const { user, dispatch } = useContext(UserAuthContext);

  // HTTP CALLs - EXTERNAL APIs ENDPOINTs
  useEffect(() => {
    // SET PAGE TITLE
    document.title = "Ajidq || Qr Tags Profiles Management";

    // HTTP CALL - PROFILES TAGS ENDPOINT
    const getAllProfiles = async () => {
      setIsLoading(true);
      try {
        await ProfilesTagsAPI.allProfilesTags(user._id, (err, PAYLOAD) => {
          if (err) {
            setIsError(true);
            setErrorContext(PAYLOAD.message);
          }

          switch (PAYLOAD.codeKey) {
            case 0:
              setIsError(true);
              setErrorContext(PAYLOAD.message);
              break;
            case 1:
              setProfiles(PAYLOAD.profiles_tags);
              break;
            default:
              break;
          }
        });
      } catch (err) {
      } finally {
        setIsLoading(false);
      }
    };

    getAllProfiles();
  }, []);

  // HANDLE FILTER FORM CHANGE
  const handleFilterFormChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setFilter((values) => ({ ...values, [name]: value }));
  };

  // HANDLE FILTER FORM SUBMIT
  const handleFilterFormSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      await ProfilesTagsAPI.filterProfilesTags(
        filter,
        user._id,
        (err, PROFILES) => {
          if (err) {
            setIsError(true);
            setErrorContext(PROFILES.message);
          }
          switch (PROFILES.codeKey) {
            case 0:
              setIsError(true);
              setErrorContext(PROFILES.message);
              break;
            case 1:
              setProfiles(PROFILES.losters_profiles);
              break;
            default:
              break;
          }
        },
      );
    } catch (err) {
      console.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // DATA GRID TABLE - COLUMNS & ROWs
  const columns = [
    {
      field: "_id",
      headerName: "ID",
      width: 70,
      renderCell: ({ row }) => {
        const id = row._id;
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
      field: "full_name",
      headerName: "Loster Name",
      width: 180,
      renderCell: ({ row }) => {
        const loster_name = row.full_name;
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
      field: "profile_avatar",
      headerName: "Profile Avatar",
      width: 120,
      renderCell: ({ row }) => {
        const profile_avatar = row.profile_avatar;
        /* "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04";*/
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
                src={profile_avatar}
                alt="profile"
                className="profile_avatar_img"
              ></img>
            </div>
          </div>
        );
      },
    },
    {
      field: "createdAt",
      headerName: "Issued Date",
      width: 120,
      renderCell: ({ row }) => {
        const issued_date = row.createdAt;
        return (
          <div style={{ width: "100%", textAlign: "center", margin: "0 auto" }}>
            <span
              style={{
                fontFamily: "'Rajdhani', sans-serif",
                fontSize: "16px",
                padding: "2px 10px",
              }}
            >
              {new Date(issued_date).toLocaleDateString()}
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
                backgroundColor: status ? "#bcf0da" : "#fbd5d5",
                color: status ? "#105545" : "#771d1d",
              }}
            >
              {status ? "Active" : "Inactive"}
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
      renderCell: ({ row }) => {
        const profileId = row._id;
        const isBlocked = row.isBlocked;
        // HANDLE ACTIONS EVENTS
        const handleActionsEvents = async (event) => {
          setIsLoading(true);
          // ACTION VALUE
          const actionEvent = event.target.value;

          switch (actionEvent) {
            case "block":
              // PROMPTE A CONFIRM WINDOW
              const isConfirme = window.confirm(
                `Are you sure you wanna ${actionEvent} profile for: ${row.full_name}?`,
              );
              if (!isConfirme) {
                return alert("Operation aborted due to the client !");
              } else {
                // HTTP CALL - API ENDPOINT (REMOVE)
                try {
                  await ProfilesTagsAPI.blockProfileTag(
                    profileId,
                    (err, Profile) => {
                      if (err) {
                        setIsError(true);
                        setErrorContext(Profile.message);
                      }
                      switch (Profile.codeKey) {
                        case 0:
                          setIsError(true);
                          setErrorContext(Profile.message);
                          break;
                        case 1:
                          setIsError(false);
                          setErrorContext(Profile.message);
                          break;
                        default:
                          break;
                      }
                    },
                  );
                } catch (err) {
                  console.error(err.message);
                } finally {
                  setIsLoading(false);
                }
              }
              break;
            case "remove":
              // PROMPTE A CONFIRM WINDOW
              const isConfirm = window.confirm(
                `Are you sure you wanna ${actionEvent} profile for: ${row.full_name}?`,
              );
              if (!isConfirm) {
                return alert("Operation aborted due to the client !");
              } else {
                // HTTP CALL - API ENDPOINT (REMOVE)
                try {
                  await ProfilesTagsAPI.removeProfileTag(
                    profileId,
                    (err, Profile) => {
                      if (err) {
                        setIsError(true);
                        setErrorContext(Profile.message);
                      }
                      switch (Profile.codeKey) {
                        case 0:
                          setIsError(true);
                          setErrorContext(Profile.message);
                          break;
                        case 1:
                          setIsError(false);
                          setErrorContext(Profile.message);
                          break;
                        default:
                          break;
                      }
                    },
                  );
                } catch (err) {
                  console.error(err.message);
                } finally {
                  setIsLoading(false);
                }
              }
              break;
            case "unblock":
              // PROMPTE A CONFIRM WINDOW
              const isConfirma = window.confirm(
                `Are you sure you wanna ${actionEvent} profile for: ${row.full_name}?`,
              );
              if (!isConfirma) {
                return alert("Operation aborted due to the client !");
              } else {
                // HTTP CALL - API ENDPOINT (REMOVE)
                try {
                  await ProfilesTagsAPI.unblockProfileTag(
                    profileId,
                    (err, Profile) => {
                      if (err) {
                        setIsError(true);
                        setErrorContext(Profile.message);
                      }
                      switch (Profile.codeKey) {
                        case 0:
                          setIsError(true);
                          setErrorContext(Profile.message);
                          break;
                        case 1:
                          setIsError(false);
                          setErrorContext(Profile.message);
                          break;
                        default:
                          break;
                      }
                    },
                  );
                } catch (err) {
                  console.error(err.message);
                } finally {
                  setIsLoading(false);
                }
              }
              break;
            default:
              break;
          }
        };
        return (
          <div className="dash_qrtags_actions">
            <select
              name="qrtag_action"
              className="form-select mr-sm-2 qrtags_actions_select"
              onChange={handleActionsEvents}
            >
              <option selected>Actions</option>
              <option value="block" disabled={isBlocked}>
                Block
              </option>
              <option value="remove">Remove</option>
              <option value="unblock" disabled={!isBlocked}>
                Unblock
              </option>
            </select>
          </div>
        );
      },
    },
  ];

  const rows = [
    {
      _id: 1,
      full_name: "John Doe",
      object_type: "Humains",
      profile_avatar: "my profile",
      createdAt: "2022/02/21",
      status: "Active",
      profile_visits: 834,
      profile_link: "http://localhost:3000/profile/delary_fl",
    },
    {
      _id: 2,
      full_name: "Linda Parokov",
      object_type: "Pets",
      profile_avatar: "my profile",
      createdAt: "2022/09/21",
      status: "Active",
      profile_visits: 434,
      profile_link: "http://localhost:3000/profile/parkov_alex",
    },
    {
      _id: 3,
      full_name: "Delary Fulton",
      object_type: "Humains",
      profile_avatar: "my profile",
      createdAt: "2020/09/21",
      status: "Inactive",
      profile_visits: 734,
      profile_link: "http://localhost:3000/profile/mounir_el",
    },
  ];

  return (
    <div className="container mt-3">
      <div className="dash_qrtags_container">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <h2 className="dash_section_label">Qr ID Tags Manager </h2>
            <div className="row w-100 mt-4">
              <div className="col-md-12 col-12 col-sm-12">
                {/*---- FILTER INPUTS CONTAINER  ----*/}
                <section className="dash_filter_section">
                  <span className="dash_form_label">#Filter</span>
                  <form
                    className="qrtags_filter_inputs"
                    onSubmit={handleFilterFormSubmit}
                  >
                    <div className="form-row">
                      <div className="form-group col-md-3 col-3 col-sm-4">
                        <select
                          name="status"
                          onChange={handleFilterFormChange}
                          value={filter.status}
                          className="form-select mr-sm-2"
                        >
                          <option selected>Filter By Status</option>
                          <option value="true">Active</option>
                          <option value="false">Inactive</option>
                        </select>
                      </div>
                      <div className="form-group col-md-3 col-3 col-sm-4">
                        <select
                          name="object_type"
                          onChange={handleFilterFormChange}
                          value={filter.object_type}
                          className="form-select mr-sm-2"
                        >
                          <option selected>Filter By Object Type </option>
                          <option value="Humains">Humains</option>
                          <option value="Pet">Pets</option>
                        </select>
                      </div>
                      <div className="form-group col-md-3 col-sm-3 col-4">
                        <input
                          type="text"
                          className="form-control filter_form_input"
                          name="full_name"
                          onChange={handleFilterFormChange}
                          value={filter.full_name}
                          placeholder="Filter by Full Name"
                        ></input>
                      </div>
                      <div className="form-group col-md-3 col-sm-3 col-4">
                        {/*--- FILTER FORM BUTTON ---*/}
                        <button type="submit" className="filter-form-btn">
                          Filter
                        </button>
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
                      rows={profiles}
                      columns={columns}
                      pageSize={5}
                      rowsPerPageOptions={[5]}
                      checkboxSelection
                      getRowId={(row) => row._id}
                    />
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        {/*--- FIXED ALERT BOX ---*/}
        {isError === false ? (
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
              {errorContext}
            </Alert>
          </div>
        ) : isError === true ? (
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
              {errorContext}
            </Alert>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default IDTagsManager;
