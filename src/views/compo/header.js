import React from "react";
import {Link} from "react-router-dom";
import LoginModal from "./modals/LoginModal";
import RegistrationModal from "./modals/RegistrationModal";
import ReactNotification from "react-notifications-component";

import 'react-notifications-component/dist/theme.css'
import 'animate.css/animate.compat.css'

import {
    closeConfirmDepositIfOpened,
    closeWithdrawalModalIfOpened,
    openWithdrawalModalIfClosed,
    toggleBuySlipModal,
    toggleLoginModal,
    toggleRegistrationModal,
    toggleUserMenu
} from "../../services/actions/setting";
import {resetSession} from "../../services/actions/session";
import {connectWallet, disconnectWallet, setBalance} from "../../services/actions/wallet";
import {setConfigs} from "../../services/actions/config"
import {connect} from "react-redux";
import {Button} from "react-bootstrap";
import BuySlip from "./modals/BuySlip";
import WithdrawlModal from "./modals/WithdrawlModal";
import ConfirmPaymentModal from "./modals/ConfirmPaymentModal";
import {CopyToClipboard} from "react-copy-to-clipboard/lib/Component";
import {notify} from "../../library/notification";

class Header extends React.Component {

    componentDidMount() {
        /*twakTo('5baf04688a438d2b0cdfd7e6')*/

        if (!this.props.is_configs_loaded){
            this.props.setConfigs()
        }

        if (this.props.wallet.is_connected){
            this.props.setBalance()
        }
    }

    closeUserMenu = () => {
        this.props.toggleUserMenu();
    }

