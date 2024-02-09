import axios from 'axios';
import { REGISTER_USER, LOGIN_USER, LOGOUT_USER, USER_LOADING, GET_AUTH_USER, AUTH_ERRORS } from '../constants/ActionsTypes';

// set the user loading
export const useLoading =()=>(dispatch)=> {
    dispatch({
        type: USER_LOADING
    })
}

// Register User
export const registerUser =(formData)=>async (dispatch)=> {

    try {

        const res = await axios.post("/api/auth/register", formData)

        dispatch({
            type: REGISTER_USER,
            payload: res.data
        })

    }

    catch(error) {
        console.log(error)
        const {errors, msg} = error.response.data

        if(Array.isArray(errors)) {
            errors.forEach((err)=> alert(err.msg))
        }

        dispatch({
            type: AUTH_ERRORS,
        })

    }

}

// Login User
export const loginUser =(formData)=> async(dispatch)=> {

    try {

        const res = await axios.post("/api/auth/login", formData)
        dispatch({
            type: LOGIN_USER,
            payload: res.data
        })
    }

    catch(error) {
console.log(error)
const {errors, msg} = error.response.data

        if(Array.isArray(errors)) {
            errors.forEach((err)=> alert(err.msg))
        }

        dispatch({
            type: AUTH_ERRORS,
        })
    }

}
// logout user
export const logout =()=>(dispatch)=> {
    dispatch({
        type: LOGOUT_USER
    })
}

export const getAuthUser =()=> async(dispatch)=> {

    try {
        const config = {
            Headers: {
                "x-auth-token": localStorage.getItem('token')
            }
        }

        const res = await axios.get("/api/auth/user", config);
        dispatch({
            type: GET_AUTH_USER,
            payload: res.data
        })

    }
    catch(error) {
        console.log(error)
        
    }
}