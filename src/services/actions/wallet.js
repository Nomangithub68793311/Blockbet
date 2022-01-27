import {
    connect_wallet,
    disconnect_wallet, reset_form,
    set_balance, submit_form
} from "../constant";
import WalletLink from 'walletlink'
import Web3 from 'web3'
import Axios from "axios";
import {close_buy_slip_modal_if_opened} from "../constant";
import {notify} from "../../library/notification";
import {post} from "../../library/api";

import {closeBuySlipModalIfOpened, closeConfirmDepositIfOpened, openConfirmDepositIfClosed} from "./setting";
import {changeSubmissionStatus} from "./form";

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

export const connectWallet = (callback) => {
    return function(dispatch){
        ethereum.enable().then((accounts) => {
            if (callback){
                callback()
            }
            web3.eth.defaultAccount = accounts[0]
            dispatch({
                connected_wallet: accounts[0],
                type: connect_wallet
            })
        })
    }
}

export const disconnectWallet = (callback) => {
    ethereum.close()
    return {
        connected_wallet: '',
        type: disconnect_wallet
    }
}

export const setBalance = () => {
    return function(dispatch){
        !ethereum.selectedAddress ||
        web3.eth.getBalance(ethereum.selectedAddress).then(eth_bal => {
            Axios.get('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD').then(response => {
                const main_balance = response.data.USD * (eth_bal / 1000000000000000000)
                dispatch({
                    type: set_balance,
                    balance: `$${main_balance.toFixed(2)}`,
                    main_balance: main_balance.toFixed(2),
                    exchange_rate: response.data.USD,
                    eth_balance: (eth_bal / 1000000000000000000)
                })
            })
        })
    }
}

export const initiateTransaction = (data, event, callback) => {
    event.preventDefault()
    return function(dispatch){
        if (!data.amount && Number(data.amount) <= 0){
            notify('Invalid Amount Given.', 'danger')
            return false;
        }


        if (data.deposit_by === 'ETH'){
            dispatch(changeSubmissionStatus(false, true, false))
            notify('Please Don\'t Reload The Page, Otherwise You Will Lose Your Money.', 'danger', 10000)
            notify('Payment Is Being Initiated.', 'success', 10000)

            Axios.get('https://min-api.cryptocompare.com/data/price?fsym=USD&tsyms=ETH').then(currency => {
                const total_price_in_eth = web3.utils.toHex(Math.ceil((currency.data.ETH * data.amount) * 1000000000000000000))
                web3.eth.sendTransaction({
                    value: total_price_in_eth,
                    to: data.to_address,
                    from: ethereum.selectedAddress
                }).then(res=> {
                    if (callback){
                        callback(res)
                    }
                    const formData = new FormData()
                    formData.set('trnx_id', res.transactionHash)
                    formData.set('amount', data.amount)
                    post('initiate-transaction', formData).then(response => {
                        notify('Payment Completed Successfully..', 'success')
                        dispatch({
                            type: close_buy_slip_modal_if_opened
                        })
                        dispatch(changeSubmissionStatus(true, false, true))
                    })
                }).catch(error => {
                    notify('Transaction Canceled.','danger')
                    dispatch(changeSubmissionStatus(true, false, true))
                    dispatch({
                        type: close_buy_slip_modal_if_opened
                    })
                })
            })
        } else {
            dispatch(openConfirmDepositIfClosed())
        }
    }
}


export const confirmTransaction = (data, event, callback) => {
    event.preventDefault()
    return function(dispatch){
        dispatch(changeSubmissionStatus(false, true, false))
        const formData = new FormData()
        formData.set('trnx_hash', data.trnx_hash)
        formData.set('from_address', data.from_address)
        formData.set('amount', data.amount)
        formData.set('deposit_by', data.deposit_by)
        post('confirm-transaction', formData).then(response => {
            dispatch({
                payload: response,
                type: submit_form
            })
            dispatch(changeSubmissionStatus(true, false, true))
            if(Number(response.status_code) === 200) {
                notify(response.message)
                dispatch(closeBuySlipModalIfOpened())
                dispatch(closeConfirmDepositIfOpened())
                dispatch({
                    type: reset_form
                })
            } else {
                notify(response.message)
            }
        })
    }
}