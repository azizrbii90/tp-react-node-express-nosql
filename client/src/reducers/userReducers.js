import { USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL, USER_LOGOUT, USER_UPDATE_SUCCESS } from "../constants/userConstants";

export const userLoginReducer = (state = { user : null, error : null, loading : null}, action) => {

    switch (action.type) {
        case USER_LOGIN_REQUEST :
            return { ...state, loading : true }
        case USER_LOGIN_SUCCESS : 
            return { user : action.payload, error : null, loading : false }
        case USER_LOGIN_FAIL :
            return { user : null, error : action.payload, loading : false }
        case USER_UPDATE_SUCCESS : 
            return { user: action.payload, error: null, loading : false }
        case USER_LOGOUT : 
            return { user : null, error : null, loading : false }
        default :
            return state;
    }
}