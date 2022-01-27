import Axios from "axios";
import {resetSession, setSession} from "../services/actions/session";
import store from "../services/store";

const host = 'http://34.123.206.186:5000/'

const get_headers = () => {
    const session = JSON.parse(localStorage.getItem('session'))
    const referrer = JSON.parse((localStorage.getItem('referrer')))
    return {
        "auth-key": session?.token || undefined,
        "referrer-id": referrer || undefined
    }
}

const make_url = (endpoint) => {
    return host + endpoint
}

export const get = (endpoint) => {
    return Axios.get(make_url(endpoint),{
        headers: get_headers()
    }).then(res => {
        manageSession(res.data.session)
        return res.data
    }).catch(error => {
        const res = error.response.data
        manageSession(res.session)
        return res
    })
}

export const post = (endpoint, data) => {
    return Axios.post(make_url(endpoint), data,{
        headers: get_headers()
    }).then(res => {
        manageSession(res.data.session)
        return res.data
    }).catch(error => {
        const res = error.response.data
        manageSession(res.session)
        return res
    })
}

const manageSession = (response) => {
    const session = store.getState().session
    if (response) {
        if(session) {
            if(response.authenticated === false) {
                store.dispatch(resetSession(false))
            } else {
                store.dispatch(setSession(response))
            }
        } else {
            store.dispatch(resetSession(false))
        }
    } else {
        store.dispatch(resetSession(false))
    }
}