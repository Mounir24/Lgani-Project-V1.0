// IMPORT HELPERS / UTILS 
import GlobalAPI from "../Utils/axios.config";

//  Profiles Tags API ENDPOINTS 
class ProfilesTagsAPI {
    // GET PROFILE TAG (SINGLE) - API ENDPOINT
    static async showProfileInfo(PROFILE_ID, CB) {
        if (PROFILE_ID === undefined || PROFILE_ID === null) {
            return CB('Profile ID expected :(', null);
        }

        try {
            await GlobalAPI.get(`/api/v1/auth/users/profiles/${PROFILE_ID}/show`, { withCredentials: true })
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

    // UPDATE PROFILE TAG (SINGLE) - API ENDPOINT
    static async updateProfileTag(PROFILE_ID, PROFILE_PAYLOAD, CB) {
        if (PROFILE_ID === undefined || PROFILE_ID === null) {
            return CB('Profile ID expected :(', null);
        }
        // CHECK IF PROFILE PAYLOAD NOT NULL
        if (PROFILE_PAYLOAD === undefined || PROFILE_PAYLOAD === null) {
            return CB('Profile Payload got empty :(', null);
        }



        try {
            await GlobalAPI.put(`/api/v1/auth/users/profiles/${PROFILE_ID}/update`, PROFILE_PAYLOAD, { withCredentials: true })
                .then(response => {
                    if (response.status === 200 && response.statusText === "OK") {
                        if (response.data.codeKey === 1) {
                            return CB(null, response.data)
                        } else {
                            return CB(response.data.message, response.data);
                        }
                        //return CB(null, response.data)
                    }
                })
        } catch (err) {
            alert(err.message);
            return CB(err.message, null);
        }
    }

}

// EXPORTS CLASS 
export default ProfilesTagsAPI;