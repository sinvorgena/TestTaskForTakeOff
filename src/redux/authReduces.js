import {Api} from "../dal/api";
import {setContacts} from "./contactsReducer";

let SET_AUTH = "auth/SET_AUTH_USER_DATA"
let SET_ERROR_AUTH = "auth/SET_ERROR_AUTH"


let authState = {
    isAuth: false,
    errorAuth: null
}

export const authReducer = (state = authState, action) => {
    let copyState;
    switch (action.type) {
        case SET_AUTH:
            copyState = {
                ...state,
                isAuth: action.isAuth
            }
            return copyState
        case SET_ERROR_AUTH:
            return  {
                ...state,
                errorAuth: action.errorAuth
            }

        default:
            return state
    }
}

export let setAuthSuccess = (isAuth) => ({
    type: SET_AUTH,
    isAuth
})
export let setErrorAuth = (errorAuth) => ({
    type: SET_ERROR_AUTH,
    errorAuth
})


export let logIn = (login, password) => async (dispatch) => {
    let response = await Api.getAuth(login, password)
    if (response?.data.access_token) {
        dispatch(setAuthSuccess(true))
        let contactsResponse = await Api.getContacts()
        console.log(contactsResponse)
        dispatch(setContacts(contactsResponse?.data))
    } else {
        dispatch(setErrorAuth(response?.data.message))
    }
    console.log(response)
}

window.authState = authState


