import {
    set_configs
} from "../constant";
import {get} from "../../library/api";

export const setConfigs = () => {
    return function(dispatch){
        get('get-configs').then(response => {
            localStorage.setItem('configs', JSON.stringify(response.data))
            dispatch({
                is_configs_loaded: true,
                data: response.data,
                type: set_configs
            })
        })
    }
}
