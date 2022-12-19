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

    // REMOVE PROFILE TAG (SIGNLE) - API ENDPOINT
    static async removeProfileTag(PROFILE_ID, CB) {
        if (PROFILE_ID === undefined || PROFILE_ID === null) {
            return CB('Profile ID expected :(', null);
        }

        try {
            await GlobalAPI.delete(`/api/v1/auth/users/profiles/${PROFILE_ID}/remove`, { withCredentials: true })
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
            return CB(err.message, null);
        }

    }


    // CREATE NEW PROFILE TAG (SINGLE) - API ENDPOINT
    static async createNewProfileTag(profile_payload, CB) {
        // CHECK IF PROFILE PAYLOAD NOT NULL
        if (profile_payload === undefined || profile_payload === null) {
            return CB('Profile Payload got empty :(', null);
        }

        try {
            await GlobalAPI.post(`/api/v1/auth/users/tags/create`, profile_payload, { withCredentials: true })
                .then(response => {
                    if (response.status === 201) {
                        if (response.data.codeKey === 1) {
                            return CB(null, response.data)
                        } else {
                            return CB(response.data.message, response.data);
                        }
                        //return CB(null, response.data)
                    }
                })
        } catch (err) {
            return CB(err.message, null);
        }

    }

    // RETREIVE PROFILES TAGS - API ENDPOINT 
    static async allProfilesTags(CLIENT_ID, CB) {
        if (CLIENT_ID === null || CLIENT_ID === undefined) {
            return CB('client ID expected :(', null);
        }

        try {
            await GlobalAPI.get(`/api/v1/auth/users/client/${CLIENT_ID}/qrtags/all`, { withCredentials: true })
                .then(response => {
                    console.log(response)
                    if (!response.data.status && response.data.status !== "OK") {
                        return CB(new Error(response.data.message), null);
                    }

                    if (response.status === 200 && response.statusText === "OK") {
                        if (response.data.codeKey === 1) {
                            return CB(null, response.data)
                        } else {
                            return CB(response.data.message, response.data);
                        }
                    }
                })
        } catch (err) {
            return CB(err.message, null);
        }
    }

    // BLOCK PROFILE TAG (SINGLE) - API ENDPOINT 
    static async blockProfileTag(PROFILE_ID, CB) {
        if (PROFILE_ID === undefined || PROFILE_ID === null) {
            return CB('Profile ID expected :(', null);
        }

        try {
            await GlobalAPI.put(`/api/v1/auth/users/profiles/${PROFILE_ID}/block`, {}, { withCredentials: true })
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
            return CB(err.message, null);
        }

    }

    // UNBLOCK PROFILE TAG - API ENDPOINT 
    static async unblockProfileTag(PROFILE_ID, CB) {
        if (PROFILE_ID === undefined || PROFILE_ID === null) {
            return CB('Profile ID expected :(', null);
        }

        try {
            await GlobalAPI.put(`/api/v1/auth/users/profiles/${PROFILE_ID}/unblock`, {}, { withCredentials: true })
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
            return CB(err.message, null);
        }

    }

    // FILTER PROFILES TAGS IDs - API ENDPOINT 
    static async filterProfilesTags(queries, client_id, CB) {
        if (!queries || queries === undefined) {
            return CB(new Error('Queries not provided !'), null);
        }

        // PROCESS THE QUERIES OBJECT 
        const queryString = Object.keys(queries).map(key => key + '=' + queries[key]).join('&');
        console.log('QUERY URL STRING: ' + queryString);

        try {
            await GlobalAPI.get(`/api/v1/auth/users/client/${client_id}/profiles?${queryString ? queryString : null}`, { withCredentials: true })
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
            return CB(err.message, null);
        }

    }

}

// EXPORTS CLASS 
export default ProfilesTagsAPI;