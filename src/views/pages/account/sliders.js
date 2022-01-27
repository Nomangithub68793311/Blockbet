import React from "react";
import {Card, Table, Button} from "react-bootstrap";
import {Redirect} from "react-router-dom"
import {connect} from "react-redux";
import AccountSidebar from "../../compo/accountSidebar";
import {getSlider, getSliders} from "../../../services/actions/data";
import {
    closeAddSliderModalIfOpened, closeEditSliderModalIfOpened,
    openAddSliderModalIfClosed, openEditSliderModalIfClosed,
} from "../../../services/actions/setting";

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {get} from "../../../library/api";
import {notify} from "../../../library/notification";
import AddSlider from "../../compo/modals/slider/Add";
import EditSlider from "../../compo/modals/slider/Edit";

class Sliders extends React.Component {

    constructor() {
        super();

        this.handleDeleteEvent = this.handleDeleteEvent.bind(this)
    }

    handleDeleteEvent = (id) => {
        const Delete = withReactContent(Swal)

        Delete.fire({
            title: 'Are You Sure ?',
            text: 'You Want to Delete This Admin...',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Delete',
            cancelButtonText: 'Cancel',
            cancelButtonColor: '#28a745',
            confirmButtonColor: '#dc3545',
        }).then(result => {
            if (result.value) {
                get(`delete-admin/${id}`).then((response => {
                    notify(response.message, response.status)
                    this.props.getAdmins()
                }))
            }
        })
    }

    componentDidMount() {
        window.scrollTo(0, 0)
        if (!this.props.sliders.is_loaded){
            this.props.getSliders()
        }
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
                                                <AccountSidebar/>
                                            </div>

                                            <div className="col-md-9 my-3">
                                                <Card className={'pb-0'}>
                                                    <Card.Header>
                                                        <div className="d-flex justify-content-between align-items-center">
                                                            <span className={'align-middle'}>Sliders</span>
                                                            <Button variant={'success'} size={"sm"} onClick={() => this.props.openAddSliderModal()}>Add Slider</Button>
                                                        </div>
                                                    </Card.Header>
                                                    <Card.Body>
                                                        <Table bordered hover>
                                                            <thead>
                                                            <tr>
                                                                <th>Title</th>
                                                                <th>Subtitle</th>
                                                                <th>Action</th>
                                                            </tr>
                                                            </thead>
                                                            <tbody>
                                                            {
                                                                !this.props.sliders.is_loaded ||
                                                                this.props.sliders.data.map(item => (
                                                                    <tr key={item.id}>
                                                                        <td className={'align-middle'}>{item.title}</td>
                                                                        <td className={'align-middle'}>{item.subtitle}</td>
                                                                        <td className={'align-middle'}>
                                                                            <img src={item.banner} alt={item.title} style={{'max-height': 150, 'max-width':300}}/>
                                                                        </td>
                                                                        <td className={'align-middle'}>
                                                                            <Button variant={'primary'} size={'sm'} className={'mr-1'} onClick={() => this.props.openEditSliderModal(item.id)}>
                                                                                <i className={'icon icon-help-technical'}></i>
                                                                            </Button>
                                                                            <Button variant={'danger'} size={'sm'} onClick={() => this.handleDeleteEvent(item.id)}>
                                                                                <i className={'icon icon-trash'}></i>
                                                                            </Button>
                                                                        </td>
                                                                    </tr>
                                                                ))

                                                            }
                                                            </tbody>
                                                        </Table>

                                                    </Card.Body>
                                                </Card>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </main>
                        </div>
                }

                <AddSlider
                    show={this.props.add_slider_modal.show}
                    onHide={() => this.props.closeAddSliderModal()}
                />

                <EditSlider
                    show={this.props.edit_slider_modal.show}
                    onHide={() => this.props.closeEditSliderModal()}
                />
            </>
        )
    }
}

const stateToProps = state => ({
    session: state.session,
    add_slider_modal: state.setting.add_slider_modal.show,
    edit_slider_modal: state.setting.edit_slider_modal,
    sliders: {
        data: state.data.sliders,
        is_loaded: state.data.is_sliders_loaded
    }
})

const dispatchToProps = dispatch => ({
    openAddSliderModal: () => dispatch(openAddSliderModalIfClosed()),
    closeAddSliderModal: () => dispatch(closeAddSliderModalIfOpened()),
    openEditSliderModal: (id) => dispatch(openEditSliderModalIfClosed(id,() => {
        dispatch(getSlider(id))
    })),
    closeEditSliderModal: () => dispatch(closeEditSliderModalIfOpened()),
    getSliders: () => dispatch(getSliders()),
})

export default connect(stateToProps, dispatchToProps)(Sliders)