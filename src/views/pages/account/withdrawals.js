import React from "react";
import {Card, Table, Button} from "react-bootstrap";

import {connect} from "react-redux";
import AccountSidebar from "../../compo/accountSidebar";
import {getWithdrawals} from "../../../services/actions/data";
import Pagination from "react-js-pagination";
import {Redirect} from "react-router-dom";
import {get} from "../../../library/api";
import {notify} from "../../../library/notification";
import Moment from "react-moment";

class Withdrawals extends React.Component {

    handleStatusActionButtonClick = (id, status) => {
        get(`update-payout-request-status/${id}/${status}`).then(response => {
            notify(response.message, response.status)
            this.props.getWithdrawals()
        })

    }

    componentDidMount() {
        window.scrollTo(0, 0)
        if (!this.props.withdrawals.is_loaded) {
            this.props.getWithdrawals()
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
                                                    <Card.Header>
                                                        <div className="d-flex justify-content-between align-items-center">
                                                            <span className={'align-middle'}>Withdrawals</span>
                                                        </div>
                                                    </Card.Header>
                                                    <Card.Body>
                                                        <div className="row px-1 pb-2 justify-content-between">
                                                            <div className="col-md-2">
                                                                <select className={'form-control'} onChange={(e) => this.props.getWithdrawals(this.props.transactions.page, e.target.value, this.props.transactions.search)}>
                                                                    <option value="10">10</option>
                                                                    <option value="20">20</option>
                                                                    <option value="40">40</option>
                                                                    <option value="100">100</option>
                                                                    <option value="250">250</option>
                                                                    <option value="500">500</option>
                                                                </select>
                                                            </div>
                                                            <div className="col-md-3">
                                                                <input className={'form-control'}  onChange={(e) => this.props.getWithdrawals(this.props.transactions.page, this.props.transactions.limit, e.target.value)}/>
                                                            </div>
                                                        </div>
                                                        <Table bordered hover responsive>
                                                            <thead>
                                                            <tr>
                                                                <th>To Address</th>
                                                                <th>Amount</th>
                                                                <th>Status</th>
                                                                <th>Date</th>
                                                                {
                                                                    this.props.session.is_admin_logged_in ?
                                                                        <th>Action</th>
                                                                        :
                                                                        ''
                                                                }
                                                            </tr>
                                                            </thead>
                                                            <tbody>
                                                            {
                                                                !this.props.withdrawals.is_loaded ||
                                                                this.props.withdrawals.data.map(item => (
                                                                    <tr key={item.id}>
                                                                        <td className={'align-middle'}>{item.to_address}</td>
                                                                        <td className={'align-middle'}>${item.amount}</td>
                                                                        <td className={'align-middle'}>{item.status.toUpperCase()}</td>
                                                                        <td>
                                                                            <Moment date={item.date_created} format={'DD MMM, YYYY HH:MM:SS A'}/>
                                                                        </td>
                                                                        {
                                                                            this.props.session.is_admin_logged_in ?
                                                                                <td className={'align-middle'}>
                                                                                    {
                                                                                        item.status === 'success' || item.status === 'canceled' ?
                                                                                            "Done" :
                                                                                            <>
                                                                                                <Button variant={'success'} size={'sm'} className={'mr-1'} onClick={() => this.handleStatusActionButtonClick(item.id, 'success')}>
                                                                                                    <i className={'icon icon-checked'}/>
                                                                                                </Button>
                                                                                                <Button variant={'danger'} size={'sm'} className={'mr-1'} onClick={() => this.handleStatusActionButtonClick(item.id, 'canceled')}>
                                                                                                    <i className={'icon icon-close'}/>
                                                                                                </Button>
                                                                                            </>
                                                                                    }
                                                                                </td>
                                                                                :
                                                                                ""
                                                                        }
                                                                    </tr>
                                                                ))

                                                            }
                                                            </tbody>
                                                        </Table>

                                                        <Pagination
                                                            innerClass={'pagination float-right'}
                                                            pageRangeDisplayed={10}
                                                            activePage={this.props.withdrawals.page}
                                                            itemsCountPerPage={this.props.withdrawals.limit}
                                                            totalItemsCount={this.props.withdrawals.total_data}
                                                            itemClass={'page-item'}
                                                            linkClass={'page-link'}
                                                            onChange={(page) => this.props.getWithdrawals(page, this.props.withdrawals.limit)}
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
    withdrawals: {
        data: state.data.withdrawals.data,
        limit: state.data.withdrawals.limit,
        page: state.data.withdrawals.page,
        total_data: state.data.withdrawals.total_data,
        search: state.data.withdrawals.search,
        is_loaded: state.data.withdrawals.is_loaded
    }
})

const dispatchToProps = dispatch => ({
    getWithdrawals: () =>  dispatch(getWithdrawals())
})

export default connect(stateToProps, dispatchToProps)(Withdrawals)
