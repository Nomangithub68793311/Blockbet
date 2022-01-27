import React from "react";
import {Button, Form, Modal} from "react-bootstrap";
import {connect} from "react-redux";
import {
    changeEmailField,
    changeFirstNameField,
    changeLastNameField,
    changeUsernameField,
    submitForm
} from "../../../../services/actions/form";
import {
    closeEditAdminModalIfOpened,
} from "../../../../services/actions/setting";
import {getAdmins} from "../../../../services/actions/data";

class EditAdmin extends React.Component {

    render() {
        return (
            <Modal
                {...this.props}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Edit Admin
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>

                    <Form onSubmit={(e) => this.props.submitForm(this.props.fields, this.props.admin.id, e)}>
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
                                <div className="mt-3">
                                    <Button variant={'link'} className={'custom-cta primary cta-large full-opacity'} type={'submit'} block>Save Admin</Button>
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
        first_name: {
            value: state.form.first_name.value || state.data.admin.data.first_name,
            error: state.form.first_name.error
        },
        last_name: {
            value: state.form.last_name.value || state.data.admin.data.last_name,
            error: state.form.last_name.error
        },
        email: {
            value: state.form.email.value || state.data.admin.data.email,
            error: state.form.email.error
        },
        username: {
            value: state.form.username.value || state.data.admin.data.username,
            error: state.form.username.error
        }
    },

    admin: state.data.admin
})

const dispatchToProps = dispatch => ({
    changeFirstNameField: (value) => dispatch(changeFirstNameField(value)),
    changeLastNameField: (value) => dispatch(changeLastNameField(value)),
    changeEmailField: (value) => dispatch(changeEmailField(value)),
    changeUsernameField: (value) => dispatch(changeUsernameField(value)),
    submitForm: (values, id, event) => dispatch(submitForm(`update-single-admin/${id}`, values, event, response => {
        if(response.status_code === 200) {
            dispatch(closeEditAdminModalIfOpened())
            dispatch(getAdmins())
        }
    }))
})

export default connect(stateToProps, dispatchToProps)(EditAdmin)
