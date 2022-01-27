import {
    set_session,
    reset_session
} from "../constant";

const sessionData = JSON.parse(localStorage.getItem('session'))

export const initialState = {
    is_logged_in: !!(sessionData?.token && sessionData?.user),
    is_client_logged_in: sessionData?.token && sessionData?.user && sessionData?.user.type === 'client',
    is_admin_logged_in: sessionData?.token && sessionData?.user && sessionData?.user.type === 'admin',
    token: sessionData?.token || '',
    expiration: sessionData?.expiration || '',
    user: {
        id: sessionData?.user.id || '',
        first_name: sessionData?.user.first_name || '',
        last_name: sessionData?.user.last_name || '',
        date_of_birth: sessionData?.user.date_of_birth || '',
        email: sessionData?.user.email || '',
        username: sessionData?.user.username || '',
        type: sessionData?.user.type || '',
        available_balance: sessionData?.user.available_balance || '',
        pending_balance: sessionData?.user.pending_balance || '',
        avatar: sessionData?.user.avatar || '',
        is_active: sessionData?.user.is_active || ''
    }
}

export default function session(state = initialState, action) {
    switch (action.type) {
        case set_session: return {
            ...state,
            is_logged_in: !!(action.data.token && action.data.user),
            is_client_logged_in: action.data.token && action.data.user && action.data.user.type === 'client',
            is_admin_logged_in: action.data.token && action.data.user && action.data.user.type === 'admin',
            token: action?.data.token || '',
            expiration: action?.data.expiration || '',
            user: {
                id: action.data.user.id,
                first_name: action.data.user.first_name,
                last_name: action.data.user.last_name,
                date_of_birth: action.data.user.date_of_birth,
                email: action.data.user.email,
                username: action.data.user.username,
                type: action.data.user.type,
                available_balance: action.data.user.available_balance,
                bonus_balance: action.data.user.bonus_balance,
                avatar: action.data.user.avatar,
                is_active: action.data.user.is_active
            }
        }

        case reset_session: return {
            ...state,
            is_logged_in: false,
            is_client_logged_in: false,
            is_admin_logged_in: false,
            token: '',
            expiration: '',
            user: {
                id: '',
                first_name: '',
                last_name: '',
                date_of_birth: '',
                email: '',
                username: '',
                type: '',
                available_balance: '',
                bonus_balance: '',
                avatar: '',
                is_active: false
            }
        }

        default: return state
    }
}
