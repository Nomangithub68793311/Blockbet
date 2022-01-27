import {
    first_name_field,
    last_name_field,
    email_field,
    username_field,
    password_field,
    quantity_field,
    from_eth_address_field,
    limit_field,
    avatar_field,
    current_password_field,
    confirm_password_field,
    site_name_field,
    site_email_field,
    site_logo_field,
    admin_ethereum_address_field,
    title_field,
    subtitle_field,
    banner_field,
    image_field,
    submit_form,
    reset_form,
    withdrawal_address_field,
    amount_field,
    footer_text_field,
    facebook_link_field,
    twitter_link_field,
    content_field,
    trnx_hash_field,
    deposit_by_field, from_address_field, change_submission_status, name_field, message_field
} from "../constant";

export const initialState = {
    first_name: {
        value: undefined,
        error: undefined
    },
    last_name: {
        value: undefined,
        error: undefined
    },
    email: {
        value: undefined,
        error: undefined
    },
    username: {
        value: undefined,
        error: undefined
    },
    current_password: {
        value: undefined,
        error: undefined
    },
    password: {
        value: undefined,
        error: undefined
    },
    confirm_password: {
        value: undefined,
        error: undefined
    },
    quantity: {
        value: undefined,
        error: undefined
    },
    avatar: {
        value: undefined,
        error: undefined
    },
    from_eth_address: {
        value: undefined,
        error: undefined
    },
    limit: {
        value: undefined,
        error: undefined
    },
    site_name: {
        value: undefined,
        error: undefined
    },
    site_email: {
        value: undefined,
        error: undefined
    },
    site_logo: {
        value: undefined,
        error: undefined
    },
    admin_ethereum_address: {
        value: undefined,
        error: undefined
    },
    title: {
        value: undefined,
        error: undefined
    },
    subtitle: {
        value: undefined,
        error: undefined
    },
    button_text: {
        value: undefined,
        error: undefined
    },
    image: {
        value: undefined,
        error: undefined
    },
    withdrawal_address: {
        value: undefined,
        error: undefined
    },
    amount: {
        value: undefined,
        error: undefined
    },
    banner: {
        value: undefined,
        error: undefined
    },
    footer_text: {
        value: undefined,
        error: undefined
    },
    facebook_link: {
        value: undefined,
        error: undefined
    },
    twitter_link: {
        value: undefined,
        error: undefined
    },
    content: {
        value: undefined,
        error: undefined
    },
    trnx_hash: {
        value: undefined,
        error: undefined
    },
    deposit_by: {
        value: undefined,
        error: undefined
    },
    from_address: {
        value: undefined,
        error: undefined
    },
    name: {
        value: undefined,
        error: undefined
    },
    message: {
        value: undefined,
        error: undefined
    },

    submission: {
        will_submit: true,
        submitting: false,
        submitted: false,
    },

    response: {}
}

