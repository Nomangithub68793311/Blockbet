import React from "react";
import {Card, Button, ListGroup} from "react-bootstrap";
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import {
    toggleLoginModal, toggleRegistrationModal, toggleUserMenu
} from "../../services/actions/setting";

import {
    resetSession,
} from "../../services/actions/session";

import {connect} from "react-redux";
import {connectWallet, disconnectWallet} from "../../services/actions/wallet";
import Setting from "./account/account-setting";
import Transaction from "./account/transaction";

class Account extends React.Component {

    render() {
        return (
            <div className="top-container">
                <main className="content">
                    <div className="max-container bx-account-menu-container">
                        <div className="bx-account-wrapper custom-form-helper">

                            <div className="row">

                                <div className="col-md-3">
                                    <Card>
                                        <Card.Img variant="top" src="https://www.tenforums.com/geek/gars/images/2/types/thumb_15951118880user.png" />
                                        <Card.Body>
                                            <Card.Title>{this.props.session.user.first_name} {this.props.session.user.last_name}</Card.Title>
                                            <Card.Text>
                                                Some quick example text to build on the card title and make up the bulk of
                                                the card's content.
                                            </Card.Text>
                                            <Button variant="primary">Go somewhere</Button>
                                        </Card.Body>
                                        <ListGroup variant="flush">
                                            <ListGroup.Item action><Link to={'/account/setting'}>Account Setting</Link></ListGroup.Item>
                                            <ListGroup.Item action><Link to={'/account/transactions'}>Transactions</Link></ListGroup.Item>
                                            <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                                        </ListGroup>
                                    </Card>
                                </div>

                                <div className="col-md-9 my-5">
                                    <Router>
                                        <Switch>
                                            <Route exact path={'/account/setting'} component={Setting} />
                                            <Route exact path={'/account/transactions'} component={Transaction} />
                                        </Switch>
                                    </Router>
                                </div>
                            </div>

                        </div>
                    </div>
                </main>
            </div>
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

export default connect(stateToProps, dispatchToProps)(Account)

