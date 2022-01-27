import React from "react";
import {Button, Form, Modal} from "react-bootstrap";
import {connect} from "react-redux";
import {
    changeContentField,
    submitForm
} from "../../../../services/actions/form";
import {
    closeEditSportModalIfOpened,
} from "../../../../services/actions/setting";

import { Editor } from '@tinymce/tinymce-react';


class EditPage extends React.Component {


    render() {
        console.log(this.props)
        return (
            <Modal
                {...this.props}
                size={'lg'}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Edit Page
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>

                    <Form onSubmit={(e) => this.props.submitForm(this.props.fields, this.props.page.id, e)}>
                        <div className="row">

                            <div className="col-md-12">
                                <Form.Group controlId="avatar">
                                    <Editor
                                        apiKey={'3xq2wocvil66oi6wm58ev6bid3n8i0kyl652bbqb4yypp1j2'}
                                        initialValue={this.props.fields.content.value}
                                        onEditorChange={(content) => this.props.changeContentField(content)}
                                        init={{
                                            menubar: false
                                        }}
                                    />
                                </Form.Group>
                            </div>

                            <div className="col-md-12">
                                <div className="mt-3">
                                    <Button variant={'link'} className={'custom-cta primary cta-large full-opacity'} type={'submit'} block>Save Page</Button>
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
        content: {
            value: state.form.content.value || state.data.page.data.content || '',
            error: state.form.content.error
        }
    },
    page: state.data.page
})

const dispatchToProps = dispatch => ({
    changeContentField: (value) => dispatch(changeContentField(value)),
    submitForm: (values, id, event) => dispatch(submitForm(`admin/update-single-page/${id}`, values, event, response => {
        if(response.status_code === 200) {
            dispatch(closeEditSportModalIfOpened())
        }
    }))
})

export default connect(stateToProps, dispatchToProps)(EditPage)
