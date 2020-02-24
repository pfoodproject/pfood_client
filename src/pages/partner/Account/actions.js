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
