import React from 'react';
import Header from "./views/compo/header";
import Footer from "./views/compo/footer";

import Home from "./views/pages/home";
import Sports from "./views/pages/sports";
import SingleEvent from "./views/pages/single-event";
import Casino from "./views/pages/casino";
import Page from "./views/pages/page";
import Referrer from "./views/pages/referrer";
import Contact from "./views/pages/contact";

import Dashboard from "./views/pages/account/dashboard";
import Setting from "./views/pages/account/account-setting";
import Transaction from "./views/pages/account/transaction";
import Bets from "./views/pages/account/bets";
import Clients from "./views/pages/account/clients";
import Admins from "./views/pages/account/admins";
import Sliders from "./views/pages/account/sliders";
import Sport from "./views/pages/account/sports";
import pages from "./views/pages/account/pages";
import SystemSetting from "./views/pages/account/system-setting";

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import "dropify/dist/css/dropify.min.css"

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {Provider} from "react-redux"
import store from "./services/store"
import Withdrawals from "./views/pages/account/withdrawals";
import { Socket } from 'react-socket-io';

const uri = 'http://34.123.206.186:5000';
const options = { transports: ['polling'] };

function App() {
    return (
        <Provider store={store}>
            <Socket uri={uri} options={options}>
                <Router>
                    <Header />
                    <Switch>
                        <Route exact path={'/'} component={Home} />
                        <Route exact path={'/sport/:sport_id?'} component={Sports} />
                        <Route exact path={'/event/:event_id?'} component={SingleEvent} />
                        <Route exact path={'/casino'} component={Casino} />
                        <Route exact path={'/p/:page_slug?'} component={Page} />
                        <Route exact path={'/referrer/:user_id?'} component={Referrer} />
                        <Route exact path={'/contact'} component={Contact} />

                        <Route exact path={'/account/dashboard'} component={Dashboard} />
                        <Route exact path={'/account/setting'} component={Setting} />
                        <Route exact path={'/account/transactions'} component={Transaction} />
                        <Route exact path={'/account/withdrawals'} component={Withdrawals} />
                        <Route exact path={'/account/bets'} component={Bets} />
                        <Route exact path={'/account/users'} component={Clients} />
                        <Route exact path={'/account/admins'} component={Admins} />
                        <Route exact path={'/account/sliders'} component={Sliders} />
                        <Route exact path={'/account/sports'} component={Sport} />
                        <Route exact path={'/account/pages'} component={pages} />
                        <Route exact path={'/account/system-setting'} component={SystemSetting} />
                    </Switch>
                    <Footer/>
                </Router>
            </Socket>
        </Provider>
    );
}

export default App;
