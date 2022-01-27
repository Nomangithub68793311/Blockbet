import {
    set_session,
    reset_session,
    close_user_menu_if_opened
} from "../constant";

import {get} from "../../library/api";


export const setSession = (data) => {
    localStorage.setItem('session', JSON.stringify(data))
    return {
        data: data,
        type: set_session
    }
}

export const resetSession = (send_logout=true,callback) => {
    return function(dispatch){
        if(localStorage.getItem('session')){
            if(send_logout){
                get('logout').then(res => {
                    localStorage.removeItem('session')
                    if(callback){
                        callback(res)
                    }
                })
            }
            localStorage.removeItem('session')
        }
        dispatch({
            type: reset_session
        })
        dispatch({
            type: close_user_menu_if_opened
        })
    }
}
