import React from "react";
import {Button, Form, Modal} from "react-bootstrap";
import {
    changeAmountField,
    changeFromAddressField,
    changeTrnxHashField, submitForm,
} from "../../../services/actions/form";
import {confirmTransaction} from "../../../services/actions/wallet";

import {connect} from "react-redux";
import {CopyToClipboard} from "react-copy-to-clipboard/lib/Component";
import {notify} from "../../../library/notification";
import {closeConfirmTransactionIfOpened} from "../../../services/actions/setting";
import {getTransactions} from "../../../services/actions/data";

class ConfirmTransaction extends React.Component {

    render() {
        const QRCode = require('qrcode.react');
        return (
            <Modal
                {...this.props}
                backdrop="static"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Confirm Transaction
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>

                    <Form onSubmit={(e) => this.props.submitForm(this.props.transaction.id, this.props.fields, e)}>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="form-group">
                                    <input type="text" className="form-control" placeholder="Amount" value={this.props.fields.amount.value} onChange={(f) => this.props.changeAmountField(f.target.value)} />
                                    {
                                        this.props.fields.from_address.error?
                                            <p className={'mt-1 text-danger'}>{ this.props.fields.from_address.error }</p>: ''
                                    }
                                </div>
                            </div>

                            <div className="col-md-12">
                                <div className="form-group">
                                    <input type="text" className="form-control" placeholder="Your Address" value={this.props.fields.from_address.value} onChange={(f) => this.props.changeFromAddressField(f.target.value)} />
                                    {
                                        this.props.fields.from_address.error?
                                            <p className={'mt-1 text-danger'}>{ this.props.fields.from_address.error }</p>: ''
                                    }
                                </div>
                            </div>

                            <div className="col-md-12">
                                <div className="form-group">
                                    <input type="text" className="form-control" placeholder="Transaction hash" value={this.props.fields.transaction_hash.value} onChange={(f) => this.props.changeTrnxHashField(f.target.value)} />
                                    {
                                        this.props.fields.transaction_hash.error?
                                            <p className={'mt-1 text-danger'}>{ this.props.fields.transaction_hash.error }</p>: ''
                                    }
                                </div>
                            </div>

                            <div className="col-md-12">
                                <div className="mt-3">
                                    <Button variant={'link'} className={'custom-cta primary cta-large full-opacity'} type={'submit'} block>Confirm</Button>
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
    transaction: state.data.transaction,
    fields: {
        transaction_hash: {
            value: state.form.trnx_hash.value || state.data.transaction.data.transaction_hash,
            error: state.form.trnx_hash.error
        },
        from_address: {
            value: state.form.from_address.value || state.data.transaction.data.from_address,
            error: state.form.from_address.error
        },
        amount: {
            value: state.form.amount.value || state.data.transaction.data.amount,
            error: state.form.amount.error
        },
    }
})

const dispatchToProps = dispatch => ({
    changeTrnxHashField: (value) => dispatch(changeTrnxHashField(value)),
    changeFromAddressField: (value) => dispatch(changeFromAddressField(value)),
    changeAmountField: (value) => dispatch(changeAmountField(value)),
    submitForm: (id, values, event) => dispatch(submitForm(`/admin/confirm-transaction/${id}`,values, event, () => {
        dispatch(getTransactions())
        dispatch(closeConfirmTransactionIfOpened())
    }))
})

export default connect(stateToProps, dispatchToProps)(ConfirmTransaction)
