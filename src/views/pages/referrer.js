import React from "react";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import {openRegistrationModalIfClosed} from "../../services/actions/setting";

class Referrer extends React.Component {

    componentDidMount() {
        const {params} = this.props.match
        localStorage.setItem('referrer', JSON.stringify(params.user_id))
        this.props.openRegistrationModal()
    }

    render() {
        return (
            <Redirect to={'/'}/>
        )

    }
}

const stateToProps = state => ({})

const dispatchToProps = dispatch => ({
    openRegistrationModal: () => dispatch(openRegistrationModalIfClosed())
})

export default connect(stateToProps, dispatchToProps)(Referrer)