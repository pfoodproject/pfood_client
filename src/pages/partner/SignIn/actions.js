import * as Types from './constants';

// fetch product
export const signIn = (user) => {
    return {
        type : Types.PARTNER_SIGNIN,
        user
    }
}

export const signInSuccess = (token) => {
    return {
        type : Types.PARTNER_SIGNIN_SUCCESS,
        token
    }
}

export const signInFail = (msg) => {
    return {
        type : Types.PARTNER_SIGNIN_FAIL,
        msg
    }
}

