import React from "react";
import {Button, Card, Table} from "react-bootstrap";
import {Redirect} from "react-router-dom"
import {connect} from "react-redux";
import {connectWallet, disconnectWallet} from "../../../services/actions/wallet";
import AccountSidebar from "../../compo/accountSidebar";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {notify} from "../../../library/notification";
import Moment from "react-moment";
import Pagination from "react-js-pagination";
import {getReferrals} from "../../../services/actions/data";

class Dashboard extends React.Component {

    componentDidMount() {
        window.scrollTo(0, 0)
        if (this.props.session.is_client_logged_in && !this.props.referrals.is_loaded) {
            this.props.getReferrals()
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
                                                <AccountSidebar></AccountSidebar>
                                            </div>

                                            <div className="col-md-9 my-3">
                                                {
                                                    this.props.session.is_client_logged_in?
                                                        <>
                                                            <Card className={'pb-0'}>
                                                                <Card.Header>Referral</Card.Header>
                                                                <Card.Body>
                                                                    <div className="rich-text-body-content mb-3" dangerouslySetInnerHTML={{__html: this.props.config.referral_text}}></div>
                                                                    <CopyToClipboard
                                                                        text={`${window.location.protocol}//${window.location.host}/referrer/${this.props.session.user.id}`}
                                                                        onCopy={() => notify('Referral Link Copied.')}
                                                                    >
                                                                        <p className={'cursor-pointer'}>
                                                                            {`${window.location.protocol}//${window.location.host}/referrer/${this.props.session.user.id}`} (Copy)
                                                                        </p>
                                                                    </CopyToClipboard>
                                                                </Card.Body>
                                                            </Card>

                                                            <Card className={'pb-0 mt-3'}>
                                                                <Card.Header>
                                                                    <div className="d-flex justify-content-between align-items-center">
                                                                        <span className={'align-middle'}>Referred Users</span>
                                                                    </div>
                                                                </Card.Header>
                                                                <Card.Body>
                                                                    <div className="row px-1 pb-2 justify-content-between">
                                                                        <div className="col-md-2">
                                                                            <select className={'form-control'} onChange={(e) => this.props.getReferrals(this.props.referrals.page, e.target.value, this.props.referrals.search)}>
                                                                                <option value="10">10</option>
                                                                                <option value="20">20</option>
                                                                                <option value="40">40</option>
                                                                                <option value="100">100</option>
                                                                                <option value="250">250</option>
                                                                                <option value="500">500</option>
                                                                            </select>
                                                                        </div>
                                                                    </div>
                                                                    <Table bordered hover responsive>
                                                                        <thead>
                                                                        <tr>
                                                                            <th>Name</th>
                                                                            <th>Email</th>
                                                                            <th>Username</th>
                                                                            <th>Date</th>
                                                                        </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                        {
                                                                            !this.props.referrals.is_loaded ||
                                                                            this.props.referrals.data.map(item => (
                                                                                <tr key={item.id}>
                                                                                    <td className={'align-middle'}>{item.first_name} {item.last_name}</td>
                                                                                    <td className={'align-middle'}>${item.email}</td>
                                                                                    <td className={'align-middle'}>{item.username.toUpperCase()}</td>
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
                                                                        activePage={this.props.referrals.page}
                                                                        itemsCountPerPage={this.props.referrals.limit}
                                                                        totalItemsCount={this.props.referrals.total_data}
                                                                        itemClass={'page-item'}
                                                                        linkClass={'page-link'}
                                                                        onChange={(page) => this.props.getReferrals(page, this.props.referrals.limit)}
                                                                    />

                                                                </Card.Body>
                                                            </Card>
                                                        </>
                                                        :
                                                        ""
                                                }
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
    is_user_menu_open: state.setting.is_user_menu_open,
    login_modal: {
        show: state.setting.login_modal.show
    },
    registration_modal: {
        show: state.setting.registration_modal.show
    },
    config: state.config.configs,
    session: state.session,
    wallet: state.wallet,
    referrals: state.data.referrals
})

const dispatchToProps = dispatch => ({
    connectWallet: () => dispatch(connectWallet()),
    getReferrals: (page, limit) => dispatch(getReferrals(page, limit)),
    disconnectWallet: () => dispatch(disconnectWallet())
})

export default connect(stateToProps, dispatchToProps)(Dashboard)
