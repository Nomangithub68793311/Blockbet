import React from "react";
import {Card, Table} from "react-bootstrap";

import {connect} from "react-redux";
import AccountSidebar from "../../compo/accountSidebar";
import {getTransaction, getTransactions} from "../../../services/actions/data";
import Pagination from "react-js-pagination";
import {Redirect} from "react-router-dom";
import Moment from "react-moment";
import {CopyToClipboard} from "react-copy-to-clipboard/lib/Component";
import {notify} from "../../../library/notification";
import {closeConfirmTransactionIfOpened, openConfirmTransactionIfClosed} from "../../../services/actions/setting";
import ConfirmTransaction from "../../compo/modals/ConfirmTransaction";
import {get} from "../../../library/api";

class Transaction extends React.Component {

    componentDidMount() {
        window.scrollTo(0, 0)
        if (!this.props.transactions.is_loaded) {
            this.props.getTransactions()
        }
    }

    maskText(string, first=4, last=4, star=4){
        star = '*'.repeat(star)
        first = string.substr(0,first)
        last = string.substr(string.length - last)

        return `${first}${star}${last}`
    }

    cancelTransaction(id) {
        get(`/admin/cancel-transaction/${id}`).then(response => {
            console.log(response)
            if (response.status_code === 200){
                notify(response.message, response.status)
                this.props.getTransactions()
            } else {
                notify(response.message, response.status)
            }
        })
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
                                                <AccountSidebar></AccountSidebar>
                                            </div>

                                            <div className="col-md-9 my-3">
                                                <Card className={'pb-0'}>
                                                    <Card.Header>
                                                        <div className="d-flex justify-content-between align-items-center">
                                                            <span className={'align-middle'}>Transactions</span>
                                                        </div>
                                                    </Card.Header>
                                                    <Card.Body>
                                                        <div className="row px-1 pb-2 justify-content-between">
                                                            <div className="col-md-2">
                                                                <select className={'form-control'} onChange={(e) => this.props.getTransactions(this.props.transactions.page, e.target.value, this.props.transactions.search)}>
                                                                    <option value="10">10</option>
                                                                    <option value="20">20</option>
                                                                    <option value="40">40</option>
                                                                    <option value="100">100</option>
                                                                    <option value="250">250</option>
                                                                    <option value="500">500</option>
                                                                </select>
                                                            </div>
                                                            <div className="col-md-3">
                                                                <input className={'form-control'}  onChange={(e) => this.props.getTransactions(this.props.transactions.page, this.props.transactions.limit, e.target.value)}/>
                                                            </div>
                                                        </div>
                                                        <Table bordered hover responsive>
                                                            <thead>
                                                            <tr>
                                                                <th>Transaction Hash</th>
                                                                <th>From Address</th>
                                                                <th>To Address</th>
                                                                <th>Block Number</th>
                                                                <th>Amount</th>
                                                                <th>Date</th>
                                                                <th>status</th>
                                                            </tr>
                                                            </thead>
                                                            <tbody>
                                                            {
                                                                !this.props.transactions.is_loaded ||
                                                                this.props.transactions.data.map(item => (
                                                                    <tr key={item.id}>
                                                                        <CopyToClipboard
                                                                            text={item.transaction_hash}
                                                                            onCopy={() => notify('Transaction Hash Copied.')}
                                                                        >
                                                                            <td className={'align-middle cursor-pointer'}>{this.maskText(item.transaction_hash)}</td>
                                                                        </CopyToClipboard>
                                                                        <CopyToClipboard
                                                                            text={item.from_address}
                                                                            onCopy={() => notify('From Address Copied Copied.')}
                                                                        >
                                                                            <td className={'align-middle cursor-pointer'}>{this.maskText(item.from_address)}</td>
                                                                        </CopyToClipboard>
                                                                        <CopyToClipboard
                                                                            text={item.to_address}
                                                                            onCopy={() => notify('To Address Copied Copied.')}
                                                                        >
                                                                            <td className={'align-middle cursor-pointer'}>{this.maskText(item.to_address)}</td>
                                                                        </CopyToClipboard>
                                                                        <td className={'align-middle'}>{item.block_number}</td>
                                                                        <td className={'align-middle'}>{item.amount}</td>
                                                                        <td className={'align-middle'}>
                                                                            <Moment date={item.date_created} format={'DD MMM, YYYY HH:MM A'}/>
                                                                        </td>
                                                                        <td>
                                                                            {
                                                                                item.status !== 'pending' ?
                                                                                    item.status.toUpperCase()
                                                                                    :
                                                                                    <>
                                                                                        {
                                                                                            this.props.session.is_admin_logged_in?
                                                                                                <>
                                                                                                    <button type="button" className="mr-1 btn btn-success btn-sm" onClick={() => this.props.openConfirmTransactionModal(item.id)}>
                                                                                                        <i className="icon icon-checked"/>
                                                                                                    </button>
                                                                                                    <button type="button" className="btn btn-danger btn-sm" onClick={() => this.cancelTransaction(item.id)}>
                                                                                                        <i className="icon icon-close"/>
                                                                                                    </button>
                                                                                                </>
                                                                                                :
                                                                                                item.status.toUpperCase()
                                                                                        }
                                                                                    </>
                                                                            }
                                                                        </td>
                                                                    </tr>
                                                                ))

                                                            }
                                                            </tbody>
                                                        </Table>

                                                        <Pagination
                                                            innerClass={'pagination float-right'}
                                                            pageRangeDisplayed={10}
                                                            activePage={this.props.transactions.page}
                                                            itemsCountPerPage={this.props.transactions.limit}
                                                            totalItemsCount={this.props.transactions.total_data}
                                                            itemClass={'page-item'}
                                                            linkClass={'page-link'}
                                                            onChange={(page) => this.props.getTransactions(page, this.props.transactions.limit)}
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
                <ConfirmTransaction
                    show={this.props.confirm_transaction_modal.show}
                    onHide={() => this.props.closeConfirmTransactionModal()}
                />
            </>
        )
    }
}

const stateToProps = state => ({
    session: state.session,
    confirm_transaction_modal: state.setting.confirm_transaction_modal,
    transactions: {
        data: state.data.transactions.data,
        limit: state.data.transactions.limit,
        page: state.data.transactions.page,
        total_data: state.data.transactions.total_data,
        search: state.data.transactions.search,
        is_loaded: state.data.transactions.is_loaded
    }
})

const dispatchToProps = dispatch => ({
    getTransactions: (page, limit, search) =>  dispatch(getTransactions(page, limit, search)),
    openConfirmTransactionModal: (id) => dispatch(openConfirmTransactionIfClosed(id, (id) => {
        dispatch(getTransaction(id))
    })),
    closeConfirmTransactionModal: (id) => dispatch(closeConfirmTransactionIfOpened())
})

export default connect(stateToProps, dispatchToProps)(Transaction)
