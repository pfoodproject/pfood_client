import * as Types from './constants';

///////// signIn
export const signIn = (user) => {
    return {
        type : Types.ADMIN_SIGNIN,
        user
    }
}

export const signInSuccess = (token) => {
    return {
        type : Types.ADMIN_SIGNIN_SUCCESS,
        token
    }
}

export const signInFail = (msg) => {
    return {
        type : Types.ADMIN_SIGNIN_FAIL,
        msg
    }
}

///////// map localstorage to store
export const mlts = (admin) => {
    return {
        type : Types.MLTS,
        admin
    }
}