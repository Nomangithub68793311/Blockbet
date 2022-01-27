import React from "react";
import {connect} from "react-redux";
import {Form, Button} from "react-bootstrap";
import {changeEmailField, changeMessageField, changeNameField, submitForm} from "../../services/actions/form";

class Contact extends React.Component {

    componentDidMount() {
        window.scrollTo(0, 0)
    }

    render() {
        return (
            <div className={'top-container'}>
                <div className="cms-layout-container">
                    <div className="marketing-page-frame-container max-container">
                        <div className="marketing-page-frame-content">
                            <div className="content-block">
                                <div className="max-container">
                                    <div className="content-wrapper">
                                        <div className="marketing-page-content-block-body">
                                            <div className="rich-text-body-content" >
                                                <Form onSubmit={(event) => this.props.submitForm(this.props.fields, event)}>
                                                    <Form.Group controlId="name">
                                                        <Form.Label>Name</Form.Label>
                                                        <Form.Control type="text" placeholder="Enter Name" value={this.props.fields.name.value} onChange={(event) => this.props.changeNameField(event.target.value)}/>
                                                        {
                                                            this.props.fields.name.error?
                                                                <p className={'mt-1 text-danger'}>{ this.props.fields.name.error }</p>: ''
                                                        }
                                                    </Form.Group>

                                                    <Form.Group controlId="email">
                                                        <Form.Label>Email</Form.Label>
                                                        <Form.Control type="email" placeholder="Email" value={this.props.fields.email.value} onChange={(event) => this.props.changeEmailField(event.target.value)} />
                                                        {
                                                            this.props.fields.email.error?
                                                                <p className={'mt-1 text-danger'}>{ this.props.fields.email.error }</p>: ''
                                                        }
                                                    </Form.Group>

                                                    <Form.Group controlId="message">
                                                        <Form.Label>Message</Form.Label>
                                                        <Form.Control as={'textarea'} type="text" placeholder="Type Your Message" rows={10} value={this.props.fields.message.value} onChange={(event) => this.props.changeMessageField(event.target.value)} />
                                                        {
                                                            this.props.fields.message.error?
                                                                <p className={'mt-1 text-danger'}>{ this.props.fields.message.error }</p>: ''
                                                        }
                                                    </Form.Group>

                                                    <Button variant="primary" type="submit">
                                                        Submit
                                                    </Button>
                                                </Form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )

    }
}

const stateToProps = state => ({
    fields: {
        name: {
            value: state.form.name.value || '',
            error: state.form.name.error
        },
        email: {
            value: state.form.email.value || '',
            error: state.form.email.error
        },
        message: {
            value: state.form.message.value || '',
            error: state.form.message.error
        }
    }
})

const dispatchToProps = dispatch => ({
    changeNameField: (value) => dispatch(changeNameField(value)),
    changeEmailField: (value) => dispatch(changeEmailField(value)),
    changeMessageField: (value) => dispatch(changeMessageField(value)),
    submitForm: (values, event) => dispatch(submitForm('contact', values, event))
})

export default connect(stateToProps, dispatchToProps)(Contact)