    render() {
        return (
            <>
                <div className="navbar-wrapper navbar-fixed-top">
                    <nav className="navbar max-container">
                        <div className="brand-logo">
                            <Link to="/">
                                <img className="img-large" alt="Bovada" src={this.props.config.site_logo} />
                            </Link>
                        </div>

                        <ul className="custom-tab quaternary channel">
                            <li role="button">
                                <Link className="channel-item" title="Sports" to="/sport"> Sports </Link>
                            </li>
                            {/*<li role="button">
                                <Link className="channel-item" title="Casino" to="/casino"> CASINO </Link>
                            </li>*/}
                        </ul>

                        <aside className="user-info">

                            {
                                this.props.session.is_logged_in ?
                                    <button className="account-balance menu-btn" onClick={() => this.props.toggleUserMenu()}>
                                        <i className="icon icon-user icon-user-primary" style={{color: 'rgb(245, 198, 34)'}}></i>
                                        <i className="icon icon-menu"></i>
                                    </button>
                                    :
                                    <div className="login-container">
                                        <a className="custom-cta primary cta-small visible-xs" onClick={() => this.props.toggleRegistrationModal()}>Join</a>
                                        <a className="custom-cta primary hidden-xs" onClick={() => this.props.toggleRegistrationModal()}>Join</a>
                                        <a className="custom-link" onClick={() => this.props.toggleLoginModal()}>Login</a>
                                    </div>
                            }

                        </aside>

                        <aside className="user-info-full-size-registration-buttons">
                            <div className="login-container">
                                <a className="custom-cta primary" onClick={() => this.props.toggleRegistrationModal()}>Join</a>
                                <a className="custom-cta secondary" onClick={() => this.props.toggleLoginModal()}>Login</a>
                            </div>
                        </aside>

                    </nav>

                    {
                        !!this.props.is_logged_in ||

                        <div className={this.props.is_user_menu_open ? 'menu-overlay-container max-container' : 'menu-overlay-container max-container nav-menu-hidden'}>

                            <div className="nav-menu-elements">

                                <div className={'bx-account-menu-navigation'}>

                                    <div id="root-for-bx-account-menu-navigation">
                                        <section className="modal-body">
                                            <div className="account-status">
                                                <div className={'bx-loyalty-profile-summary'}>

                                                    <div className="account-info">
                                                        <div className="loyalty-profile-summary-wrapper">
                                                            <div className="userIconContainer">
                                                                <div className="bx-loyalty-user-icon">
                                                                    <i className="icon icon-user" style={{color: "rgb(245, 198, 34)"}}></i>
                                                                </div>
                                                            </div>
                                                            <div className="summaryContainer">
                                                                <span className="nameContainer text-black-50">{this.props.session.user.first_name + ' ' + this.props.session.user.last_name}</span>
                                                                {
                                                                    this.props.wallet.is_connected?
                                                                        <div className="pointsRatio">{this.props.wallet.balance} Available In Your wallet</div>
                                                                        :
                                                                        <div className="pointsRatio">Wallet Is Not Connected</div>
                                                                }
                                                            </div>
                                                        </div>

                                                        <div className="account-balance-pending">

                                                            <div className="account-balance-logout">

                                                                {
                                                                    !this.props.session.is_client_logged_in ||
                                                                    <div className="account-balance">
                                                                        <div className="extended-balance">
                                                                            <div className="withdrawable-balance">
                                                                                <p className={'mb-2'}>
                                                                                    <span>Available Balance</span>:
                                                                                    <span className="player-balance-amount text-black-50"> $ {Number(this.props.session.user.available_balance).toFixed(2)} </span>
                                                                                </p>
                                                                                <p className={'mb-2'}>
                                                                                    <span>Bonus Balance</span>:
                                                                                    <span className="player-balance-amount text-black-50"> $ {Number(this.props.session.user.bonus_balance || 0.00).toFixed(2)} </span>
                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                }

                                                                <div className="account-logout">
                                                                    <button type="button" className="account-logout-button custom-cta tertiary cta-small" onClick={() => this.props.resetSession()}>
                                                                        Logout
                                                                    </button>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>

                                                </div>
                                                <div className="account-deposit-buttons button-rows">

                                                    <div className="cashier-actions-row first-row one-column">
                                                        <Link className="account-deposit-button custom-cta primary flex-buttons" to={'/account/dashboard'} onClick={this.closeUserMenu}>
                                                            Dashboard
                                                        </Link>
                                                    </div>

                                                    {
                                                        !this.props.session.is_client_logged_in ||
                                                        <>

                                                            <div className="cashier-actions-row first-row one-column">
                                                                <Button variant={'success'} onClick={() => this.props.toggleBuySlipModal()} block>
                                                                    Deposit Now
                                                                </Button>
                                                            </div>

                                                            <div className="cashier-actions-row two-columns">
                                                                <button type="button" tabIndex="0" className="account-withdraw-button custom-cta flex-buttons secondary" onClick={() => this.props.openWithdrawalModal()}>
                                                                    Withdraw
                                                                </button>
                                                                {
                                                                    this.props.wallet.is_connected?
                                                                        <button type="button" tabIndex="0" className="account-transfer-button custom-cta flex-buttons secondary" onClick={() => this.props.disconnectWallet()}>
                                                                            Disconnect Wallet
                                                                        </button>
                                                                        :
                                                                        <button type="button" tabIndex="0" className="account-transfer-button custom-cta flex-buttons secondary" onClick={() => this.props.connectWallet()}>
                                                                            Connect Wallet
                                                                        </button>
                                                                }
                                                            </div>
                                                        </>
                                                    }

                                                </div>
                                                <ul className="custom-tab tab-menu" role="list">
                                                    <li role="button" tabIndex="0" title="Messages">
                                                        <Link to={'/account/bets'} className="static-btn" onClick={this.closeUserMenu}>
                                                            <div className="icon-wrapper">
                                                                <i className="icon icon-betslip static-icon"></i>
                                                            </div>
                                                            <span className="static-title">Bets</span>
                                                        </Link>
                                                    </li>
                                                    <li role="button" tabIndex="0" title="Transactions">
                                                        <Link to={'/account/transactions'} className="static-btn" onClick={this.closeUserMenu}>
                                                            <div className="icon-wrapper">
                                                                <i className="icon icon-transactions static-icon"></i>
                                                            </div>
                                                            <span className="static-title">Transactions</span>
                                                        </Link>
                                                    </li>
                                                    <li role="button" tabIndex="0" title="Profile Settings">
                                                        <Link to={'/account/setting'} className="static-btn" onClick={this.closeUserMenu}>
                                                            <div className="icon-wrapper">
                                                                <i className="icon icon-settings static-icon"></i>
                                                            </div>
                                                            <span className="static-title">Profile Settings</span>
                                                        </Link>
                                                    </li>
                                                    <li role="button" tabIndex="0" title="Change Password">
                                                        <Link to={'/account/setting'} className="static-btn" onClick={this.closeUserMenu}>
                                                            <div className="icon-wrapper">
                                                                <i className="icon icon-change-password static-icon"></i>
                                                            </div>
                                                            <span className="static-title">Change Password</span>
                                                        </Link>
                                                    </li>
                                                    <li role="button" tabIndex="0" title="Contact">
                                                        <Link to={'/contact'} className="static-btn" onClick={this.closeUserMenu}>
                                                            <div className="icon-wrapper">
                                                                <i className="icon icon-phone static-icon"></i>
                                                            </div>
                                                            <span className="static-title">Contact</span>
                                                        </Link>
                                                    </li>
                                                    <li role="button" tabIndex="0" title="Referral">
                                                        <Link to={'/account/dashboard'} className="static-btn" onClick={this.closeUserMenu}>
                                                            <div className="icon-wrapper">
                                                                <i className="icon icon-user static-icon"></i>
                                                            </div>
                                                            <span className="static-title">Referral</span>
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </div>
                                        </section>
                                    </div>

                                </div>

                            </div>

                            <div className="nav-menu-overlay" onClick={() => this.props.toggleUserMenu()}></div>

                        </div>
                    }

                </div>

                <LoginModal
                    show={this.props.login_modal.show}
                    onHide={() => this.props.toggleLoginModal()}
                />

                <RegistrationModal
                    show={this.props.registration_modal.show}
                    onHide={() => this.props.toggleRegistrationModal()}
                />

                <BuySlip
                    show={this.props.buy_slip_modal.show}
                    onHide={() => this.props.toggleBuySlipModal()}
                />

                <WithdrawlModal
                    show={this.props.withdrawal_modal.show}
                    onHide={() => this.props.closeWithdrawalModal()}
                />

                <ConfirmPaymentModal
                    show={this.props.confirm_deposit_modal.show}
                    onHide={() => this.props.closeConfirmDepositModal()}
                />

                <ReactNotification />

            </>
        )
    }

}

