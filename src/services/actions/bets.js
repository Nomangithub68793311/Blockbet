import {
    add_to_pending_bet,
    change_quantity_field, get_event_bets_by_user, quit_bet,
    remove_from_pending_bet,
    submit_pending_bet
} from "../constant";
import {post} from "../../library/api";
import {notify} from "../../library/notification";


export const addToPendingBet = (value) => {
    return {
        value: value,
        type: add_to_pending_bet
    }
}

export const removeFromPendingBet = (index) => {
    return {
        index: index,
        type: remove_from_pending_bet
    }
}

export const changeQuantityField = (value, index) => {
    return {
        value: value,
        index: index,
        type: change_quantity_field
    }
}

export const submitPendingBet = (value, callback) => {
    return dispatch => {
        const formData = new FormData()
        formData.set('event_id',value.event_id)
        formData.set('odd_id',value.odd_id)
        formData.set('amount',value.amount)
        formData.set('market_key',value.market_key)
        return post('place-bet', formData).then(response => {
            if(response.status_code === 200) {
                notify(response.message, response.status)
                if(callback){
                    callback(response)
                }
                dispatch({
                    index: value.index,
                    type: submit_pending_bet
                })
            } else {
                notify(response.message, response.status)
            }
        })
    }
}

export const quitBet = (data, callback) => {
    return dispatch => {
        const formData = new FormData()
        formData.set('bet_id', data.bet_id)
        formData.set('quit_odd_id', data.quit_odd_id)
        post('quit-bet', formData).then(response => {
            if(response.status_code === 200) {
                notify(response.message, response.status)
                if(callback){
                    callback(response)
                }
                dispatch({
                    type: quit_bet
                })
            } else {
                notify(response.message, response.status)
            }
        })
    }
}