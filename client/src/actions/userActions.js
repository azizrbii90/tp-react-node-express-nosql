import { USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL, 
         USER_LOGOUT, 
         USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USER_UPDATE_FAIL } from "../constants/userConstants";

import * as userApis from '../apis/userApis';

export const login = (email, password) => async (dispatch) => {

    try {

        dispatch({ type: USER_LOGIN_REQUEST })
        const { data } = await userApis.loginApi({ email, password })
        dispatch({ type: USER_LOGIN_SUCCESS, payload: data.user })
        localStorage.setItem('access_token', data.token)
        localStorage.setItem('user', JSON.stringify(data.user))
        console.log("success login ",data)
        return data.user

    } catch (err) {
        console.log("error login : ",err)
        dispatch({ type: USER_LOGIN_FAIL, payload: err.response.data.message })
        return null
    }

}

export const getInfoFromToken = () => async(dispatch) => {
    
    try {

        dispatch({ type: USER_LOGIN_REQUEST })
        const { data } = await userApis.getInfoFromTokenApi()
        dispatch ({ type: USER_LOGIN_SUCCESS, payload: data.user})
        localStorage.setItem('user', JSON.stringify(data.user))
        console.log("success get info from token ",data)
        return data.user

    } catch (err) {
        console.log("error get info from token ",err)
        dispatch({ type: USER_LOGIN_FAIL, payload: err.response.data.message })
        return null
    }
}

export const logout = () => async (dispatch) => {
    localStorage.clear()
    dispatch({ type: USER_LOGOUT })
}

export const updateUser = (user, type) => async (dispatch) => {
   
    if(type=== "BD") {
        try {
            dispatch({ type: USER_UPDATE_REQUEST })
            const { data } = await userApis.userUpdateApi(user)
            dispatch({ type: USER_UPDATE_SUCCESS, payload: data.user})
            localStorage.setItem('user', JSON.stringify(data.user))
            console.log("success update user ",data)
            return data.user
        } catch (err) {
            console.log("error update user ",err)
            dispatch({ type: USER_UPDATE_FAIL, payload: err.response.data.message })
            return null
        }
    } else {
        dispatch({ type: USER_UPDATE_SUCCESS, payload: user})
    }
}

