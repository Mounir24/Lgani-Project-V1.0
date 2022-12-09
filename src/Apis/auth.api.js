// IMPORT AXIOS
//import axios from "axios";

// IMPORT HELPERS / UTILS 
import GlobalAPI from "../Utils/axios.config";

//  AUTHENTICATION API ENDPOINTS 
class AuthAPI {
    // REGISTER NEW CLIENT API ENDPOINT
    static async resgiterClient(CLIENT_PAYLOAD, CB) {
        try {
            let axiosConfig = {
                withCredentials: true,
            };
            await GlobalAPI.post('/api/v1/auth/users/register', CLIENT_PAYLOAD, axiosConfig).then(response => {
                if (response.status === 201) {
                    CB(null, response.data)
                } else {
                    if (response.data.errors) {
                        CB(null, response.data.errors);
                    } else {
                        CB(null, response.data);
                    }
                }
            })
        } catch (err) {
            //CB(new Error(err.message), null)
            console.error(err.message);
        }
    }

    // ACTIVATE CLIENT ACCOUNT API ENDPOINT
    static async activateAccount(TOKEN_ID, CB) {
        // INPUT VALIDATION
        if (!TOKEN_ID || TOKEN_ID === undefined) {
            return CB(null, { error: "Token_Id param not provided :(" });
        }
        let axiosConfig = {
            withCredentials: true,
        };

        try {
            await GlobalAPI.post(`/api/v1/auth/users/activate/${TOKEN_ID}`, {}, axiosConfig).then(response => {
                if (response.status === 200 && response.status === "OK") {
                    return CB(null, response.data)
                } else {
                    return CB(null, response.data)
                }
            })
        } catch (err) {
            CB(new Error(err), null)
            return console.error(err)
        }

    }

    // CLIENT AUTH LOGIN API ENDPOINT 
    static async AuthClientLogin(CLIENT_CREDS, CB) {
        if (Object.keys(CLIENT_CREDS).length === -1) {
            return CB(new Error('Login credentials expected :('), null);
        }

        try {
            await GlobalAPI.post('/api/v1/auth/users/login', CLIENT_CREDS, { withCredentials: true })
                .then(response => {
                    if (response.status === 200 && response.statusText === "OK") {
                        if (response.data.codeKey === 0) {
                            return CB(response.data.message, response.data);
                        } else {
                            return CB(null, response.data);
                        }
                    }
                })
        } catch (err) {
            return CB(new Error(err.message), null);
        }
    }
}

// EXPORTS CLASS 
export default AuthAPI;