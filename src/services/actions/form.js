import {
    first_name_field,
    last_name_field,
    email_field,
    username_field,
    password_field,
    quantity_field,
    avatar_field,
    from_eth_address_field,
    limit_field,
    current_password_field,
    confirm_password_field,
    site_name_field,
    site_email_field,
    site_logo_field,
    admin_ethereum_address_field,
    submit_form,
    reset_form,
    title_field,
    subtitle_field,
    banner_field,
    image_field,
    withdrawal_address_field,
    amount_field,
    footer_text_field,
    facebook_link_field,
    twitter_link_field,
    content_field,
    trnx_hash_field,
    deposit_by_field,
    from_address_field,
    change_submission_status,
    name_field,
    message_field
} from "../constant";

import {post} from "../../library/api";
import {get_value, processData} from "../../library/form";
import {notify} from "../../library/notification";


export const changeFirstNameField = (value) => {
    return {
        value: value,
        type: first_name_field
    }
}

export const changeLastNameField = (value) => {
    return {
        value: value,
        type: last_name_field
    }
}

export const changeEmailField = (value) => {
    return {
        value: value,
        type: email_field
    }
}

export const changeUsernameField = (value) => {
    return {
        value: value,
        type: username_field
    }
}

export const changeCurrentPasswordField = (value) => {
    return {
        value: value,
        type: current_password_field
    }
}

export const changePasswordField = (value) => {
    return {
        value: value,
        type: password_field
    }
}

export const changeConfirmPasswordField = (value) => {
    return {
        value: value,
        type: confirm_password_field
    }
}

export const changeQuantityField = (value, callback=null) => {
    if (callback){
        callback(value)
    }
    return {
        value: value,
        type: quantity_field
    }
}

export const changeFromEthAddressField = (value) => {
    return {
        value: value,
        type: from_eth_address_field
    }
}

export const changeAvatarField = (value) => {
    console.log(value)
    return {
        value: value,
        type: avatar_field
    }
}

export const changeLimitField = (value, callback=undefined) => {
    if(callback){
        callback(value)
    }
    return {
        value: value,
        type: limit_field
    }
}

export const changeSiteNameField = (value, callback=undefined) => {
    return {
        value: value,
        type: site_name_field
    }
}

export const changeSiteEmailField = (value, callback=undefined) => {
    return {
        value: value,
        type: site_email_field
    }
}

export const changeSiteLogoField = (value, callback=undefined) => {
    return {
        value: value,
        type: site_logo_field
    }
}

export const changeAdminEthereumAddressField = (value, callback=undefined) => {
    return {
        value: value,
        type: admin_ethereum_address_field
    }
}

export const changeTitleField = (value, callback=undefined) => {
    return {
        value: value,
        type: title_field
    }
}

export const changeSubtitleField = (value, callback=undefined) => {
    return {
        value: value,
        type: subtitle_field
    }
}

export const changeBannerField = (value, callback=undefined) => {
    return {
        value: value,
        type: banner_field
    }
}

export const changeImageField = (value, callback=undefined) => {
    return {
        value: value,
        type: image_field
    }
}

export const changeWithdrawalAddressField = (value) => {
    return {
        value: value,
        type: withdrawal_address_field
    }
}

export const changeAmountField = (value, prev=0) => {
    return {
        value: get_value(value, prev, value!==prev),
        type: amount_field
    }
}

export const changeFooterTextField = (value) => {
    return {
        value: value,
        type: footer_text_field
    }
}

export const changeFacebookLinkField = (value) => {
    return {
        value: value,
        type: facebook_link_field
    }
}

export const changeTwitterLinkField = (value) => {
    return {
        value: value,
        type: twitter_link_field
    }
}

export const changeContentField = (value) => {
    return {
        value: value,
        type: content_field
    }
}

export const changeTrnxHashField = (value) => {
    return {
        value: value,
        type: trnx_hash_field
    }
}

export const changeDepositByField = (value) => {
    return {
        value: value,
        type: deposit_by_field
    }
}

export const changeFromAddressField = (value) => {
    return {
        value: value,
        type: from_address_field
    }
}

export const changeNameField = (value) => {
    return {
        value: value,
        type: name_field
    }
}

export const changeMessageField = (value) => {
    return {
        value: value,
        type: message_field
    }
}

export const changeSubmissionStatus = (will_submit=false, submitting=true, submitted=false) => {
    return {
        type: change_submission_status,
        will_submit: will_submit,
        submitting: submitting,
        submitted: submitted
    }
}

export const submitForm = (endpoint, values, event, callback) => {
    event.preventDefault()
    return function(dispatch){
        const form_data = processData(values)
        dispatch(changeSubmissionStatus(false, true, false))

        post(endpoint, form_data).then(res => {
            if(res.message && res.status){
                notify(res.message, res.status)
            }
            if (callback){
                callback(res)
            }
            dispatch(changeSubmissionStatus(true, false, true))
            dispatch({
                payload: res,
                type: submit_form
            })
            dispatch({
                type: reset_form
            })
        })
    }
}