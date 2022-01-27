import React from "react";
import {Card, Form, Button} from "react-bootstrap";
import {connect} from "react-redux";
import AccountSidebar from "../../compo/accountSidebar";
import $ from "jquery";
import {
    changeAdminEthereumAddressField, changeAmountField, changeFacebookLinkField, changeFooterTextField, changeNameField,
    changeSiteEmailField,
    changeSiteLogoField,
    changeSiteNameField, changeTitleField, changeTwitterLinkField,
    submitForm
} from "../../../services/actions/form";
import {setConfigs} from "../../../services/actions/config";
import { Editor } from '@tinymce/tinymce-react';
import {Redirect} from "react-router-dom";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

class SystemSetting extends React.Component {

    componentDidMount() {
        window.scrollTo(0, 0)
        this.$el = $('.dropify');
        this.$el.dropify();
    }

    render() {
        return (
            <>
                {
                    !this.props.session.is_logged_in ?
                        <Redirect to={'/'}/>:
                        <div className="top-container">
                            <main className="content">
                                <div className="max-container bx-account-menu-container">
                                    <div className="bx-account-wrapper custom-form-helper">

                                        <div className="row">

                                            <div className="col-md-3">
                                                <AccountSidebar></AccountSidebar>
                                            </div>

                                            <div className="col-md-9 my-3">

                                                <Card className={'pb-0'}>
                                                    <Card.Header>Site Setting</Card.Header>
                                                    <Card.Body>
                                                        <Form onSubmit={(e) => this.props.submitForm((
                                                            ({site_name, site_email, site_logo, footer_text, facebook_link, twitter_link, referral_bonus, referral_bonus_min_od, referral_text}) => ({site_name, site_email, site_logo, footer_text, facebook_link, twitter_link, referral_bonus, referral_bonus_min_od, referral_text})
                                                        )(this.props.fields), e)}>
                                                            <div className="row">

                                                                <div className="col-md-6">
                                                                    <Form.Group controlId="site_name">
                                                                        <Form.Label>Site Name</Form.Label>
                                                                        <Form.Control type="text" placeholder="Site Name" defaultValue={this.props.config.site_name} onChange={(e) => this.props.changeSiteNameField(e.target.value)}/>
                                                                    </Form.Group>
                                                                </div>

                                                                <div className="col-md-6">
                                                                    <Form.Group controlId="site_email">
                                                                        <Form.Label>Site Email</Form.Label>
                                                                        <Form.Control type="email" placeholder="Site Email" defaultValue={this.props.config.site_email} onChange={(e) => this.props.changeSiteEmailField(e.target.value)}/>
                                                                    </Form.Group>
                                                                </div>

                                                                <div className="col-md-12">
                                                                    <Form.Group controlId="site_logo">
                                                                        <Form.Label>Site Logo</Form.Label>
                                                                        <Form.Control type="file" placeholder="Site Logo" className={'dropify'} data-default-file={this.props.config.site_logo} onChange={(e) => this.props.changeSiteLogoField(e.target.files[0])}/>
                                                                    </Form.Group>
                                                                </div>

                                                                <div className="col-md-12">
                                                                    <Form.Group controlId="site_logo">
                                                                        <Form.Label>Footer Text</Form.Label>
                                                                        <CKEditor
                                                                            editor={ ClassicEditor }
                                                                            data={this.props.config.footer_text}
                                                                            onChange={ ( event, editor ) => {
                                                                                const data = editor.getData();
                                                                                this.props.changeFooterTextField(data)
                                                                            } }
                                                                        />
                                                                    </Form.Group>
                                                                </div>

                                                                <div className="col-md-12">
                                                                    <Form.Group controlId="site_logo">
                                                                        <Form.Label>Referral Page Text</Form.Label>
                                                                        <CKEditor
                                                                            editor={ ClassicEditor }
                                                                            data={this.props.config.referral_text}
                                                                            onChange={ ( event, editor ) => {
                                                                                const data = editor.getData();
                                                                                this.props.changeReferralTextField(data)
                                                                            } }
                                                                        />
                                                                    </Form.Group>
                                                                </div>

                                                                <div className="col-md-12">
                                                                    <Form.Group controlId="facebook_link">
                                                                        <Form.Label>Facebook Link</Form.Label>
                                                                        <Form.Control type="text" placeholder="Facebook Link" onChange={(e) => this.props.changeFacebookLinkField(e.target.value)} defaultValue={this.props.config.facebook_link}/>
                                                                    </Form.Group>
                                                                </div>

                                                                <div className="col-md-12">
                                                                    <Form.Group controlId="twitter_link">
                                                                        <Form.Label>Twitter Link</Form.Label>
                                                                        <Form.Control type="text" placeholder="Twitter Link" onChange={(e) => this.props.changeTwitterLinkField(e.target.value)} defaultValue={this.props.config.twitter_link}/>
                                                                    </Form.Group>
                                                                </div>

                                                                <div className="col-md-12">
                                                                    <Form.Group controlId="referral_bonus">
                                                                        <Form.Label>Referral Bonus (Percent)</Form.Label>
                                                                        <Form.Control type="number" placeholder="Referral Bonus" onChange={(e) => this.props.changeReferralBonusAmount(e.target.value)} defaultValue={this.props.config.referral_bonus}/>
                                                                    </Form.Group>
                                                                </div>

                                                                <div className="col-md-12">
                                                                    <Form.Group controlId="referral_bonus">
                                                                        <Form.Label>Referral Bonus Min Od</Form.Label>
                                                                        <Form.Control type="text" placeholder="Referral Bonus Min Od" onChange={(e) => this.props.changeReferralBonusMinOd(e.target.value)} defaultValue={this.props.config.referral_bonus_min_od}/>
                                                                    </Form.Group>
                                                                </div>

                                                                <div className="col-md-12">
                                                                    <Button variant={'success'} className={'float-right'} type={'submit'}>Save Site Settings</Button>
                                                                </div>

                                                            </div>
                                                        </Form>
                                                    </Card.Body>
                                                </Card>


                                                <Card className={'pb-0 mt-5'}>
                                                    <Card.Header>Betting Settings</Card.Header>
                                                    <Card.Body>
                                                        <Form onSubmit={(e) => this.props.submitForm((
                                                            ({admin_ethereum_address}) => ({admin_ethereum_address})
                                                        )(this.props.fields), e)}>
                                                            <div className="row">

                                                                <div className="col-md-12">
                                                                    <Form.Group controlId="admin_ethereum_address">
                                                                        <Form.Label>Admin Ethereum Address</Form.Label>
                                                                        <Form.Control type="text" placeholder="Admin Ethereum Address" defaultValue={this.props.config.admin_ethereum_address} onChange={(e) => this.props.changeAdminEthereumAddressField(e.target.value)}/>
                                                                    </Form.Group>
                                                                </div>

                                                                <div className="col-md-12">
                                                                    <Button variant={'success'} className={'float-right'} type={'submit'}>Save Betting Settings</Button>
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
    config: state.config.configs,
    fields: {
        site_name: {
            value: state.form.site_name.value || state.config.configs.site_name,
            error: state.form.site_name.error
        },
        site_email: {
            value: state.form.site_email.value || state.config.configs.site_email,
            error: state.form.site_email.error
        },
        site_logo: {
            value: state.form.site_logo.value || state.config.configs.site_logo,
            error: state.form.site_logo.error
        },
        footer_text: {
            value: state.form.footer_text.value || state.config.configs.footer_text,
            error: state.form.footer_text.error
        },
        referral_text: {
            value: state.form.title.value || state.config.configs.referral_text,
            error: state.form.title.error
        },
        facebook_link: {
            value: state.form.facebook_link.value || state.config.configs.facebook_link,
            error: state.form.facebook_link.error
        },
        twitter_link: {
            value: state.form.twitter_link.value || state.config.configs.twitter_link,
            error: state.form.twitter_link.error
        },
        referral_bonus: {
            value: state.form.amount.value || state.config.configs.referral_bonus,
            error: state.form.amount.error
        },
        referral_bonus_min_od: {
            value: state.form.name.value || state.config.configs.referral_bonus_min_od,
            error: state.form.name.error
        },

        admin_ethereum_address: {
            value: state.form.admin_ethereum_address.value || state.config.configs.admin_ethereum_address,
            error: state.form.admin_ethereum_address.error
        },
    }
})

const dispatchToProps = dispatch => ({
    changeSiteNameField: (value) => dispatch(changeSiteNameField(value)),
    changeSiteEmailField: (value) => dispatch(changeSiteEmailField(value)),
    changeSiteLogoField: (value) => dispatch(changeSiteLogoField(value)),
    changeFooterTextField: (value) => dispatch(changeFooterTextField(value)),
    changeFacebookLinkField: (value) => dispatch(changeFacebookLinkField(value)),
    changeTwitterLinkField: (value) => dispatch(changeTwitterLinkField(value)),
    changeAdminEthereumAddressField: (value) => dispatch(changeAdminEthereumAddressField(value)),
    changeReferralBonusAmount: (value) => dispatch(changeAmountField(value)),
    changeReferralBonusMinOd: (value) => dispatch(changeNameField(value)),
    changeReferralTextField: (value) => dispatch(changeTitleField(value)),
    submitForm: (values, event) => dispatch(submitForm('update-system-settings', values, event, () => {
        dispatch(setConfigs())
    })),
})

export default connect(stateToProps, dispatchToProps)(SystemSetting)

