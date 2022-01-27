import React from "react";
import moment from 'moment'
import {Card, Table, Badge} from "react-bootstrap";
import '../css/sportsMenu.css'
import LeftSidebar from "../compo/leftSidebar";
import {getEventWithOdds, getEventBetsByUser, resetEventWithOdds} from "../../services/actions/data";
import {addToPendingBet} from "../../services/actions/bets";
import {connect} from "react-redux";
import RightSidebar from "../compo/rightSidebar";
import { Event } from 'react-socket-io';

class SingleEvent extends React.Component {

    componentDidMount() {
        const {params} = this.props.match
        this.props.resetEventWithOdds()
        this.props.getEventWithOdds(params.event_id)
        if(this.props.session.is_client_logged_in){
            window.scrollTo(0, 0)
            this.props.getEventBetsByUser(params.event_id)
        }
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS) {
        const {params} = this.props.match
        if (params.event_id !== this.props.event_id && params.event_id !== prevProps.event_id){
            this.props.getEventWithOdds(params.event_id)
            if(this.props.session.is_client_logged_in){
                window.scrollTo(0, 0)
                this.props.getEventBetsByUser(params.event_id)
            }
        }
    }

    getWinningTeam = () => {
        if(!this.props.event.result_processed){
            return (
                <h1>Result Is Being Processed......</h1>
            )
        }else {
            if(this.props.event.result.winner === 'home'){
                return (
                    <h1>{this.props.event.home_team.name} Won The Game</h1>
                )
            } else if (this.props.event.result.winner === 'away') {
                return (
                    <h1>{this.props.event.away_team.name} Won The Game</h1>
                )
            } else if (this.props.event.result.winner === 'both') {
                return (
                    <h1>Game Drawn</h1>
                )
            }
        }
    }

