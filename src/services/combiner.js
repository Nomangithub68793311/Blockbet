import {combineReducers} from "redux"
import setting from "./reducers/setting"
import form from "./reducers/form"
import session from "./reducers/session"
import wallet from "./reducers/wallet"
import data from "./reducers/data"
import config from "./reducers/config"
import bets from './reducers/bets'

export default combineReducers({
    setting, form, session, wallet, data, config, bets
})
