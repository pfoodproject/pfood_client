import * as Types from './constants';

// fetch promotion
export const fetchPromotion = (partnerId) => {
    return {
        type : Types.FETCH_PROMOTION,
        partnerId
    }
}

export const fetchPromotionSuccess = (listPromotion) => {
    return {
        type : Types.FETCH_PROMOTION_SUCCESS,
        listPromotion
    }
}

export const fetchPromotionFail = (msg) => {
    return {
        type : Types.FETCH_PROMOTION_FAIL,
        msg
    }
}

// Update Promotion
export const updatePromotion = (promotionid, status) => {
    return {
        type : Types.UPDATE_PROMOTION,
        promotionid,
        status
    }
}

export const updatePromotionSuccess = (response) => {
    return {
        type : Types.UPDATE_PROMOTION_SUCCESS,
        response
    }
}

export const updatePromotionFail = (response) => {
    return {
        type : Types.UPDATE_PROMOTION_FAIL,
        response
    }
}