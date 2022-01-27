import React from "react";
import {Card, Table, Button} from "react-bootstrap";
import {Redirect} from "react-router-dom"
import {connect} from "react-redux";
import AccountSidebar from "../../compo/accountSidebar";
import {getClient, getClients} from "../../../services/actions/data";
import Pagination from "react-js-pagination";
import {
    closeEditClientModalIfOpened,
    openEditClientModalIfClosed
} from "../../../services/actions/setting";
import EditClient from "../../compo/modals/client/Edit";

class Clients extends React.Component {

    componentDidMount() {
        window.scrollTo(0, 0)
        if (!this.props.clients.is_loaded){
            this.props.getClients()
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
                                                    <Card.Header>Users</Card.Header>
                                                    <Card.Body>
                                                        <div className="row px-1 pb-2 justify-content-between">
                                                            <div className="col-md-2">
                                                                <select className={'form-control'} onChange={(e) => this.props.getClients(this.props.clients.page, e.target.value, this.props.clients.search)}>
                                                                    <option value="10">10</option>
                                                                    <option value="20">20</option>
                                                                    <option value="40">40</option>
                                                                    <option value="100">100</option>
                                                                    <option value="250">250</option>
                                                                    <option value="500">500</option>
                                                                </select>
                                                            </div>
                                                            <div className="col-md-3">
                                                                <input className={'form-control'}  onChange={(e) => this.props.getClients(this.props.clients.page, this.props.clients.limit, e.target.value)}/>
                                                            </div>
                                                        </div>
                                                        <Table bordered hover>
                                                            <thead>
                                                            <tr>
                                                                <th>First Name</th>
                                                                <th>Last Name</th>
                                                                <th>Email</th>
                                                                <th>Username</th>
                                                                <th>Available Balance</th>
                                                                <th>Bonus Balance</th>
                                                                <th>Action</th>
                                                            </tr>
                                                            </thead>
                                                            <tbody>
                                                            {
                                                                !this.props.clients.is_loaded ||
                                                                this.props.clients.data.map(item => (
                                                                    <tr key={item.id}>
                                                                        <td className={'align-middle'}>{item.first_name}</td>
                                                                        <td className={'align-middle'}>{item.last_name}</td>
                                                                        <td className={'align-middle'}>{item.email}</td>
                                                                        <td className={'align-middle'}>{item.username}</td>
                                                                        <td className={'align-middle'}>${item.available_balance}</td>
                                                                        <td className={'align-middle'}>${item.bonus_balance}</td>
                                                                        <td>
                                                                            <Button variant={'primary'} size={'sm'} className={'mr-1'} onClick={() => this.props.openEditClientModal(item.id)}>
                                                                                <i className={'icon icon-help-technical'}/>
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
                                                            activePage={this.props.clients.page}
                                                            itemsCountPerPage={this.props.clients.limit}
                                                            totalItemsCount={this.props.clients.total_data}
                                                            itemClass={'page-item'}
                                                            linkClass={'page-link'}
                                                            onChange={(page) => this.props.getClients(page, this.props.clients.limit)}
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

                <EditClient
                    show={this.props.edit_client_modal.show}
                    onHide={() => this.props.closeEditClientModal()}
                />
            </>
        )
    }
}

const stateToProps = state => ({
    session: state.session,
    clients: {
        data: state.data.clients.data,
        limit: state.data.clients.limit,
        page: state.data.clients.page,
        search: state.data.clients.search,
        total_data: state.data.clients.total_data,
        is_loaded: state.data.clients.is_loaded
    },

    edit_client_modal: {
        show: state.setting.edit_client_modal.show
    }
})

const dispatchToProps = dispatch => ({
    getClients: (page, limit, search) => dispatch(getClients(page, limit, search)),

    openEditClientModal: (id) => dispatch(openEditClientModalIfClosed(id, () =>{
        dispatch(getClient(id))
    })),
    closeEditClientModal: () => dispatch(closeEditClientModalIfOpened())
})

export default connect(stateToProps, dispatchToProps)(Clients)