import React from "react";
import {Button, Modal, Form} from "react-bootstrap";
import {
    changeFirstNameField,
    changeLastNameField,
    changeEmailField,
    changeUsernameField,
    changePasswordField,
    submitForm
} from "../../../services/actions/form";

import {
    toggleRegistrationModal,
    toggleLoginModal
} from "../../../services/actions/setting";

import {connect} from "react-redux";

class RegistrationModal extends React.Component {

    render() {
        return (
            <>
                <Modal
                    {...this.props}
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Registration
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>

                        <Form onSubmit={(e) => this.props.submitForm(this.props.fields, e)}>
                            <div className="row">

                                <div className="col-md-6">
                                    <div className="form-group">
                                        <Form.Control type="text" className="form-control" placeholder="First Name" value={this.props.fields.first_name.value} onChange={(f) => this.props.changeFirstNameField(f.target.value)} />
                                        {
                                            this.props.fields.first_name.error?
                                                <p className={'mt-1 text-danger'}>{ this.props.fields.first_name.error }</p>: ''
                                        }
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="form-group">
                                        <Form.Control type="text" className="form-control" placeholder="Last Name" value={this.props.fields.last_name.value} onChange={(f) => this.props.changeLastNameField(f.target.value)} />
                                        {
                                            this.props.fields.last_name.error?
                                                <p className={'mt-1 text-danger'}>{ this.props.fields.last_name.error }</p>: ''
                                        }
                                    </div>
                                </div>

                                <div className="col-md-12">
                                    <div className="form-group">
                                        <Form.Control type="email" className="form-control" placeholder="Email" value={this.props.fields.email.value} onChange={(f) => this.props.changeEmailField(f.target.value)} />
                                        {
                                            this.props.fields.email.error?
                                                <p className={'mt-1 text-danger'}>{ this.props.fields.email.error }</p>: ''
                                        }
                                    </div>
                                </div>

                                <div className="col-md-12">
                                    <div className="form-group">
                                        <Form.Control type="text" className="form-control" placeholder="Username" value={this.props.fields.username.value} onChange={(f) => this.props.changeUsernameField(f.target.value)} />
                                        {
                                            this.props.fields.username.error?
                                                <p className={'mt-1 text-danger'}>{ this.props.fields.username.error }</p>: ''
                                        }
                                    </div>
                                </div>

                                <div className="col-md-12">
                                    <div className="form-group">
                                        <Form.Control type="password" className="form-control" placeholder="Password" value={this.props.fields.password.value} onChange={(f) => this.props.changePasswordField(f.target.value)} />
                                        {
                                            this.props.fields.password.error?
                                                <p className={'mt-1 text-danger'}>{ this.props.fields.password.error }</p>: ''
                                        }
                                    </div>
                                </div>

                                <div className="col-md-12">
                                    <div className="mt-3">
                                        <Button variant={'link'} className={'custom-cta primary cta-large full-opacity'} type={'submit'} block>Register</Button>
                                    </div>
                                </div>

                            </div>
                        </Form>

                    </Modal.Body>
                </Modal>
            </>
        )
    }
}

const stateToProps = state => ({
    ...state,
    fields: {
        first_name: {
            value: state.form.first_name.value || '',
            error: state.form.first_name.error
        },
        last_name: {
            value: state.form.last_name.value || '',
            error: state.form.last_name.error
        },
        email: {
            value: state.form.email.value,
            error: state.form.email.error
        },
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
    changeFirstNameField: (value) => dispatch(changeFirstNameField(value)),
    changeLastNameField: (value) => dispatch(changeLastNameField(value)),
    changeEmailField: (value) => dispatch(changeEmailField(value)),
    changeUsernameField: (value) => dispatch(changeUsernameField(value)),
    changePasswordField: (value) => dispatch(changePasswordField(value)),
    submitForm: (values, event) => dispatch(submitForm('registration', values, event, response => {
        if(response.status_code === 200) {
            dispatch(toggleRegistrationModal())
            dispatch(toggleLoginModal())
        }
    }))
})

export default connect(stateToProps, dispatchToProps)(RegistrationModal)
