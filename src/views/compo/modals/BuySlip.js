import React from "react";
import {Button, Form, Modal} from "react-bootstrap";
import {
    changeAmountField,
    changeDepositByField
} from "../../../services/actions/form";
import {initiateTransaction} from "../../../services/actions/wallet";

import {connect} from "react-redux";

class BuySlip extends React.Component {

    render() {
        return (
            <Modal
                {...this.props}
                backdrop="static"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Deposit Money
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>

                    <Form onSubmit={(e) => this.props.submitForm({
                        "deposit_by": this.props.fields.deposit_by.value,
                        "amount": this.props.fields.amount.value,
                        "to_address": this.props.config.admin_ethereum_address,
                    }, e)}>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="form-group">
                                    <select className={'form-control'} value={this.props.fields.deposit_by.value} onChange={(f) => this.props.changeDepositByField(f.target.value)} >
                                        <option value="ETH">Ethereum</option>
                                        <option value="USDS">Stably USD</option>
                                        <option value="USDT">Tether</option>
                                        <option value="VUSD">VUSD</option>
                                        <option value="DAI">Dai</option>
                                        <option value="UNI">UNI COIN</option>
                                        <option value="BAT">Basic Attention Token</option>
                                        <option value="TUSD">TrueUSD</option>
                                    </select>
                                    {
                                        this.props.fields.deposit_by.error?
                                            <p className={'mt-1 text-danger'}>{ this.props.fields.deposit_by.error }</p>: ''
                                    }
                                </div>
                            </div>

                            <div className="col-md-12">
                                <input type="hidden" value={this.props.wallet.connected_wallet}/>
                                <div className="form-group">
                                    <input type="number" className="form-control" placeholder="Amount" value={this.props.fields.amount.value} onChange={(f) => this.props.changeAmountField(f.target.value)} />
                                    {
                                        this.props.fields.amount.error?
                                            <p className={'mt-1 text-danger'}>{ this.props.fields.amount.error }</p>: ''
                                    }
                                </div>
                            </div>

                            {
                                this.props.submission.will_submit || this.props.submission.will_submit ?

                                    <div className="col-md-12">
                                        <div className="mt-3">
                                            <Button variant={'link'} className={'custom-cta primary cta-large full-opacity'} type={'submit'} block>Deposit Now</Button>
                                        </div>
                                    </div>
                                    :
                                    <></>
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
        amount: {
            value: state.form.amount.value || '',
            error: state.form.amount.error
        },
        deposit_by: {
            value: state.form.deposit_by.value || 'ETH',
            error: state.form.deposit_by.error
        },
        from_eth_address: {
            value: state.wallet.connected_wallet || '',
            error: state.form.from_eth_address.error
        }
    }
})

const dispatchToProps = dispatch => ({
    changeAmountField: (value) => dispatch(changeAmountField(value)),
    changeDepositByField: (value) => dispatch(changeDepositByField(value)),
    submitForm: (values, event) => dispatch(initiateTransaction(values, event))
})

export default connect(stateToProps, dispatchToProps)(BuySlip)
