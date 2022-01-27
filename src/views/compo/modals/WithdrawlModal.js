import React from "react";
import {Button, Form, Modal} from "react-bootstrap";
import {
    changeAmountField,
    changeWithdrawalAddressField, submitForm,
} from "../../../services/actions/form";
import {initiateTransaction} from "../../../services/actions/wallet";

import {connect} from "react-redux";
import {closeWithdrawalModalIfOpened} from "../../../services/actions/setting";

class WithdrwalModal extends React.Component {

    render() {
        return (
            <Modal
                {...this.props}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Withdrawal
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>

                    <Form onSubmit={(e) => this.props.submitForm(this.props.fields, e)}>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="form-group">
                                    <input type="text" className="form-control" placeholder="Amount" value={this.props.fields.amount.value} onChange={(f) => this.props.changeAmountField(f.target.value)} />
                                    {
                                        this.props.fields.amount.error?
                                            <p className={'mt-1 text-danger'}>{ this.props.fields.amount.error }</p>: ''
                                    }
                                </div>

                                <div className="form-group">
                                    <input type="text" className="form-control" placeholder="Withdrawal Address" value={this.props.fields.withdrawal_address.value} onChange={(f) => this.props.changeWithdrawalAddress(f.target.value)} />
                                    {
                                        this.props.fields.withdrawal_address.error?
                                            <p className={'mt-1 text-danger'}>{ this.props.fields.withdrawal_address.error }</p>: ''
                                    }
                                </div>
                            </div>

                            <div className="col-md-12">
                                <div className="mt-3">
                                    <Button variant={'link'} className={'custom-cta primary cta-large full-opacity'} type={'submit'} block>Withdraw</Button>
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
    config: state.config.configs,
    fields: {
        amount: {
            value: state.form.amount.value || '',
            error: state.form.amount.error
        },
        withdrawal_address: {
            value: state.form.withdrawal_address.value || '',
            error: state.form.withdrawal_address.error
        }
    }
})

const dispatchToProps = dispatch => ({
    changeAmountField: (value) => dispatch(changeAmountField(value)),
    changeWithdrawalAddress: (value) => dispatch(changeWithdrawalAddressField(value)),
    submitForm: (values, event) => dispatch(submitForm('request-payout',values, event, (response) => {
        if (response.status_code === 200) {
            dispatch(closeWithdrawalModalIfOpened())
        }
    }))
})

export default connect(stateToProps, dispatchToProps)(WithdrwalModal)
