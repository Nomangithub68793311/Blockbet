import {
    set_configs
} from "../constant";

const configs = localStorage.getItem('configs')
export const initialState = {
    is_configs_loaded: false,
    configs : JSON.parse(configs) || {}
}

export default function config(state = initialState, action) {
    switch (action.type) {
        case set_configs: return {
            ...state,
            is_configs_loaded: action.is_configs_loaded,
            configs: action.data,
        }

        default: return state
    }
}
