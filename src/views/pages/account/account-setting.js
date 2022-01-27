import React from "react";
import {Card, Form, Button} from "react-bootstrap";
import {connect} from "react-redux";
import AccountSidebar from "../../compo/accountSidebar";
import $ from "jquery";
import {
    changeAvatarField,
    changeConfirmPasswordField,
    changeCurrentPasswordField,
    changeEmailField,
    changeFirstNameField,
    changeLastNameField,
    changePasswordField,
    changeUsernameField,
    submitForm
} from "../../../services/actions/form";
import {Redirect} from "react-router-dom";

class AccountSetting extends React.Component {

    componentDidMount() {
        window.scrollTo(0, 0)
        this.$el = $('.dropify');
        this.$el.dropify();
    }

    render() {
        return (
            <>
                {
                    !this.props.session.is_logged_in?
                        <Redirect to={'/'}/>:
                        <div className="top-container">
                            <main className="content">
                                <div className="max-container bx-account-menu-container">
                                    <div className="bx-account-wrapper custom-form-helper">

                                        <div className="row">

                                            <div className="col-md-3">
                                                <AccountSidebar/>
                                            </div>

                                            <div className="col-md-9 my-3">

                                                <Card className={'pb-0'}>
                                                    <Card.Header>Account Information</Card.Header>
                                                    <Card.Body>
                                                        <Form onSubmit={(e) => this.props.submitProfileSettingForm((
                                                            ({first_name, last_name, email, username, avatar}) => ({first_name, last_name, email, username, avatar})
                                                        )(this.props.fields), e)}>
                                                            <div className="row">

                                                                <div className="col-md-6">
                                                                    <div className="form-group">
                                                                        <Form.Control type="text" className="form-control" placeholder="First Name" defaultValue={this.props.session.user.first_name} onChange={(f) => this.props.changeFirstNameField(f.target.value)} />
                                                                        {
                                                                            this.props.fields.first_name.error?
                                                                                <p className={'mt-1 text-danger'}>{ this.props.fields.first_name.error }</p>: ''
                                                                        }
                                                                    </div>
                                                                </div>

                                                                <div className="col-md-6">
                                                                    <div className="form-group">
                                                                        <Form.Control type="text" className="form-control" placeholder="Last Name" defaultValue={this.props.session.user.last_name} onChange={(f) => this.props.changeLastNameField(f.target.value)} />
                                                                        {
                                                                            this.props.fields.last_name.error?
                                                                                <p className={'mt-1 text-danger'}>{ this.props.fields.last_name.error }</p>: ''
                                                                        }
                                                                    </div>
                                                                </div>

                                                                <div className="col-md-12">
                                                                    <div className="form-group">
                                                                        <Form.Control type="email" className="form-control" placeholder="Email" defaultValue={this.props.session.user.email} onChange={(f) => this.props.changeEmailField(f.target.value)} />
                                                                        {
                                                                            this.props.fields.email.error?
                                                                                <p className={'mt-1 text-danger'}>{ this.props.fields.email.error }</p>: ''
                                                                        }
                                                                    </div>
                                                                </div>

                                                                <div className="col-md-12">
                                                                    <div className="form-group">
                                                                        <Form.Control type="text" className="form-control" placeholder="Username" defaultValue={this.props.session.user.username} onChange={(f) => this.props.changeUsernameField(f.target.value)} />
                                                                        {
                                                                            this.props.fields.username.error?
                                                                                <p className={'mt-1 text-danger'}>{ this.props.fields.username.error }</p>: ''
                                                                        }
                                                                    </div>
                                                                </div>

                                                                <div className="col-md-12">
                                                                    <Form.Group controlId="avatar">
                                                                        {
                                                                            this.props.fields.avatar.value?
                                                                                <Form.Control type="file" className={'dropify'} onChange={(e) => {this.props.changeAvatarField(e.target.files[0])}} data-default-file={this.props.fields.avatar.value}/>:
                                                                                <Form.Control type="file" className={'dropify'} onChange={(e) => {this.props.changeAvatarField(e.target.files[0])}}/>
                                                                        }
                                                                    </Form.Group>
                                                                </div>

                                                                <div className="col-md-12">
                                                                    <Button variant={'success'} className={'float-right'} type={'submit'}>Save Account</Button>
                                                                </div>

                                                            </div>
                                                        </Form>
                                                    </Card.Body>
                                                </Card>


                                                <Card className={'pb-0 mt-5'}>
                                                    <Card.Header>Change Password</Card.Header>
                                                    <Card.Body>
                                                        <Form onSubmit={(e) => this.props.submitPasswordChangingForm((
                                                            ({current_password, password, confirm_password}) => ({current_password, password, confirm_password})
                                                        )(this.props.fields), e)}>
                                                            <div className="row">

                                                                <div className="col-md-12">
                                                                    <Form.Group controlId="current_password">
                                                                        <Form.Control type="password" placeholder="Current Password" value={this.props.fields.current_password.value} onChange={(f) => this.props.changeCurrentPasswordField(f.target.value)} />
                                                                        {
                                                                            this.props.fields.current_password.error?
                                                                                <p className={'mt-1 text-danger'}>{ this.props.fields.current_password.error }</p>: ''
                                                                        }
                                                                    </Form.Group>
                                                                </div>

                                                                <div className="col-md-6">
                                                                    <Form.Group controlId="new_password">
                                                                        <Form.Control type="password" placeholder="New Password" value={this.props.fields.password.value} onChange={(f) => this.props.changePasswordField(f.target.value)} />
                                                                        {
                                                                            this.props.fields.password.error?
                                                                                <p className={'mt-1 text-danger'}>{ this.props.fields.password.error }</p>: ''
                                                                        }
                                                                    </Form.Group>
                                                                </div>

                                                                <div className="col-md-6">
                                                                    <Form.Group controlId="confirm_new_password">
                                                                        <Form.Control type="password" placeholder="Confirm New Password" value={this.props.fields.confirm_password.value} onChange={(f) => this.props.changeConfirmPasswordField(f.target.value)} />
                                                                        {
                                                                            this.props.fields.confirm_password.error?
                                                                                <p className={'mt-1 text-danger'}>{ this.props.fields.confirm_password.error }</p>: ''
                                                                        }
                                                                    </Form.Group>
                                                                </div>

                                                                <div className="col-md-12">
                                                                    <Button variant={'success'} className={'float-right'} type={'submit'}>Change Password</Button>
                                                                </div>

                                                            </div>
                                                        </Form>
                                                    </Card.Body>
                                                </Card>
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
    session: state.session,
    fields: {
        first_name: {
            value: state.form.first_name.value || state.session.user.first_name,
            error: state.form.first_name.error
        },
        last_name: {
            value: state.form.last_name.value || state.session.user.last_name,
            error: state.form.last_name.error
        },
        email: {
            value: state.form.email.value || state.session.user.email,
            error: state.form.email.error
        },
        username: {
            value: state.form.username.value || state.session.user.username,
            error: state.form.username.error
        },
        avatar: {
            value: state.form.avatar.value || state.session.user.avatar,
            error: state.form.avatar.error
        },

        current_password: {
            value: state.form.current_password.value || '',
            error: state.form.current_password.error
        },
        password: {
            value: state.form.password.value || '',
            error: state.form.password.error
        },
        confirm_password: {
            value: state.form.confirm_password.value || '',
            error: state.form.confirm_password.error
        },
    }
})

const dispatchToProps = dispatch => ({
    changeFirstNameField: (value) => dispatch(changeFirstNameField(value)),
    changeLastNameField: (value) => dispatch(changeLastNameField(value)),
    changeEmailField: (value) => dispatch(changeEmailField(value)),
    changeUsernameField: (value) => dispatch(changeUsernameField(value)),
    changeAvatarField: (value) => dispatch(changeAvatarField(value)),
    changeCurrentPasswordField: (value) => dispatch(changeCurrentPasswordField(value)),
    changePasswordField: (value) => dispatch(changePasswordField(value)),
    changeConfirmPasswordField: (value) => dispatch(changeConfirmPasswordField(value)),
    submitProfileSettingForm: (values, event) => dispatch(submitForm('update-profile', values, event)),
    submitPasswordChangingForm: (values, event) => dispatch(submitForm('change-password', values, event))
})

export default connect(stateToProps, dispatchToProps)(AccountSetting)

