import React from "react";
import {Link} from "react-router-dom";
import moment from 'moment'
import {Card, Table, Alert} from "react-bootstrap";
import LeftSidebar from "../compo/leftSidebar";
import '../css/sportsMenu.css'
import {getInPlayAndUpcomingEventsBySport} from '../../services/actions/data'
import {connect} from "react-redux";
import DeviceIdentifier from 'react-device-identifier';

class Sports extends React.Component {

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {params} = this.props.match
        if (this.props.sport_id !== params.sport_id) {
            window.scrollTo(0, 0)

            this.props.getInPlayAndUpcomingEventsBySport(params.sport_id)
        }
    }

    componentDidMount() {
        const {params} = this.props.match
        this.props.getInPlayAndUpcomingEventsBySport(params.sport_id)
        window.scrollTo(0, 0)
    }

    renderSportEvents = () => {
        return (
            <>
                <h3 className={'h3-heading mb-3'}>In Play Events</h3>

                {
                    this.props.events?.in_play === undefined ||
                    Object.keys(this.props.events?.in_play).length < 1 ?
                        <Alert key={1} variant={'warning'}>
                            No In Play Events Found Right Now.
                        </Alert>:
                        this.props.events.in_play.map(item => (
                            <Card className={'pb-0 mb-2'} key={item.id}>
                                <Table bordered className={'mb-0'}>
                                    <thead>
                                    <tr>
                                        <td colSpan={2} className={'w-75'}>{item.league.name}</td>
                                        <td>Score</td>
                                        <td>Action</td>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td rowSpan={3} className={'align-middle text-center w-25 bg-success'}>
                                            <strong className={'text-white'}>Live</strong>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>{item.home_team.name}</td>
                                        <td className={'align-middle text-center'}>{item.score_summary?.home || 0}</td>
                                        <td className={'align-middle text-center'} rowSpan={2}>
                                            <Link to={'/event/'+item.id}>
                                                View Details
                                            </Link>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>{item.away_team.name}</td>
                                        <td className={'align-middle text-center'}>{item.score_summary?.away || 0}</td>
                                    </tr>
                                    </tbody>
                                </Table>
                            </Card>
                        ))
                }

                <h3 className={'h3-heading mb-3 mt-5'}>Upcoming Events</h3>

                {
                    this.props.events?.upcoming === undefined ||
                    Object.keys(this.props.events?.upcoming).length < 1 ?
                        <Alert key={2} variant={'warning'}>
                            No Upcoming Events Found Right Now.
                        </Alert>:
                        this.props.events?.upcoming.map(item => (
                            <Card className={'pb-0 mb-3'} key={item.id}>
                                <Table bordered className={'mb-0'}>
                                    <thead>
                                    <tr>
                                        <td colSpan={2} className={'w-75'}>{item.league.name}</td>
                                        <td>Spread</td>
                                        <td>Action</td>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td rowSpan={3} className={'align-middle text-center w-25'}>
                                            <span className={'mb-1 d-block'}>{moment(item.time).local().format('MMM DD, YYYY')}</span>
                                            <span>{moment(item.time).local().format('h:mm:ss a')}</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className={'align-middle text-center'}>{item.home_team.name}</td>
                                        <td className={'align-middle text-center'}>{item.score_summary?.home || 0}</td>
                                        <td className={'align-middle text-center'} rowSpan={2}>
                                            <Link to={'/event/'+item.id}>View Detils</Link>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className={'align-middle text-center'}>{item.away_team.name}</td>
                                        <td className={'align-middle text-center'}>{item.score_summary?.away || 0}</td>
                                    </tr>
                                    </tbody>
                                </Table>
                            </Card>
                        ))
                }
            </>
        )
    }

    render() {
        return (
            <div className={'top-container'}>
                <div className={'sp-top-visible'}>

                    {/*<BottomHeader full={true}/>*/}

                    <div className="sp-main-content max-container my-3">

                        <DeviceIdentifier isDesktop={true} isTablet={true} >

                            <div className="col-md-3">
                                <LeftSidebar />
                            </div>

                            <div className="col-md-9">
                                {
                                    this.renderSportEvents()
                                }
                            </div>

                        </DeviceIdentifier>

                        <DeviceIdentifier isMobile={true}>

                            <div className="col-md-9">
                                {
                                    this.renderSportEvents()
                                }
                            </div>

                            <div className="col-md-3">
                                <LeftSidebar />
                            </div>

                        </DeviceIdentifier>

                    </div>

                </div>
            </div>
        )
    }
}

const stateToProps = state => ({
    events: state.data.events,
    sport_id: state.data.sport_id
})

const dispatchToProps = dispatch => ({
    getInPlayAndUpcomingEventsBySport: (sport_id) => dispatch(getInPlayAndUpcomingEventsBySport(sport_id)),
})

export default connect(stateToProps, dispatchToProps)(Sports)
