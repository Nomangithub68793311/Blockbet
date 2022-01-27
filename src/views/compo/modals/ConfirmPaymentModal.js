import React from "react";
import {Button, Form, Modal} from "react-bootstrap";
import {
    changeAmountField,
    changeFromAddressField,
    changeTrnxHashField,
} from "../../../services/actions/form";
import {confirmTransaction} from "../../../services/actions/wallet";

import {connect} from "react-redux";
import {CopyToClipboard} from "react-copy-to-clipboard/lib/Component";
import {notify} from "../../../library/notification";

class ConfirmPaymentModal extends React.Component {

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
                        Confirm Deposit
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>

                    <Form onSubmit={(e) => this.props.submitForm({
                        "trnx_hash": this.props.fields.trnx_hash.value,
                        "from_address": this.props.fields.from_address.value,
                        "amount": this.props.fields.amount.value,
                        "deposit_by": this.props.fields.deposit_by.value,
                    }, e)}>
                        <div className="row">
                            <input type="hidden" value={this.props.fields.amount.value}/>
                            <div className="mb-3">
                                <div className="col-md-4">
                                    <QRCode value={this.props.config.admin_ethereum_address} size={150}/>
                                </div>
                                <div className="col-md-8">
                                    <p className={'mb-2'}>
                                        {`Send Exactly $${this.props.fields.amount.value} To Below Address`}
                                    </p>
                                    <CopyToClipboard
                                        text={this.props.config.admin_ethereum_address}
                                        onCopy={() => notify('Address Copied.')}
                                    >
                                        <p className={'cursor-pointer mb-2'} style={{
                                            "font-weight": "bold"
                                        }}>
                                            { this.props.config.admin_ethereum_address }
                                        </p>
                                    </CopyToClipboard>
                                    <p>
                                        After Doing The transaction, Send Us The transaction Hash And Your Address To Confirm Your Transaction From Our Side.
                                    </p>
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
                                    <input type="text" className="form-control" placeholder="Transaction hash" value={this.props.fields.trnx_hash.value} onChange={(f) => this.props.changeTrnxHashField(f.target.value)} />
                                    {
                                        this.props.fields.trnx_hash.error?
                                            <p className={'mt-1 text-danger'}>{ this.props.fields.trnx_hash.error }</p>: ''
                                    }
                                </div>
                            </div>

                            {
                                this.props.submission.will_submit || this.props.submission.submitted?
                                    <div className="col-md-12">
                                        <div className="mt-3">
                                            <Button variant={'link'} className={'custom-cta primary cta-large full-opacity'} type={'submit'} block>Confirm</Button>
                                        </div>
                                    </div>
                                    :
                                    ""
                            }

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
    submission: state.form.submission,
    fields: {
        trnx_hash: {
            value: state.form.trnx_hash.value || '',
            error: state.form.trnx_hash.error
        },
        from_address: {
            value: state.form.from_address.value || '',
            error: state.form.from_address.error
        },
        amount: {
            value: state.form.amount.value || '',
            error: state.form.amount.error
        },
        deposit_by: {
            value: state.form.deposit_by.value || '',
            error: state.form.deposit_by.error
        },
    }
})

const dispatchToProps = dispatch => ({
    changeTrnxHashField: (value) => dispatch(changeTrnxHashField(value)),
    changeFromAddressField: (value) => dispatch(changeFromAddressField(value)),
    changeAmountField: (value) => dispatch(changeAmountField(value)),
    submitForm: (values, event) => dispatch(confirmTransaction(values, event))
})

export default connect(stateToProps, dispatchToProps)(ConfirmPaymentModal)
