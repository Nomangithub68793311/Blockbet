import React from "react";
import {Card, Table} from "react-bootstrap";
import {Link, Redirect} from "react-router-dom"
import {connect} from "react-redux";
import AccountSidebar from "../../compo/accountSidebar";
import {getBets} from "../../../services/actions/data";
import Pagination from "react-js-pagination";
import Moment from "react-moment";

class Bets extends React.Component {

    componentDidMount() {
        window.scrollTo(0, 0)
        if (!this.props.bets.is_loaded){
            this.props.getBets()
        }
    }

    render() {
        return (
            <>
                {
                    !this.props.session.is_logged_in ?
                        <Redirect to={'/'}/>:
                        <div className="top-container">
                            <main className="content">
                                <div className="max-container bx-account-menu-container">
                                    <div className="bx-account-wrapper custom-form-helper">

                                        <div className="row">

                                            <div className="col-md-3">
                                                <AccountSidebar/>
                                            </div>

                                            <div className="col-md-9 my-3">
                                                <Card className={'pb-0'}>
                                                    <Card.Header>Bets</Card.Header>
                                                    <Card.Body>
                                                        <div className="row px-1 pb-2 justify-content-between">
                                                            <div className="col-md-2">
                                                                <select className={'form-control'} onChange={(e) => this.props.getBets(this.props.bets.page, e.target.value)}>
                                                                    <option value="10">10</option>
                                                                    <option value="20">20</option>
                                                                    <option value="40">40</option>
                                                                    <option value="100">100</option>
                                                                    <option value="250">250</option>
                                                                    <option value="500">500</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <Table bordered hover>
                                                            <thead>
                                                            <tr>
                                                                <th>Event</th>
                                                                <th>Bet On</th>
                                                                <th>Amount</th>
                                                                <th>Return Amount</th>
                                                                <th>Status</th>
                                                                <th>Date</th>
                                                            </tr>
                                                            </thead>
                                                            <tbody>
                                                                {
                                                                    !this.props.bets.is_loaded ||
                                                                        this.props.bets.data.map(item => (
                                                                            <tr key={item.id}>
                                                                                <td>
                                                                                    <Link to={`/event/${item.event_id}`}>{item.title}</Link>
                                                                                </td>
                                                                                <td>{item.odd.market.description} ({item.market_key.toUpperCase()})</td>
                                                                                <td>${item.amount}</td>
                                                                                <td>${(item.amount * (item.odd[item.market_key].split(',').slice(-1)[0])).toFixed(2)}</td>
                                                                                <td>
                                                                                    {item.status.toUpperCase()}
                                                                                    {
                                                                                        item.status !== 'quit'||
                                                                                            ` With $${item.quit_amount}`
                                                                                    }
                                                                                </td>
                                                                                <td>
                                                                                    <Moment date={item.date_created} format={'DD MMM, YYYY HH:MM:SS A'}/>
                                                                                </td>
                                                                            </tr>
                                                                        ))

                                                                }
                                                            </tbody>
                                                        </Table>

                                                        <Pagination
                                                            innerClass={'pagination float-right'}
                                                            pageRangeDisplayed={10}
                                                            activePage={this.props.bets.page}
                                                            itemsCountPerPage={this.props.bets.limit}
                                                            totalItemsCount={this.props.bets.total_data}
                                                            itemClass={'page-item'}
                                                            linkClass={'page-link'}
                                                            onChange={(page) => this.props.getBets(page, this.props.bets.limit)}
                                                        />

                                                    </Card.Body>
                                                </Card>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </main>
                        </div>
                }
            </>
        )
    }
}

const stateToProps = state => ({
    session: state.session,
    bets: {
        data: state.data.bets.data,
        limit: state.data.bets.limit,
        page: state.data.bets.page,
        total_data: state.data.bets.total_data,
        is_loaded: state.data.bets.is_loaded
    }
})

const dispatchToProps = dispatch => ({
    getBets: (page, limit) => dispatch(getBets(page, limit))
})

export default connect(stateToProps, dispatchToProps)(Bets)