import React, { createContext, useReducer, useEffect } from "react";

// LOCALSTORAGE EXPIRY FUNCTION - GET STATE
const getUserState = (key) => {
    const payload = localStorage.getItem(key)

    const USER_STATE = JSON.parse(payload);
    // if the item doesn't exist, return null
    if (USER_STATE === null) {
        return null;
    }
    const now = new Date();
    // compare the expiry time of the item with the current time
    if (now.getTime() > USER_STATE.expiry) {
        // If the item is expired, delete the item from storage
        // and return null
        localStorage.removeItem(key)
        return null;
    }
    return USER_STATE;
};

// SET USER STATE TO LOCALESTORAGE WITH EXPIRY DATE (TTL)
const setUserState = (key, payload, ttl) => {
    const now = new Date(); // GET CURRENT DATE 

    // `item` is an object which contains the original value
    // as well as the time when it's supposed to expire
    if (payload === null || typeof payload !== "object") {
        payload = null;
    } else {
        payload['expiry'] = now.getTime() + ttl;
    }

    localStorage.setItem(key, JSON.stringify(payload))
};

// INITIATE THE THE USER STATE 
const INITIAL_STATE = {
    user: getUserState('CLIENT'),
    login_open: false,
    signup_open: false,
    loading: false,
    error: null
}

export const UserAuthContext = createContext(INITIAL_STATE);

const UserAuthReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN_START":
            return {
                user: null,
                loading: true,
                error: null
            };
        case "LOGIN_SUCCESS":
            return {
                user: action.payload,
                loading: false,
                error: null
            };
        case "LOGIN_FAILURE":
            return {
                user: null,
                loading: false,
                error: action.payload
            }
        case "PROFILE_UPDATE":
            console.log('TYPE: UPDATE');
            console.log(action.payload)
            return {
                user: action.profile,
                laoding: null,
                error: null
            }
        case "LOGOUT":
            return {
                user: null,
                loading: false,
                error: null
            }
        case "LOGIN_OPEN_POPUP":
            return {
                login_open: true,
                error: null
            }
        case "LOGIN_CLOSE_POPUP":
            return {
                login_open: false,
                error: false
            }

        case "SIGNUP_OPEN_POPUP":
            return {
                signup_open: true,
                error: null
            }
        case "SIGNUP_CLOSE_POPUP":
            return {
                signup_open: false,
                error: false
            }

        default:
            return state;
    }
}

export const UserAuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(UserAuthReducer, INITIAL_STATE);

    useEffect(() => {
        setUserState('CLIENT', state.user, 432000000); // 5 DAYS EXPIRATION
    }, [state.user]);

    return (
        <UserAuthContext.Provider
            value={{
                user: state.user,
                login_open: state.login_open,
                signup_open: state.signup_open,
                loading: state.loading,
                error: state.error,
                dispatch
            }}
        >
            {children}
        </UserAuthContext.Provider>
    )
}