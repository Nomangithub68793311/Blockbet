import React from "react";
import {Button, Form, Modal} from "react-bootstrap";
import {connect} from "react-redux";
import {
    changeTitleField,
    changeSubtitleField,
    changeBannerField,
    submitForm
} from "../../../../services/actions/form";
import {
    closeAddSliderModalIfOpened,
} from "../../../../services/actions/setting";
import {getSliders} from "../../../../services/actions/data";

import $ from "jquery";

class AddSlider extends React.Component {

    componentDidMount() {
        this.$el = $('.dropify');
        this.$el.dropify();
    }

    render() {
        return (
            <Modal
                {...this.props}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Add Slider
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>

                    <Form onSubmit={(e) => this.props.submitForm(this.props.fields, e)}>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="form-group">
                                    <Form.Control type="text" className="form-control" placeholder="Title" value={this.props.fields.title.value} onChange={(f) => this.props.changeTitleField(f.target.value)} />
                                    {
                                        this.props.fields.title.error?
                                            <p className={'mt-1 text-danger'}>{ this.props.fields.title.error }</p>: ''
                                    }
                                </div>
                            </div>

                            <div className="col-md-12">
                                <div className="form-group">
                                    <Form.Control type="text" className="form-control" placeholder="Subtitle" value={this.props.fields.subtitle.value} onChange={(f) => this.props.changeSubtitleField(f.target.value)} />
                                    {
                                        this.props.fields.subtitle.error?
                                            <p className={'mt-1 text-danger'}>{ this.props.fields.subtitle.error }</p>: ''
                                    }
                                </div>
                            </div>

                            <div className="col-md-12">
                                <Form.Group controlId="avatar">
                                    <Form.Control type="file" className={'dropify'} onChange={(e) => {this.props.changeBannerField(e.target.files[0])}}/>
                                    {
                                        this.props.fields.banner.error?
                                            <p className={'mt-1 text-danger'}>{ this.props.fields.banner.error }</p>: ''
                                    }
                                </Form.Group>
                            </div>

                            <div className="col-md-12">
                                <div className="mt-3">
                                    <Button variant={'link'} className={'custom-cta primary cta-large full-opacity'} type={'submit'} block>Add Slider</Button>
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
        title: {
            value: state.form.title.value || '',
            error: state.form.title.error
        },
        subtitle: {
            value: state.form.subtitle.value || '',
            error: state.form.subtitle.error
        },
        banner: {
            value: state.form.banner.value || '',
            error: state.form.banner.error
        }
    }
})

const dispatchToProps = dispatch => ({
    changeTitleField: value => dispatch(changeTitleField(value)),
    changeSubtitleField: value => dispatch(changeSubtitleField(value)),
    changeBannerField: value => dispatch(changeBannerField(value)),
    submitForm: (values, event) => dispatch(submitForm('admin/add-slider', values, event, response => {
        if(response.status_code === 200) {
            dispatch(closeAddSliderModalIfOpened())
            dispatch(getSliders())
        }
    }))
})

export default connect(stateToProps, dispatchToProps)(AddSlider)