    render() {
        return (
            <div className={'top-container'}>

                <Event event={`${this.props.event_id}-event-updated`} handler={() => this.props.getEventWithOdds(this.props.event_id)} />

                <div className={'sp-top-visible'}>

                    <div className="sp-main-content max-container">

                        <div className="col-md-3">
                            <LeftSidebar/>
                        </div>

                        <div className="col-md-6">
                            {
                                !this.props.is_event_loaded ||
                                <Card className={'pb-0 mb-5'}>
                                    <Table className={'mb-0'}>

                                        <tbody>
                                            <tr>
                                                <td className={'text-left w-50'} colSpan={2}>

                                                    {this.props.event?.league.name}

                                                </td>
                                                <td className={'text-right w-50'} colSpan={2}>

                                                    {
                                                        this.props.event?.event_status === 'in_play' ?
                                                            <Badge variant="success" className={'ml-3'}>Live Play</Badge>:
                                                            <span className={'ml-3'}>Date : {moment(this.props.event?.time).format('MMM DD, yyyy, hh:MM A')}</span>
                                                    }

                                                </td>
                                            </tr>
                                        </tbody>

                                    </Table>

                                    <Table className={'mb-0'}>
                                        <tbody>
                                            <tr>
                                                <td className={'w-25 text-left align-middle'}>{this.props.event?.home_team?.name}</td>
                                                <td className={'w-50 text-center align-middle'}>
                                                    <span className={'mr-5 align-middle'}>{this.props.event?.score_summary?.home || 0}</span>
                                                    <span className={'text-center'}>
                                                    <Badge variant="success" className={'p-3'}>VS</Badge>
                                                </span>
                                                    <span className={'ml-5 align-middle'}>{this.props.event?.score_summary?.away || 0}</span>
                                                </td>
                                                <td className={'w-25 text-right align-middle'}>{this.props.event?.away_team?.name}</td>
                                            </tr>
                                        </tbody>
                                    </Table>

                                </Card>
                            }

                            {
                                !this.props.is_event_loaded ||
                                    this.props.event.event_status !== 'ended'?
                                        this.props.odds?.map(odd => (
                                            <Card className={'pb-0 mb-3'}>
                                                <Table className={'mb-0'} bordered>
                                                    <tbody>
                                                        <tr>
                                                            <td colSpan={6}>{odd.market?.description}</td>
                                                        </tr>
                                                        <tr>
                                                            {
                                                                odd.home?
                                                                    <td className={'text-left'}>
                                                                        Home
                                                                    </td>:
                                                                    ''
                                                            }
                                                            {
                                                                odd.over?
                                                                    <td className={'text-left'}>
                                                                        Over
                                                                    </td>:
                                                                    ''
                                                            }
                                                            {
                                                                odd.draw?
                                                                    <td className={'text-center'}>
                                                                        Draw
                                                                    </td>:
                                                                    ''
                                                            }
                                                            {
                                                                odd.handicap?
                                                                    <td className={'text-center'}>
                                                                        Handicap
                                                                    </td>:
                                                                    ''
                                                            }
                                                            {
                                                                odd.away?
                                                                    <td className={'text-right'}>
                                                                        Away
                                                                    </td>:
                                                                    ''
                                                            }
                                                            {
                                                                odd.under?
                                                                    <td className={'text-right'}>
                                                                        Under
                                                                    </td>:
                                                                    ''
                                                            }
                                                        </tr>
                                                        <tr>
                                                            {
                                                                odd.home?
                                                                    odd.home !== '-' ?
                                                                        <td className={'text-left cursor-pointer'} onClick={(e) => this.props.addToPendingBet({
                                                                            event_id: this.props.event_id,
                                                                            event_name: `${this.props.event.home_team.name} VS ${this.props.event.away_team.name}`,
                                                                            odd_id: odd.id,
                                                                            odd_market_name:odd.market.description,
                                                                            odd: odd.home,
                                                                            key: 'home',
                                                                        })}>
                                                                            {odd.home}
                                                                        </td>
                                                                        :
                                                                        <td className={'text-left cursor-pointer'}>{odd.home}</td>
                                                                    :
                                                                    ''
                                                            }
                                                            {
                                                                odd.over?
                                                                    odd.over !== '-'?
                                                                        <td className={'text-left cursor-pointer'} onClick={(e) => this.props.addToPendingBet({
                                                                            event_id: this.props.event_id,
                                                                            event_name: `${this.props.event.home_team.name} VS ${this.props.event.away_team.name}`,
                                                                            odd_id: odd.id,
                                                                            odd_market_name:odd.market.description,
                                                                            odd: odd.over,
                                                                            key: 'over',
                                                                        })}>
                                                                            {odd.over}
                                                                        </td>
                                                                        :
                                                                        <td className={'text-left cursor-pointer'}>{odd.over}</td>
                                                                    :
                                                                    ''
                                                            }
                                                            {
                                                                odd.draw?
                                                                    odd.draw !== '-' ?
                                                                        <td className={'text-center cursor-pointer'} onClick={(e) => this.props.addToPendingBet({
                                                                            event_id: this.props.event_id,
                                                                            event_name: `${this.props.event.home_team.name} VS ${this.props.event.away_team.name}`,
                                                                            odd_id: odd.id,
                                                                            odd_market_name:odd.market.description,
                                                                            odd: odd.draw,
                                                                            key: 'draw',
                                                                        })}>
                                                                            {odd.draw}
                                                                        </td>
                                                                        :
                                                                        <td className={'text-center cursor-pointer'}>{odd.draw}</td>
                                                                    :
                                                                    ''
                                                            }
                                                            {
                                                                odd.handicap?
                                                                    odd.handicap !== '-' ?
                                                                        <td className={'text-center cursor-pointer'} onClick={(e) => this.props.addToPendingBet({
                                                                            event_id: this.props.event_id,
                                                                            event_name: `${this.props.event.home_team.name} VS ${this.props.event.away_team.name}`,
                                                                            odd_id: odd.id,
                                                                            odd_market_name:odd.market.description,
                                                                            odd: odd.handicap,
                                                                            key: 'handicap',
                                                                        })}>
                                                                            {odd.handicap}
                                                                        </td>
                                                                        :
                                                                        <td className={'text-center cursor-pointer'}>{odd.handicap}</td>
                                                                    :
                                                                    ''
                                                            }
                                                            {
                                                                odd.away?
                                                                    odd.away !== '-'?
                                                                        <td className={'text-right cursor-pointer'} onClick={(e) => this.props.addToPendingBet({
                                                                            event_id: this.props.event_id,
                                                                            event_name: `${this.props.event.home_team.name} VS ${this.props.event.away_team.name}`,
                                                                            odd_id: odd.id,
                                                                            odd_market_name:odd.market.description,
                                                                            odd: odd.away,
                                                                            key: 'away',
                                                                        })}>
                                                                            {odd.away}
                                                                        </td>
                                                                        :
                                                                        <td className={'text-right cursor-pointer'}>{odd.away}</td>
                                                                    :
                                                                    ''
                                                            }
                                                            {
                                                                odd.under?
                                                                    odd.under !== '-' ?
                                                                        <td className={'text-right cursor-pointer'} onClick={(e) => this.props.addToPendingBet({
                                                                            event_id: this.props.event_id,
                                                                            event_name: `${this.props.event.home_team.name} VS ${this.props.event.away_team.name}`,
                                                                            odd_id: odd.id,
                                                                            odd_market_name:odd.market.description,
                                                                            odd: odd.under,
                                                                            key: 'under',
                                                                        })}>
                                                                            {odd.under}
                                                                        </td>
                                                                        :
                                                                        <td className={'text-right cursor-pointer'}>{odd.under}</td>
                                                                    :
                                                                    ''
                                                            }
                                                        </tr>
                                                    </tbody>
                                                </Table>
                                            </Card>
                                        ))
                                    :
                                    <>
                                        {
                                            this.getWinningTeam()
                                        }
                                    </>
                            }
                        </div>

                        <div className="col-md-3">
                            <RightSidebar/>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

const stateToProps = state => ({
    pending_bets: state.bets.pending_bets,
    session: state.session,
    event_id: state.data.event_id,
    event: state.data.event.event,
    odds: state.data.event.odds,
    is_event_loaded: state.data.is_event_loaded
})

const dispatchToProps = dispatch => ({
    getEventWithOdds: (event) => dispatch(getEventWithOdds(event)),
    resetEventWithOdds: () => dispatch(resetEventWithOdds()),
    getEventBetsByUser: (event) => dispatch(getEventBetsByUser(event)),
    addToPendingBet: (data) => dispatch(addToPendingBet(data)),
})

export default connect(stateToProps, dispatchToProps)(SingleEvent)
