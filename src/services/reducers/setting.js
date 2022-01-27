import {
    toggle_user_menu,
    open_user_menu_if_closed,
    close_user_menu_if_opened,
    toggle_login_modal,
    open_login_modal_if_closed,
    close_login_modal_if_opened,
    toggle_registration_modal,
    open_registration_modal_if_closed,
    close_registration_modal_if_opened,
    toggle_buy_slip_modal,
    open_buy_slip_modal_if_closed,
    close_buy_slip_modal_if_opened,
    toggle_add_admin_modal,
    open_add_admin_modal_if_closed,
    close_add_admin_modal_if_opened,
    open_edit_admin_modal_if_closed,
    close_edit_admin_modal_if_opened,
    open_edit_client_modal_if_closed,
    close_edit_client_modal_if_opened,
    open_add_slider_modal_if_closed,
    close_add_slider_modal_if_opened,
    open_edit_slider_modal_if_closed,
    close_edit_slider_modal_if_opened,
    open_edit_sport_modal_if_closed,
    close_edit_sport_modal_if_opened,
    open_withdrawal_modal_if_closed,
    close_withdrawal_modal_if_opened,
    open_edit_page_modal_if_closed,
    close_edit_page_modal_if_opened,
    open_confirm_deposit_if_closed,
    close_confirm_deposit_if_opened,
    open_confirm_transaction_if_closed, close_confirm_transaction_if_opened
} from "../constant"

export const initialState = {
    is_user_menu_open: false,
    login_modal: {
        show: false,
    },
    registration_modal: {
        show: false
    },
    buy_slip_modal: {
        show: false
    },
    add_admin_modal: {
        show: false
    },
    edit_admin_modal: {
        show: false
    },
    edit_client_modal: {
        show: false
    },
    add_slider_modal: {
        show: false
    },
    edit_slider_modal: {
        show: false
    },
    edit_sport_modal: {
        show: false
    },
    withdrawal_modal: {
        show: false
    },
    edit_page_modal: {
        show: false
    },
    confirm_deposit_modal: {
        show: false
    },
    confirm_transaction_modal: {
        show: false
    },
}

export default function setting(state = initialState, action) {
    switch (action.type) {
        case toggle_user_menu: return {
            ...state,
            is_user_menu_open: !state.is_user_menu_open
        }
        case open_user_menu_if_closed: return {
            ...state,
            is_user_menu_open: state.is_user_menu_open === false ? true : true
        }
        case close_user_menu_if_opened: return {
            ...state,
            is_user_menu_open: state.is_user_menu_open === true ? false : false
        }

        case toggle_login_modal: return {
            ...state,
            login_modal:{
                show: !state.login_modal.show
            }
        }
        case open_login_modal_if_closed: return {
            ...state,
            login_modal:{
                show: state.login_modal.show === false ? true : true
            }
        }
        case close_login_modal_if_opened: return {
            ...state,
            login_modal:{
                show: state.login_modal.show === true ? false : false
            }
        }

        case toggle_registration_modal: return {
            ...state,
            registration_modal:{
                show: !state.registration_modal.show
            }
        }
        case open_registration_modal_if_closed: return {
            ...state,
            registration_modal:{
                show: state.registration_modal.show === false ? true : true
            }
        }
        case close_registration_modal_if_opened: return {
            ...state,
            registration_modal:{
                show: state.registration_modal.show === true ? false : false
            }
        }

        case toggle_buy_slip_modal: return {
            ...state,
            buy_slip_modal:{
                show: !state.buy_slip_modal.show
            }
        }
        case open_buy_slip_modal_if_closed: return {
            ...state,
            buy_slip_modal:{
                show: state.buy_slip_modal.show === false ? true : true
            }
        }
        case close_buy_slip_modal_if_opened: return {
            ...state,
            buy_slip_modal:{
                show: state.buy_slip_modal.show === true ? false : false
            }
        }

        case toggle_add_admin_modal: return {
            ...state,
            add_admin_modal:{
                show: !state.add_admin_modal.show
            }
        }

        // Add Admin Modal
        case open_add_admin_modal_if_closed: return {
            ...state,
            add_admin_modal:{
                show: state.add_admin_modal.show === false ? true : true
            }
        }
        case close_add_admin_modal_if_opened: return {
            ...state,
            add_admin_modal:{
                show: state.add_admin_modal.show === true ? false : false
            }
        }

        // Edit Admin Modal
        case open_edit_admin_modal_if_closed: return {
            ...state,
            edit_admin_modal:{
                show: state.edit_admin_modal.show === false ? true : true
            }
        }
        case close_edit_admin_modal_if_opened: return {
            ...state,
            edit_admin_modal:{
                show: state.edit_admin_modal.show === true ? false : false
            }
        }

        // Edit Client Modal
        case open_edit_client_modal_if_closed: return {
            ...state,
            edit_client_modal:{
                show: true
            }
        }
        case close_edit_client_modal_if_opened: return {
            ...state,
            edit_client_modal:{
                show: false
            }
        }

        // Add Slider Modal
        case open_add_slider_modal_if_closed: return {
            ...state,
            add_slider_modal:{
                show: true
            }
        }
        case close_add_slider_modal_if_opened: return {
            ...state,
            add_slider_modal:{
                show: false
            }
        }

        // Edit Slider Modal
        case open_edit_slider_modal_if_closed: return {
            ...state,
            edit_slider_modal:{
                show: true
            }
        }
        case close_edit_slider_modal_if_opened: return {
            ...state,
            edit_slider_modal:{
                show: false
            }
        }

        // Edit Sport Modal
        case open_edit_sport_modal_if_closed: return {
            ...state,
            edit_sport_modal:{
                show: true
            }
        }
        case close_edit_sport_modal_if_opened: return {
            ...state,
            edit_sport_modal:{
                show: false
            }
        }

        // Edit Withdrawal Modal
        case open_withdrawal_modal_if_closed: return {
            ...state,
            withdrawal_modal:{
                show: true
            }
        }
        case close_withdrawal_modal_if_opened: return {
            ...state,
            withdrawal_modal:{
                show: false
            }
        }

        // Edit Page Modal
        case open_edit_page_modal_if_closed: return {
            ...state,
            edit_page_modal:{
                show: true
            }
        }
        case close_edit_page_modal_if_opened: return {
            ...state,
            edit_page_modal:{
                show: false
            }
        }

        // Confirm Deposit Modal
        case open_confirm_deposit_if_closed: return {
            ...state,
            confirm_deposit_modal:{
                show: true
            }
        }
        case close_confirm_deposit_if_opened: return {
            ...state,
            confirm_deposit_modal:{
                show: false
            }
        }

        // Confirm Deposit Modal
        case open_confirm_transaction_if_closed: return {
            ...state,
            confirm_transaction_modal:{
                show: true
            }
        }
        case close_confirm_transaction_if_opened: return {
            ...state,
            confirm_transaction_modal:{
                show: false
            }
        }

        default: return state
    }
}
