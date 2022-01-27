import {
    connect_wallet, disconnect_wallet, set_balance
} from "../constant";
import WalletLink from 'walletlink'
import Web3 from 'web3'

const APP_NAME = 'Betting Site'
const APP_LOGO_URL = 'https://cdn.iconscout.com/icon/free/png-512/sport-game-batsman-cricket-player-bat-ball-pad-gloves-helmet-29296.png'
const ETH_JSONRPC_URL = 'https://mainnet.infura.io/v3/d1826660b60c4b1094172921b454f76e'
const CHAIN_ID = 1

// Initialize WalletLink
export const walletLink = new WalletLink({
    appName: APP_NAME,
    appLogoUrl: APP_LOGO_URL,
    darkMode: false
})

// Initialize a Web3 Provider object
export const ethereum = walletLink.makeWeb3Provider(ETH_JSONRPC_URL, CHAIN_ID)

// Initialize a Web3 object
export const web3 = new Web3(ethereum)

export const initialState = {
    is_connected: !!ethereum.selectedAddress,
    balance: '',
    main_balance: '',
    exchange_rate: '',
    eth_balance: '',
    connected_wallet: ethereum.selectedAddress,
}

export default function wallet(state = initialState, action) {
    switch (action.type) {
        case connect_wallet: return {
            ...state,
            is_connected: true,
            connected_wallet: action.connected_wallet,
        }

        case disconnect_wallet: return {
            ...state,
            is_connected: false,
            connected_wallet: action.connected_wallet,
        }

        case set_balance: return {
            ...state,
            balance: action.balance,
            main_balance: action.main_balance,
            exchange_rate: action.exchange_rate,
            eth_balance: action.eth_balance
        }

        default: return state
    }
}
