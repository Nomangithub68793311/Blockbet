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
    close_confirm_deposit_if_opened, open_confirm_transaction_if_closed, close_confirm_transaction_if_opened
} from "../constant";


// User Menu
export const toggleUserMenu = () => {
    return {
        type: toggle_user_menu
    }
}

export const openUserMenuIfClosed = () => {
    return {
        type: open_user_menu_if_closed
    }
}

export const closeUserMenuIfOpened = () => {
    return {
        type: close_user_menu_if_opened
    }
}


// Login Modal
export const toggleLoginModal = () => {
    return {
        type: toggle_login_modal
    }
}

export const openLoginModalIfClosed = () => {
    return {
        type: open_login_modal_if_closed
    }
}

export const closeLoginModalIfOpened = () => {
    return {
        type: close_login_modal_if_opened
    }
}


// Registration Modal
export const toggleRegistrationModal = () => {
    return {
        type: toggle_registration_modal
    }
}

export const openRegistrationModalIfClosed = () => {
    return {
        type: open_registration_modal_if_closed
    }
}

export const closeRegistrationModalIfOpened = () => {
    return {
        type: close_registration_modal_if_opened
    }
}


// Buy Slip Modal
export const toggleBuySlipModal = () => {
    return {
        type: toggle_buy_slip_modal
    }
}

export const openBuySlipModalIfClosed = () => {
    return {
        type: open_buy_slip_modal_if_closed
    }
}

export const closeBuySlipModalIfOpened = () => {
    return {
        type: close_buy_slip_modal_if_opened
    }
}


// Add Admin Modal
export const toggleAddAdminModal = () => {
    return {
        type: toggle_add_admin_modal
    }
}

export const openAddAdminModalIfClosed = () => {
    return {
        type: open_add_admin_modal_if_closed
    }
}

export const closeAddAdminModalIfOpened = () => {
    return {
        type: close_add_admin_modal_if_opened
    }
}


// Edit Admin Modal
export const openEditAdminModalIfClosed = (user, callback) => {
    if(callback) {
        callback()
    }
    return {
        type: open_edit_admin_modal_if_closed
    }
}

export const closeEditAdminModalIfOpened = () => {
    return {
        type: close_edit_admin_modal_if_opened
    }
}


// Edit Client Modal
export const openEditClientModalIfClosed = (user, callback) => {
    if(callback) {
        callback(user)
    }
    return {
        type: open_edit_client_modal_if_closed
    }
}

export const closeEditClientModalIfOpened = () => {
    return {
        type: close_edit_client_modal_if_opened
    }
}


// Add Slider Modal
export const openAddSliderModalIfClosed = () => {
    return {
        type: open_add_slider_modal_if_closed
    }
}

export const closeAddSliderModalIfOpened = () => {
    return {
        type: close_add_slider_modal_if_opened
    }
}


// Edit Slider Modal
export const openEditSliderModalIfClosed = (slider, callback) => {
    if(callback) {
        callback(slider)
    }
    return {
        type: open_edit_slider_modal_if_closed
    }
}

export const closeEditSliderModalIfOpened = () => {
    return {
        type: close_edit_slider_modal_if_opened
    }
}


// Edit Sport Modal
export const openEditSportModalIfClosed = (slider, callback) => {
    if(callback) {
        callback(slider)
    }
    return {
        type: open_edit_sport_modal_if_closed
    }
}

export const closeEditSportModalIfOpened = () => {
    return {
        type: close_edit_sport_modal_if_opened
    }
}


// Edit Withdrawal Modal
export const openWithdrawalModalIfClosed = () => {
    return {
        type: open_withdrawal_modal_if_closed
    }
}

export const closeWithdrawalModalIfOpened = () => {
    return {
        type: close_withdrawal_modal_if_opened
    }
}


// Edit Page Modal
export const openEditPageModalIfClosed = (page, callback) => {
    if(callback) {
        callback(page)
    }
    return {
        type: open_edit_page_modal_if_closed
    }
}

export const closeEditPageModalIfOpened = () => {
    return {
        type: close_edit_page_modal_if_opened
    }
}

// Confirm Deposit Modal
export const openConfirmDepositIfClosed = (page, callback) => {
    if(callback) {
        callback(page)
    }
    return {
        type: open_confirm_deposit_if_closed
    }
}

export const closeConfirmDepositIfOpened = () => {
    return {
        type: close_confirm_deposit_if_opened
    }
}

// Confirm Deposit Modal
export const openConfirmTransactionIfClosed = (page, callback) => {
    if(callback) {
        callback(page)
    }
    return {
        type: open_confirm_transaction_if_closed
    }
}

export const closeConfirmTransactionIfOpened = () => {
    return {
        type: close_confirm_transaction_if_opened
    }
}