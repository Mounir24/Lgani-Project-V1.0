// IMPORT HELPERS / UTILS 
import GlobalAPI from "../Utils/axios.config";

//  STATISTICS API ENDPOINTS 
class StatisticsAPI {
    // GET DASHBOARD STATISTICS
    static async getDashboardStatistics(CLIENT_ID, CB) {
        if (CLIENT_ID === null || CLIENT_ID === undefined) {
            return CB('client ID expected :(', null);
        }

        try {
            await GlobalAPI.get(`/api/v1/auth/users/client/${CLIENT_ID}/dashboard`, { withCredentials: true })
                .then(response => {
                    if (response.status === 200 && response.statusText === "OK") {
                        /*if (response.data.codeKey === 1) {
                            return CB(null, response.data)
                        } else {
                            return CB(response.data.message, null);
                        }*/
                        return CB(null, response.data)
                    }
                })
        } catch (err) {
            alert(err.message);
            return CB(err.message, null);
        }
    }

    // GET CLIENT'S PROFILES TAGS ID API ENDPOINT
    static async getAllProfileTags(CLIENT_ID, CB) {
        if (CLIENT_ID === null || CLIENT_ID === undefined) {
            return CB('client ID expected :(', null);
        }

        try {
            await GlobalAPI.get(`/api/v1/auth/users/client/${CLIENT_ID}/qrtags/all`, { withCredentials: true })
                .then(response => {
                    console.log(response.data); // CONSOLE RESPONSE DATA
                    if (response.status === 200 && response.statusText === "OK") {
                        if (response.data.codeKey === 1) {
                            return CB(null, response.data)
                        } else {
                            return CB(response.data.message, response.data);
                        }
                    }
                })
        } catch (err) {
            alert(err.message);
            return CB(err.message, null);
        }
    }

}

// EXPORTS CLASS 
export default StatisticsAPI;