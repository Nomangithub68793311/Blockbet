import React from "react";
import {Card, Table, Button} from "react-bootstrap";
import {Redirect} from "react-router-dom"
import {connect} from "react-redux";
import AccountSidebar from "../../compo/accountSidebar";
import {getPage, getPages} from "../../../services/actions/data";
import {
    closeEditPageModalIfOpened,
    openEditPageModalIfClosed,
} from "../../../services/actions/setting";

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {get} from "../../../library/api";
import {notify} from "../../../library/notification";
import EditPage from "../../compo/modals/page/Edit";

class Pages extends React.Component {

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
        if (!this.props.pages.is_loaded){
            this.props.getPages()
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
                                                            <span className={'align-middle'}>Pages</span>
                                                        </div>
                                                    </Card.Header>
                                                    <Card.Body>
                                                        <Table bordered hover>
                                                            <thead>
                                                            <tr>
                                                                <th>Name</th>
                                                                <th>Slug</th>
                                                                <th>Action</th>
                                                            </tr>
                                                            </thead>
                                                            <tbody>
                                                            {
                                                                !this.props.pages.is_loaded ||
                                                                this.props.pages.data.map(item => (
                                                                    <tr key={item.id}>
                                                                        <td className={'align-middle'}>{item.name}</td>
                                                                        <td className={'align-middle'}>{item.slug}</td>
                                                                        <td className={'align-middle'}>
                                                                            <Button variant={'primary'} size={'sm'} className={'mr-1'} onClick={() => this.props.openEditPageModal(item.id)}>
                                                                                <i className={'icon icon-help-technical'}></i>
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

                <EditPage
                    show={this.props.edit_page_modal.show}
                    onHide={() => this.props.closeEditPageModal()}
                />
            </>
        )
    }
}

const stateToProps = state => ({
    session: state.session,
    pages: {
        data: state.data.pages,
        is_loaded: state.data.is_pages_loaded
    },
    edit_page_modal: state.setting.edit_page_modal
})

const dispatchToProps = dispatch => ({
    openEditPageModal: (id) => dispatch(openEditPageModalIfClosed(id,(id) => {
        dispatch(getPage(id))
    })),
    closeEditPageModal: () => dispatch(closeEditPageModalIfOpened()),
    getPages: () => dispatch(getPages()),
})

export default connect(stateToProps, dispatchToProps)(Pages)