import {
    get_sports,
    get_event_with_odds,
    get_event_bets_by_user,
    get_in_play_and_upcoming_events_by_sport,
    get_bets,

    get_admins,
    get_admin,

    get_clients,
    get_client,

    get_sliders,
    get_slider,
    get_transactions,
    get_transaction,
    get_sport,
    get_withdrawals,
    reset_event_with_odds,
    get_pages,
    get_page, get_referrals
} from "../constant";
import {get, post} from "../../library/api";


// Get Sports List
export const getSports = () => {
    return function(dispatch){
        get('get-only-sports').then(response => {
            dispatch({
                data: response.data,
                type: get_sports
            })
        })
    }
}
// Get Sports List
export const getSport = (id) => {
    return function(dispatch){
        get(`admin/get-single-sport/${id}`).then(response => {
            dispatch({
                data: response.data,
                type: get_sport
            })
        })
    }
}

export const getInPlayAndUpcomingEventsBySport = (sport) => {
    return function (dispatch){
        get(`get-in-play-and-upcoming-events-by-sport/${sport || ""}`).then(response => {
            dispatch({
                sport_id: sport,
                events: response.data,
                type: get_in_play_and_upcoming_events_by_sport
            })
        })
    }
}

export const getEventWithOdds = (event, callback) => {
    return function (dispatch){
        get(`get-single-event-with-odds/${event}`).then(response => {
            if (callback) {
                callback(response)
            }

            dispatch({
                event_id: event,
                data: response.data,
                type: get_event_with_odds
            })
        })
    }
}

export const resetEventWithOdds = () => {
    return {
        type: reset_event_with_odds
    }
}

export const getBets = (page=1, limit=10) => {
    return function (dispatch){
        const formData = new FormData()
        formData.set('limit', limit)
        formData.set('page', page)

        post(`get-bets`, formData).then(response => {
            dispatch({
                data: response.data.data,
                page: response.data.page,
                limit: response.data.limit,
                total_data: response.data.total_data,
                type: get_bets
            })
        })
    }
}


// Get Client List
export const getClients = (page=1, limit=10, search='') => {
    return function (dispatch){
        const formData = new FormData()
        formData.set('limit', limit)
        formData.set('page', page)
        formData.set('search', search)

        post(`get-clients`, formData).then(response => {
            dispatch({
                data: response.data.data,
                page: response.data.page,
                limit: response.data.limit,
                search: response.data.search,
                total_data: response.data.total_data,
                type: get_clients
            })
        })
    }
}


// Get Single Client
export const getClient = (id) => {
    return function(dispatch){
        get(`get-single-client/${id}`).then(response => {
            dispatch({
                data: response.data,
                type: get_client
            })
        })
    }
}


// Get Admin list
export const getAdmins = (page=1, limit=10, search='') => {
    return function (dispatch){
        const formData = new FormData()
        formData.set('limit', limit)
        formData.set('page', page)
        formData.set('search', search)

        post(`get-admins`, formData).then(response => {
            dispatch({
                data: response.data.data,
                page: response.data.page,
                limit: response.data.limit,
                search: response.data.search,
                total_data: response.data.total_data,
                type: get_admins
            })
        })
    }
}


// get Single Admin
export const getAdmin = (id) => {
    return function(dispatch){
        get(`get-single-admin/${id}`).then(response => {
            dispatch({
                data: response.data,
                type: get_admin
            })
        })
    }
}


// Get Sliders
export const getSliders = () => {
    return function(dispatch){
        get('get-sliders').then(response => {
            dispatch({
                data: response.data,
                type: get_sliders
            })
        })
    }
}


// Get Slider
export const getSlider = (id) => {
    return function(dispatch){
        get(`admin/get-single-slider/${id}`).then(response => {
            dispatch({
                data: response.data,
                type: get_slider
            })
        })
    }
}


// Get Transactions
export const getTransactions = (page=1, limit=10, search='') => {
    return function(dispatch){
        const formData = new FormData()
        formData.set('limit', limit)
        formData.set('page', page)
        formData.set('search', search)

        post(`get-transactions`, formData).then(response => {
            dispatch({
                data: response.data.data,
                page: response.data.page,
                limit: response.data.limit,
                search: response.data.search,
                total_data: response.data.total_data,
                type: get_transactions
            })
        })
    }
}


// Get Transaction
export const getTransaction = (id) => {
    return function(dispatch){
        get(`get-single-transaction/` + id).then(response => {
            dispatch({
                type: get_transaction,
                data: response.data
            })
        })
    }
}


// Get Transactions
export const getWithdrawals = (page=1, limit=10, search='') => {
    return function(dispatch){
        const formData = new FormData()
        formData.set('limit', limit)
        formData.set('page', page)
        formData.set('search', search)

        post(`get-payouts`, formData).then(response => {
            dispatch({
                data: response.data.data,
                page: response.data.page,
                limit: response.data.limit,
                search: response.data.search,
                total_data: response.data.total_data,
                type: get_withdrawals
            })
        })
    }
}

// Get Referrals
export const getReferrals = (page=1, limit=10, search='') => {
    return function(dispatch){
        const formData = new FormData()
        formData.set('limit', limit)
        formData.set('page', page)
        formData.set('search', search)

        post(`get-referrals`, formData).then(response => {
            dispatch({
                data: response.data.data,
                page: response.data.page,
                limit: response.data.limit,
                total_data: response.data.total_data,
                type: get_referrals
            })
        })
    }
}


// Get Pages
export const getPages = () => {
    return function(dispatch){
        get('get-all-pages').then(response => {
            dispatch({
                data: response.data,
                type: get_pages
            })
        })
    }
}


// Get Page
export const getPage = (id) => {
    return function(dispatch){
        get(`admin/get-single-page/${id}`).then(response => {
            dispatch({
                data: response.data,
                type: get_page
            })
        })
    }
}


// Get Page By Slug
export const getPageBySlug = (slug) => {
    return function(dispatch){
        get(`get-single-page-by-slug/${slug}`).then(response => {
            console.log(response)
            dispatch({
                data: response.data,
                type: get_page
            })
        })
    }
}


// Get Event Bets By User
export const getEventBetsByUser = event => {
    return dispatch => {
        get(`get-event-bets-by-user/${event}`).then(res => {
            dispatch({
                data: res.data,
                type: get_event_bets_by_user
            })
        })
    }
}