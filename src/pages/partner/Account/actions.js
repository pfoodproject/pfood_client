import * as Types from './constants';

export const fetchPartner = (id) => {
    return {
        type : Types.FETCH_PARTNER,
        id
    }
}

export const fetchPartnerSuccess = (user) => {
    return {
        type : Types.FETCH_PARTNER_SUCCESS,
        user
    }
}

export const fetchPartnerFail = (msg) => {
    return {
        type : Types.FETCH_PARTNER_FAIL,
        msg
    }
}
//////// update partner
export const updatePartner = (partner) => {
    return {
        type : Types.UPDATE_PARTNER,
        partner
    }
}

export const updatePartnerSuccess = (user) => {
    return {
        type : Types.UPDATE_PARTNER_SUCCESS,
        user
    }
}

export const updatePartnerFail = (msg) => {
    return {
        type : Types.UPDATE_PARTNER_FAIL,
        msg
    }
}
///////// signIn
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

