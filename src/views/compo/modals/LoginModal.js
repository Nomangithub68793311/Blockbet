import React from "react";
import {Button, Form, Modal} from "react-bootstrap";
import {
    changePasswordField,
    changeUsernameField,
    submitForm
} from "../../../services/actions/form";
import {
    toggleLoginModal
} from "../../../services/actions/setting";

import {
    setSession
} from "../../../services/actions/session";

import {connect} from "react-redux";

class LoginModal extends React.Component {

    render() {
        return (
            <Modal
                {...this.props}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Login
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>

                    <Form onSubmit={(e) => this.props.submitForm(this.props.fields, e)}>
                        <div className="row">

                            <div className="col-md-12">
                                <div className="form-group">
                                    <input type="text" className="form-control" placeholder="Username" value={this.props.fields.username.value} onChange={(f) => this.props.changeUsernameField(f.target.value)} />
                                    {
                                        this.props.fields.username.error?
                                            <p className={'mt-1 text-danger'}>{ this.props.fields.username.error }</p>: ''
                                    }
                                </div>
                            </div>

                            <div className="col-md-12">
                                <div className="form-group">
                                    <input type="password" className="form-control" placeholder="Password" value={this.props.fields.password.value} onChange={(f) => this.props.changePasswordField(f.target.value)} />
                                    {
                                        this.props.fields.password.error?
                                            <p className={'mt-1 text-danger'}>{ this.props.fields.password.error }</p>: ''
                                    }
                                </div>
                            </div>

                            <div className="col-md-12">
                                <div className="mt-3">
                                    <Button variant={'link'} className={'custom-cta primary cta-large full-opacity'} type={'submit'} block>Login</Button>
                                </div>
                            </div>

                        </div>
                    </Form>

                </Modal.Body>
            </Modal>
        )
    }
}

const stateToProps = state => ({
    ...state,
    fields: {
        username: {
            value: state.form.username.value || '',
            error: state.form.username.error
        },
        password: {
            value: state.form.password.value || '',
            error: state.form.password.error
        }
    }
})

const dispatchToProps = dispatch => ({
    changeUsernameField: (value) => dispatch(changeUsernameField(value)),
    changePasswordField: (value) => dispatch(changePasswordField(value)),
    submitForm: (values, event) => dispatch(submitForm('login', values, event, response => {
        if(response.status_code === 200) {
            dispatch(toggleLoginModal())
            dispatch(setSession(response.data))
        }
    }))
})

export default connect(stateToProps, dispatchToProps)(LoginModal)
