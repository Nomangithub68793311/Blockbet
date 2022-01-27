import {
    add_to_pending_bet,
    change_quantity_field,
    remove_from_pending_bet,
    submit_pending_bet
} from "../constant";
import update from 'react-addons-update'

export const initialState = {
    pending_bets: [],
    event_bets: []
}

export default function bets(state = initialState, action) {
    switch (action.type) {
        case add_to_pending_bet: return {
            ...state,
            pending_bets: [
                ...state.pending_bets,
                {
                    event_name: action.value.event_name,
                    event_id: action.value.event_id,
                    odd_id: action.value.odd_id,
                    odd: action.value.odd,
                    odd_market_name: action.value.odd_market_name,
                    key: action.value.key,
                    quantity: action.value.quantity || 1
                }
            ]
        }

        case remove_from_pending_bet: return {
            ...state,
            pending_bets: [
                ...state.pending_bets.slice(0, action.index),
                ...state.pending_bets.slice(action.index + 1)
            ]
        }

        case submit_pending_bet: return {
            ...state,
            pending_bets: [
                ...state.pending_bets.slice(0, action.index),
                ...state.pending_bets.slice(action.index + 1)
            ]
        }

        case change_quantity_field: return update(state, {
            pending_bets: {
                [action.index]: {
                    quantity: {$set: action.value}
                }
            }
        })

        default: return state
    }
}
