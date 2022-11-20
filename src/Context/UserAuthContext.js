import React, { createContext, useReducer } from "react";


// INITIATE THE THE USER STATE 
const INITIAL_STATE = {
    user: null,
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
            return {
                user: action.paylaod,
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

    /*useEffect(() => {
        //localStorage.setItem("epv_admin", JSON.stringify(state.admin));
        //setUserState('epv_admin', state.admin, 432000000);
    }, [state.admin]);*/

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