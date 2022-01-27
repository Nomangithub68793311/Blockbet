import React from "react";
import {Card, ListGroup} from "react-bootstrap";
import {Link} from "react-router-dom";
import {
    toggleLoginModal, toggleRegistrationModal, toggleUserMenu
} from "../../services/actions/setting";

import {
    resetSession,
} from "../../services/actions/session";

import {connect} from "react-redux";
import {connectWallet, disconnectWallet} from "../../services/actions/wallet";

class AccountSidebar extends React.Component {

    redirect = (path) => {
        this.props.history.push(path)
    }

    render() {
        return (
            <Card className={'pb-0'}>
                <Card.Img variant="top" src={this.props.session.user.avatar} />
                <Card.Body>
                    <Card.Title>{this.props.session.user.first_name} {this.props.session.user.last_name}</Card.Title>
                    {
                        !this.props.session.is_client_logged_in ||

                        <Card.Text className={'p-0'}>
                            <p><strong>Available Balance</strong> : ${Number(this.props.session.user.available_balance).toFixed(2)}</p>
                            <p><strong>Bonus Balance</strong> : ${Number(this.props.session.user.bonus_balance || 0.00).toFixed(2)}</p>
                        </Card.Text>
                    }
                </Card.Body>
                <ListGroup variant="flush">
                    {
                        this.props.session.is_client_logged_in || this.props.session.is_admin_logged_in ?
                            <>
                                <Link className={'list-group-item list-group-item-action'} to={'/account/dashboard'}> {this.props.session.is_admin_logged_in ? 'Dashboard' : 'Referrals'} </Link>
                                <Link className={'list-group-item list-group-item-action'} to={'/account/setting'}>Account Setting</Link>
                                <Link className={'list-group-item list-group-item-action'} to={'/account/transactions'}>Transactions</Link>
                                <Link className={'list-group-item list-group-item-action'} to={'/account/withdrawals'}>Withdrawals</Link>
                                <Link className={'list-group-item list-group-item-action'} to={'/account/bets'}>Bets</Link>
                            </>
                            :
                            ''
                    }

                    {
                        this.props.session.is_admin_logged_in?
                            <>
                                <Link className={'list-group-item list-group-item-action'} to={'/account/admins'}>Admins</Link>
                                <Link className={'list-group-item list-group-item-action'} to={'/account/users'}>Users</Link>
                                <Link className={'list-group-item list-group-item-action'} to={'/account/sliders'}>Sliders</Link>
                                <Link className={'list-group-item list-group-item-action'} to={'/account/sports'}>Sports</Link>
                                <Link className={'list-group-item list-group-item-action'} to={'/account/pages'}>Pages</Link>
                                <Link className={'list-group-item list-group-item-action'} to={'/account/system-setting'}>System Settings</Link>
                            </>
                            :
                            ''
                    }

                </ListGroup>
            </Card>
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
    session: state.session,
    wallet: state.wallet
})

const dispatchToProps = dispatch => ({
    toggleUserMenu: () => dispatch(toggleUserMenu()),
    toggleLoginModal: () => dispatch(toggleLoginModal()),
    toggleRegistrationModal: () => dispatch(toggleRegistrationModal()),
    resetSession: () => dispatch(resetSession( (res) => {
        dispatch(toggleUserMenu())
    })),
    connectWallet: () => dispatch(connectWallet()),
    disconnectWallet: () => dispatch(disconnectWallet())
})

export default connect(stateToProps, dispatchToProps)(AccountSidebar)

