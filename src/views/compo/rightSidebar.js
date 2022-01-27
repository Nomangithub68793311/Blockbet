import React from "react";
import {Card, Tabs, Tab, Button} from "react-bootstrap";
import {connect} from "react-redux";
import {toggleBuySlipModal, toggleLoginModal} from "../../services/actions/setting";
import {connectWallet, setBalance} from "../../services/actions/wallet";
import {quitBet, removeFromPendingBet, submitPendingBet} from "../../services/actions/bets";
import {changeQuantityField} from "../../services/actions/bets";
import {getEventBetsByUser} from "../../services/actions/data";
import moment from 'moment'

class RightSidebar extends React.Component {

    getOdd = (id, market_key) => {
        const odd = this.props.odds?.filter(item => item.market.id === id)[0]
        if (odd !== undefined && market_key in odd){
            return {
                id: odd.id,
                odd: odd.on_quit[market_key]
            }
        } else {
            return false
        }
    }

    render() {
        return (
            <>
                <Tabs fill>
                    <Tab eventKey="bet-slips" title="Bet Slip">
                        {
                            this.props.session.is_client_logged_in?
                                this.props.user.available_balance > 0 || this.props.user.bonus_balance > 0?
                                    <>
                                        {
                                            Object.keys(this.props.pending_bets).length < 1 ?
                                            <p>
                                                <Card className={'pb-0'}>
                                                    <Card.Body>
                                                        <p>No Bets</p>
                                                    </Card.Body>
                                                </Card>
                                            </p>:
                                                this.props.pending_bets.map((item, index) => (
                                                    <>
                                                        <Card className={'pb-0 mb-2 text-black mt-3'}>
                                                            <Card.Header className={'p-3'}>
                                                                {item.odd_market_name} ({item.key.toUpperCase()})
                                                                <span className={'float-right cursor-pointer'} onClick={() => this.props.removeFromPendingBet(index)}>
                                                                    <i className={'icon icon-close'}></i>
                                                                </span>
                                                            </Card.Header>
                                                            <Card.Body className={'p-3'}>
                                                                <p className={'mb-2'}>{item.event_name}</p>
                                                                <input type="text" className={'form-control mb-2'} value={item.quantity || ''} onChange={(e) => this.props.changeQuantityField(e.target.value, index)}/>

                                                                <p><strong>Total Stake </strong> : {item.quantity}</p>
                                                                <p><strong>Total Wining </strong> : ${item.quantity * item.odd.split(',').slice(-1)[0].replace('-','')}</p>

                                                                <Button variant="primary" className={'mt-2'} block onClick={() => this.props.submitPendingBet({
                                                                    event_id: item.event_id,
                                                                    odd_id: item.odd_id,
                                                                    market_key: item.key,
                                                                    amount: item.quantity,
                                                                    index: index
                                                                })}>Bet Now</Button>
                                                            </Card.Body>
                                                        </Card>
                                                    </>
                                                ))
                                        }
                                    </>
                                    :
                                    <>
                                        <Card className={'pb-0'}>
                                            <Card.Body>
                                                <p className={'mb-2 text-black'}>{this.props.user.available_slip} Balance Available For Betting</p>
                                                <Button block onClick={() => this.props.toggleBuySlipModal()}>Deposit Now</Button>
                                            </Card.Body>
                                        </Card>
                                    </>
                                :
                                <>
                                    <Card className={'pb-0'}>
                                        <Card.Body>
                                            <Button block onClick={() => this.props.toggleLoginModal()}>Login To Bet</Button>
                                        </Card.Body>
                                    </Card>
                                </>
                        }
                    </Tab>
                    <Tab eventKey="My Bets" title="My Bets">
                        {
                            !this.props.session.is_client_logged_in ||
                            Object.keys(this.props.event_bets).length < 1 ?
                                <>
                                    <Card className={'pb-0'}>
                                        <Card.Body>
                                            <p>No Bets</p>
                                        </Card.Body>
                                    </Card>
                                </>
                                :
                                this.props.event_bets.map((item, index) => (
                                    <>
                                        <Card className={'pb-0 mb-2 text-black mt-3'}>
                                            <Card.Header className={'p-3'}>
                                                {item.odd.market.description} ({item.market_key.toUpperCase()})
                                            </Card.Header>
                                            <Card.Body className={'p-3'}>
                                                <p className={'mb-2'}><strong>{item.title}</strong></p>
                                                <p className={'mb-2'}><strong>Total Stake</strong> : {item.amount}</p>
                                                <p className={'mb-2'}><strong>Total Wining </strong> : ${
                                                    (item.amount * (item.odd[item.market_key])).toFixed(2)
                                                }</p>
                                                {
                                                    this.props.event.event_status === 'ended' ||
                                                        /*!moment.utc(moment.now()).isAfter((moment.utc(item.date_created).add({minute:30}))) ||*/
                                                            <Button variant={'danger'} block
                                                                onClick={() => this.props.quitBet({
                                                                    'bet_id': item.id,
                                                                    'quit_odd_id': this.getOdd(item.odd.market.id, item.market_key).id
                                                                })}
                                                            >Quit Now With ${
                                                                (this.getOdd(item.odd.market.id, item.market_key).odd * item.amount).toFixed(2) ?? 'None'
                                                            }</Button>
                                                }
                                            </Card.Body>
                                        </Card>
                                    </>
                                ))
                        }
                    </Tab>
                </Tabs>
            </>
        )
    }

}

const stateToProps = state => ({
    buy_slip_modal: state.setting.buy_slip_modal,
    wallet: state.wallet,
    session: state.session,
    event: state.data.event.event,
    odds: state.data.event.odds,
    event_bets: state.data.event.bets || {},
    is_event_loaded: state.data.is_event_loaded,
    user: state.session.user,
    pending_bets: state.bets.pending_bets
})

const dispatchToProps = dispatch => ({
    toggleLoginModal: () => dispatch(toggleLoginModal()),
    connectWallet: () => dispatch(connectWallet(() => {
        dispatch(setBalance())
    })),
    removeFromPendingBet: (index) => dispatch(removeFromPendingBet(index)),
    submitPendingBet: (data) => dispatch(submitPendingBet(data, res => {
        dispatch(getEventBetsByUser(res.data.event_id))
    })),
    changeQuantityField: (data, index) => dispatch(changeQuantityField(data, index)),
    quitBet: (data) => dispatch(quitBet(data, response => {
        dispatch(getEventBetsByUser(response.data.event_id))
    })),
    toggleBuySlipModal: () => dispatch(toggleBuySlipModal())
})

export default connect(stateToProps, dispatchToProps)(RightSidebar)
