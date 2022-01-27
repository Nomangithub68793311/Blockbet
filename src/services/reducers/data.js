import {
    get_sports,
    get_event_with_odds,
    get_event_bets_by_user,
    get_in_play_and_upcoming_events_by_sport,
    get_bets,
    get_clients,
    get_admins,
    get_admin,
    get_client,
    get_sliders,
    get_slider,
    get_transactions,
    get_sport,
    get_withdrawals,
    reset_event_with_odds,
    get_pages,
    get_page,
    get_transaction, get_referrals
} from "../constant";

export const initialState = {
    sport_id: '',
    event_id: '',
    events: {},
    event: {
        event: {},
        odds: [],
        is_bets_loaded: false,
        bets: []
    },
    is_event_loaded: false,

    bets: {
        data: [],
        page: 1,
        limit: 10,
        total_data: 0,
        is_loaded: false
    },

    sports: {},
    is_sports_loaded: false,
    sport: {
        id: '',
        data: {}
    },
    is_sport_loaded: false,

    pages: {},
    is_pages_loaded: false,
    page: {
        id: '',
        data: {}
    },
    is_page_loaded: false,

    sliders: {},
    is_sliders_loaded: false,
    slider: {
        id: '',
        data: {}
    },
    is_slider_loaded: false,

    admins: {
        data: [],
        page: 1,
        limit: 10,
        search: '',
        total_data: 0,
        is_loaded: false
    },

    admin: {
        id: '',
        data: {}
    },

    clients: {
        data: [],
        page: 1,
        limit: 10,
        search: '',
        total_data: 0,
        is_loaded: false
    },

    client: {
        id: '',
        data: {}
    },

    transactions: {
        data: [],
        page: 1,
        limit: 10,
        search: '',
        total_data: 0,
        is_loaded: false
    },

    transaction: {
        id: '',
        data: {}
    },

    withdrawals: {
        data: [],
        page: 1,
        limit: 10,
        search: '',
        total_data: 0,
        is_loaded: false
    },

    referrals: {
        data: [],
        page: 1,
        limit: 10,
        total_data: 0,
        is_loaded: false
    },

}

export default function data(state = initialState, action) {
    switch (action.type) {

        case get_sports: return {
            ...state,
            is_sports_loaded: true,
            sports: action.data
        }

        case get_sport: return {
            ...state,
            is_sport_loaded: true,
            sport: {
                data: action.data,
                id: action.data.id
            }
        }

        case get_pages: return {
            ...state,
            is_pages_loaded: true,
            pages: action.data
        }

        case get_page: return {
            ...state,
            is_page_loaded: true,
            page: {
                data: action.data,
                id: action.data.id
            }
        }

        case get_sliders: return {
            ...state,
            is_sliders_loaded: true,
            sliders: action.data
        }

        case get_slider: return {
            ...state,
            is_slider_loaded: true,
            slider: {
                data: action.data,
                id: action.data.id
            }
        }

        case get_event_with_odds: return {
            ...state,
            is_event_loaded: true,
            event_id: action.event_id,
            event: {
                ...state.event,
                event: action.data.event,
                odds: action.data.odds,
            },
        }

        case reset_event_with_odds: return {
            ...state,
            is_event_loaded: false,
            event_id: '',
            event: {
                ...state.event,
                event: {},
                odds: [],
            },
        }

        case get_event_bets_by_user: return {
            ...state,
            event: {
                ...state.event,
                is_bets_loaded: true,
                bets: action.data
            }
        }

        case get_bets: return {
            ...state,
            bets: {
                data: action.data,
                page: action.page,
                limit: action.limit,
                total_data: action.total_data,
                is_loaded: true
            }
        }

        case get_clients: return {
            ...state,
            clients: {
                data: action.data,
                page: action.page,
                limit: action.limit,
                search: action.search,
                total_data: action.total_data,
                is_loaded: true
            }
        }

        case get_admins: return {
            ...state,
            admins: {
                data: action.data,
                page: action.page,
                limit: action.limit,
                search: action.search,
                total_data: action.total_data,
                is_loaded: true
            }
        }

        case get_admin: return {
            ...state,
            admin: {
                id: action.data.id,
                data: action.data,
            }
        }

        case get_client: return {
            ...state,
            client: {
                id: action.data.id,
                data: action.data,
            }
        }

        case get_transactions: return {
            ...state,
            transactions: {
                data: action.data,
                page: action.page,
                limit: action.limit,
                search: action.search,
                total_data: action.total_data,
                is_loaded: true
            }
        }

        case get_transaction: return {
            ...state,
            transaction: {
                id: action.data.id,
                data: action.data
            }
        }

        case get_withdrawals: return {
            ...state,
            withdrawals: {
                data: action.data,
                page: action.page,
                limit: action.limit,
                search: action.search,
                total_data: action.total_data,
                is_loaded: true
            }
        }

        case get_referrals: return {
            ...state,
            referrals: {
                data: action.data,
                page: action.page,
                limit: action.limit,
                total_data: action.total_data,
                is_loaded: true
            }
        }

        case get_in_play_and_upcoming_events_by_sport: return {
            ...state,
            events: action.events,
            sport_id: action.sport_id
        }

        default: return state
    }
}
