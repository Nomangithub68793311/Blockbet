import React from "react";
import {Card, Table, Button} from "react-bootstrap";
import {Redirect} from "react-router-dom"
import {connect} from "react-redux";
import AccountSidebar from "../../compo/accountSidebar";
import {getAdmin, getAdmins} from "../../../services/actions/data";
import Pagination from "react-js-pagination";
import {
    closeAddAdminModalIfOpened,
    closeEditAdminModalIfOpened,
    openAddAdminModalIfClosed,
    openEditAdminModalIfClosed
} from "../../../services/actions/setting";
import AddAdmin from "../../compo/modals/admin/Add";
import EditAdmin from "../../compo/modals/admin/Edit";

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {get} from "../../../library/api";
import {notify} from "../../../library/notification";

class Admins extends React.Component {

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
        if (!this.props.admins.is_loaded){
            this.props.getAdmins()
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
                                                            <span className={'align-middle'}>Users</span>
                                                            <Button variant={'success'} size={"sm"} onClick={() => this.props.openAddAdminModal()}>Add Admin</Button>
                                                        </div>
                                                    </Card.Header>
                                                    <Card.Body>
                                                        <div className="row px-1 pb-2 justify-content-between">
                                                            <div className="col-md-2">
                                                                <select className={'form-control'} onChange={(e) => this.props.getAdmins(this.props.clients.page, e.target.value, this.props.clients.search)}>
                                                                    <option value="10">10</option>
                                                                    <option value="20">20</option>
                                                                    <option value="40">40</option>
                                                                    <option value="100">100</option>
                                                                    <option value="250">250</option>
                                                                    <option value="500">500</option>
                                                                </select>
                                                            </div>
                                                            <div className="col-md-3">
                                                                <input className={'form-control'}  onChange={(e) => this.props.getAdmins(this.props.clients.page, this.props.clients.limit, e.target.value)}/>
                                                            </div>
                                                        </div>
                                                        <Table bordered hover>
                                                            <thead>
                                                            <tr>
                                                                <th>First Name</th>
                                                                <th>Last Name</th>
                                                                <th>Email</th>
                                                                <th>Username</th>
                                                                <th>Action</th>
                                                            </tr>
                                                            </thead>
                                                            <tbody>
                                                            {
                                                                !this.props.admins.is_loaded ||
                                                                this.props.admins.data.map(item => (
                                                                    <tr key={item.id}>
                                                                        <td className={'align-middle'}>{item.first_name}</td>
                                                                        <td className={'align-middle'}>{item.last_name}</td>
                                                                        <td className={'align-middle'}>{item.email}</td>
                                                                        <td className={'align-middle'}>{item.username}</td>
                                                                        <td>
                                                                            <Button variant={'primary'} size={'sm'} className={'mr-1'} onClick={() => this.props.openEditAdminModal(item.id)}>
                                                                                <i className={'icon icon-help-technical'}/>
                                                                            </Button>
                                                                            <Button variant={'danger'} size={'sm'} onClick={() => this.handleDeleteEvent(item.id)}>
                                                                                <i className={'icon icon-trash'}/>
                                                                            </Button>
                                                                        </td>
                                                                    </tr>
                                                                ))

                                                            }
                                                            </tbody>
                                                        </Table>

                                                        <Pagination
                                                            innerClass={'pagination float-right'}
                                                            pageRangeDisplayed={10}
                                                            activePage={this.props.admins.page}
                                                            itemsCountPerPage={this.props.admins.limit}
                                                            totalItemsCount={this.props.admins.total_data}
                                                            itemClass={'page-item'}
                                                            linkClass={'page-link'}
                                                            onChange={(page) => this.props.getAdmins(page, this.props.admins.limit)}
                                                        />

                                                    </Card.Body>
                                                </Card>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </main>
                        </div>
                }

                <AddAdmin
                    show={this.props.add_admin_modal.show}
                    onHide={() => this.props.closeAddAdminModal()}
                />

                <EditAdmin
                    show={this.props.edit_admin_modal.show}
                    onHide={() => this.props.closeEditAdminModal()}
                />
            </>
        )
    }
}

const stateToProps = state => ({
    session: state.session,
    add_admin_modal: state.setting.add_admin_modal,
    edit_admin_modal: state.setting.edit_admin_modal,
    admins: {
        data: state.data.admins.data,
        limit: state.data.admins.limit,
        page: state.data.admins.page,
        search: state.data.admins.search,
        total_data: state.data.admins.total_data,
        is_loaded: state.data.admins.is_loaded
    }
})

const dispatchToProps = dispatch => ({
    getAdmins: (page, limit, search) => dispatch(getAdmins(page, limit, search)),
    openAddAdminModal: () => dispatch(openAddAdminModalIfClosed()),
    closeAddAdminModal: () => dispatch(closeAddAdminModalIfOpened()),

    openEditAdminModal: (id) => dispatch(openEditAdminModalIfClosed(id, () =>{
        dispatch(getAdmin(id))
    })),
    closeEditAdminModal: () => dispatch(closeEditAdminModalIfOpened()),
})

export default connect(stateToProps, dispatchToProps)(Admins)