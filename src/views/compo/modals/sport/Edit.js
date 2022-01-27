import React from "react";
import {Button, Form, Modal} from "react-bootstrap";
import {connect} from "react-redux";
import {
    changeBannerField,
    submitForm
} from "../../../../services/actions/form";
import {
    closeEditSportModalIfOpened,
} from "../../../../services/actions/setting";
import {getSports} from "../../../../services/actions/data";

import $ from "jquery";


class EditSport extends React.Component {

    componentDidMount() {
        this.$el = $('.dropify');
        this.$el.dropify();
    }

    render() {
        console.log(this.props)
        return (
            <Modal
                {...this.props}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Edit Slider
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>

                    <Form onSubmit={(e) => this.props.submitForm(this.props.fields, this.props.sport.id, e)}>
                        <div className="row">

                            <div className="col-md-12">
                                <Form.Group controlId="avatar">
                                    <Form.Control type="file" className={'dropify'} data-default-file={this.props.fields.banner.value} onChange={(e) => {this.props.changeBannerField(e.target.files[0])}}/>
                                    {
                                        this.props.fields.banner.error?
                                            <p className={'mt-1 text-danger'}>{ this.props.fields.banner.error }</p>: ''
                                    }
                                </Form.Group>
                            </div>

                            <div className="col-md-12">
                                <div className="mt-3">
                                    <Button variant={'link'} className={'custom-cta primary cta-large full-opacity'} type={'submit'} block>Save Slider</Button>
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
        banner: {
            value: state.form.banner.value || state.data.slider.data.banner || '',
            error: state.form.banner.error
        }
    },

    sport: state.data.sport
})

const dispatchToProps = dispatch => ({
    changeBannerField: (value) => dispatch(changeBannerField(value)),
    submitForm: (values, id, event) => dispatch(submitForm(`admin/update-single-sport/${id}`, values, event, response => {
        if(response.status_code === 200) {
            dispatch(closeEditSportModalIfOpened())
            dispatch(getSports())
        }
    }))
})

export default connect(stateToProps, dispatchToProps)(EditSport)