export default function setting(state = initialState, action) {
    switch (action.type) {
        case first_name_field: return {
            ...state,
            first_name: {
                value: action.value
            }
        }

        case last_name_field: return {
            ...state,
            last_name: {
                value: action.value
            }
        }

        case email_field: return {
            ...state,
            email: {
                value: action.value
            }
        }

        case username_field: return {
            ...state,
            username: {
                value: action.value
            }
        }

        case current_password_field: return {
            ...state,
            current_password: {
                value: action.value
            }
        }

        case password_field: return {
            ...state,
            password: {
                value: action.value
            }
        }

        case confirm_password_field: return {
            ...state,
            confirm_password: {
                value: action.value
            }
        }

        case quantity_field: return {
            ...state,
            quantity: {
                value: action.value
            }
        }

        case avatar_field: return {
            ...state,
            avatar: {
                value: action.value
            }
        }

        case from_eth_address_field: return {
            ...state,
            from_eth_address: {
                value: action.value
            }
        }

        case limit_field: return {
            ...state,
            limit: {
                value: action.value
            }
        }

        case site_name_field: return {
            ...state,
            site_name: {
                value: action.value
            }
        }

        case site_email_field: return {
            ...state,
            site_email: {
                value: action.value
            }
        }

        case site_logo_field: return {
            ...state,
            site_logo: {
                value: action.value
            }
        }

        case admin_ethereum_address_field: return {
            ...state,
            admin_ethereum_address: {
                value: action.value
            }
        }

        case title_field: return {
            ...state,
            title: {
                value: action.value
            }
        }

        case subtitle_field: return {
            ...state,
            subtitle: {
                value: action.value
            }
        }

        case banner_field: return {
            ...state,
            banner: {
                value: action.value
            }
        }

        case image_field: return {
            ...state,
            image: {
                value: action.value
            }
        }

        case withdrawal_address_field: return {
            ...state,
            withdrawal_address: {
                value: action.value
            }
        }

        case amount_field: return {
            ...state,
            amount: {
                value: action.value
            }
        }

        case footer_text_field: return {
            ...state,
            footer_text: {
                value: action.value
            }
        }

        case facebook_link_field: return {
            ...state,
            facebook_link: {
                value: action.value
            }
        }

        case twitter_link_field: return {
            ...state,
            twitter_link: {
                value: action.value
            }
        }

        case content_field: return {
            ...state,
            content: {
                value: action.value
            }
        }

        case trnx_hash_field: return {
            ...state,
            trnx_hash: {
                value: action.value
            }
        }

        case deposit_by_field: return {
            ...state,
            deposit_by: {
                value: action.value
            }
        }

        case from_address_field: return {
            ...state,
            from_address: {
                value: action.value
            }
        }

        case name_field: return {
            ...state,
            name: {
                value: action.value
            }
        }

        case message_field: return {
            ...state,
            message: {
                value: action.value
            }
        }

        case submit_form: return {
            ...state,
            first_name: {
                value: state.first_name.value,
                error: action.payload.errors?.first_name || undefined
            },
            last_name: {
                value: state.last_name.value,
                error: action.payload.errors?.last_name || undefined
            },
            email: {
                value: state.email.value,
                error: action.payload.errors?.email || undefined
            },
            username: {
                value: state.username.value,
                error: action.payload.errors?.username || undefined
            },
            current_password: {
                value: state.current_password.value,
                error: action.payload.errors?.current_password || undefined
            },
            password: {
                value: state.password.value,
                error: action.payload.errors?.password || undefined
            },
            confirm_password: {
                value: state.confirm_password.value,
                error: action.payload.errors?.confirm_password || undefined
            },
            quantity: {
                value: state.quantity.value,
                error: action.payload.errors?.quantity || undefined
            },
            avatar: {
                value: state.avatar.value,
                error: action.payload.errors?.avatar || undefined
            },
            from_eth_address: {
                value: state.from_eth_address.value,
                error: action.payload.errors?.from_eth_address || undefined
            },
            site_name: {
                value: state.site_name.value,
                error: action.payload.errors?.site_name || undefined
            },
            site_email: {
                value: state.site_email.value,
                error: action.payload.errors?.site_email || undefined
            },
            site_logo: {
                value: state.site_logo.value,
                error: action.payload.errors?.site_logo || undefined
            },
            admin_ethereum_address: {
                value: state.admin_ethereum_address.value,
                error: action.payload.errors?.admin_ethereum_address || undefined
            },
            title: {
                value: state.title.value,
                error: action.payload.errors?.title || undefined
            },
            subtitle: {
                value: state.subtitle.value,
                error: action.payload.errors?.subtitle || undefined
            },
            banner: {
                value: state.banner.value,
                error: action.payload.errors?.banner || undefined
            },
            image: {
                value: state.image.value,
                error: action.payload.errors?.image || undefined
            },
            withdrawal_address: {
                value: state.withdrawal_address.value,
                error: action.payload.errors?.withdrawal_address || undefined
            },
            amount: {
                value: state.amount.value,
                error: action.payload.errors?.amount || undefined
            },
            footer_text: {
                value: state.footer_text.value,
                error: action.payload.errors?.footer_text || undefined
            },
            facebook_link: {
                value: state.facebook_link.value,
                error: action.payload.errors?.facebook_link || undefined
            },
            twitter_link: {
                value: state.twitter_link.value,
                error: action.payload.errors?.twitter_link || undefined
            },
            content: {
                value: state.content.value,
                error: action.payload.errors?.content || undefined
            },
            trnx_hash: {
                value: state.trnx_hash.value,
                error: action.payload.errors?.trnx_hash || undefined
            },
            deposit_by: {
                value: state.deposit_by.value,
                error: action.payload.errors?.deposit_by || undefined
            },
            from_address: {
                value: state.from_address.value,
                error: action.payload.errors?.from_address || undefined
            },
            name: {
                value: state.name.value,
                error: action.payload.errors?.name || undefined
            },
            message: {
                value: state.message.value,
                error: action.payload.errors?.message || undefined
            },
            response: action.payload
        }

        case change_submission_status: return {
            ...state,
            submission: {
                will_submit: action.will_submit,
                submitting: action.submitting,
                submitted: action.submitted,
            },
        }

        case reset_form: return {
            ...state,
            first_name: {
                ...state.first_name,
                value: undefined
            },
            last_name: {
                ...state.last_name,
                value: undefined
            },
            email: {
                ...state.email,
                value: undefined
            },
            username: {
                ...state.username,
                value: undefined
            },
            current_password: {
                ...state.current_password,
                value: undefined
            },
            password: {
                ...state.password,
                value: undefined
            },
            confirm_password: {
                ...state.confirm_password,
                value: undefined
            },
            quantity: {
                ...state.quantity,
                value: undefined
            },
            avatar: {
                ...state.avatar,
                value: undefined
            },
            from_eth_address: {
                ...state.from_eth_address,
                value: undefined
            },
            limit: {
                ...state.limit,
                value: undefined
            },
            site_name: {
                ...state.site_name,
                value: undefined
            },
            site_email: {
                ...state.site_email,
                value: undefined
            },
            site_logo: {
                ...state.site_logo,
                value: undefined
            },
            admin_ethereum_address: {
                ...state.admin_ethereum_address,
                value: undefined
            },
            title: {
                ...state.title,
                value: undefined
            },
            subtitle: {
                ...state.subtitle,
                value: undefined
            },
            banner: {
                ...state.banner,
                value: undefined
            },
            image: {
                ...state.image,
                value: undefined
            },
            withdrawal_address: {
                ...state.withdrawal_address,
                value: undefined
            },
            amount: {
                ...state.amount,
                value: undefined
            },
            footer_text: {
                ...state.footer_text,
                value: undefined
            },
            facebook_link: {
                ...state.facebook_link,
                value: undefined
            },
            twitter_link: {
                ...state.twitter_link,
                value: undefined
            },
            content: {
                ...state.content,
                value: undefined
            },
            trnx_hash: {
                ...state.trnx_hash,
                value: undefined
            },
            deposit_by: {
                ...state.deposit_by,
                value: undefined
            },
            from_address: {
                ...state.from_address,
                value: undefined
            },
            name: {
                ...state.name,
                value: undefined
            },
            message: {
                ...state.message,
                value: undefined
            },
            response: {}
        }

        default: return state
    }
}