const stateToProps = state => ({
    is_configs_loaded: state.config.is_configs_loaded,
    config: state.config.configs,
    is_user_menu_open: state.setting.is_user_menu_open,
    login_modal: state.setting.login_modal,
    registration_modal: state.setting.registration_modal,
    withdrawal_modal: state.setting.withdrawal_modal,
    buy_slip_modal: state.setting.buy_slip_modal,
    confirm_deposit_modal: state.setting.confirm_deposit_modal,
    session: state.session,
    wallet: state.wallet
})

const dispatchToProps = dispatch => ({
    toggleUserMenu: () => dispatch(toggleUserMenu()),
    toggleLoginModal: () => dispatch(toggleLoginModal()),
    toggleRegistrationModal: () => dispatch(toggleRegistrationModal()),
    toggleBuySlipModal: () => dispatch(toggleBuySlipModal()),
    resetSession: () => dispatch(resetSession( (res) => {
        dispatch(toggleUserMenu())
    })),
    connectWallet: () => dispatch(connectWallet(() => {
        dispatch(setBalance())
    })),
    disconnectWallet: () => dispatch(disconnectWallet()),
    setConfigs: () => dispatch(setConfigs()),
    setBalance: () => dispatch(setBalance()),
    openWithdrawalModal: () => dispatch(openWithdrawalModalIfClosed()),
    closeWithdrawalModal: () => dispatch(closeWithdrawalModalIfOpened()),
    closeConfirmDepositModal: () => dispatch(closeConfirmDepositIfOpened())
})

export default connect(stateToProps, dispatchToProps)(Header)
