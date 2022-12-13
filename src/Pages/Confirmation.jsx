import React, { useState, useEffect } from "react";
import ConfirmationIcon from "../Assets/SVG/mailConfirmation.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

/*--- IMPORT HELPER / UTILS ---*/
import AuthAPI from "../Apis/auth.api";

function Confirmation() {
  const [isValidUrl, setIsValidUrl] = useState(true);
  const [msgError, setMsgError] = useState("");
  const { search } = useLocation();
  console.log(search);
  const navigateTo = useNavigate();

  // SET TOKEN VARIABLE
  const token = search.slice(7);

  // CHECK IF THERE'S NO SEARCH PROPERTY VALUE
  if (search === undefined || search === null) {
    navigateTo("/");
  }

  // HANDLE CONFIRMATION TOKEN
  useEffect(() => {
    document.title = `Ajidq || Account Confirmation`;

    async function verifyToken() {
      try {
        if (!token || token === null || token === undefined) {
          navigateTo("/");
          return;
        }

        await AuthAPI.activateAccount(token, (err, ACTIVATION_PAYLOAD) => {
          if (err) {
            setIsValidUrl(false);
            setMsgError(ACTIVATION_PAYLOAD["message"]);
          }

          switch (ACTIVATION_PAYLOAD.isVerified) {
            case false:
              setIsValidUrl(false);
              setMsgError(ACTIVATION_PAYLOAD["message"]);
              break;
            case true:
              setIsValidUrl(true);
              setMsgError(ACTIVATION_PAYLOAD["message"]);
              break;
            case null:
              setIsValidUrl(false);
              setMsgError(ACTIVATION_PAYLOAD["message"]);
              break;
            default:
              return null;
          }
        });

        /*const response = await axios.post(
          `${process.env.REACT_APP_BASE_API_URL}/api/auth/users/${token}/verify`,
          { withCredentials: true },
        );
        if (response.data["isVerified"]) {
          setIsValidUrl(true);
        } else if (response.data["isVerified"] === null) {
          setIsValidUrl(false);
          //setMsgError(response.data["msgError"]);
          navigateTo(response.data["redirectTo"]);
          return;
        } else {
          setIsValidUrl(false);
          navigateTo("/register");
          return;
          //setMsgError(response.data[msgError]);
        }*/
      } catch (err) {
        setMsgError(err.message);
        setIsValidUrl(false);
      }
    }
    verifyToken();
  }, []);
  return (
    <main className="confirmation_main">
      <div className="container">
        <div className="row w-100">
          <div className="col-10 col-md-10 col-sm-12 mx-auto d-flex justify-content-center">
            {isValidUrl ? (
              <div className="confirmation_block ">
                <div className="confirm_icon_wrapper">
                  <img
                    src={ConfirmationIcon}
                    alt="EPV - Confirmation Email"
                    className="img-fluid"
                  />
                </div>
                <h2 className="confirmation_label">E-mail confirmation</h2>
                <p>Thanks for your confirmation e-mail , Enjoy !</p>
                <button type="button" className="confirmation_btn">
                  <Link to="/">Login Me</Link>
                </button>
              </div>
            ) : (
              <Alert severity="warning">
                <AlertTitle>Activation Failed !</AlertTitle>
                {msgError}
              </Alert>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default Confirmation;
