import React from "react";
import {Card, Table, Button} from "react-bootstrap";
import {Redirect} from "react-router-dom"
import {connect} from "react-redux";
import AccountSidebar from "../../compo/accountSidebar";
import {getSport, getSports} from "../../../services/actions/data";
import {closeEditSportModalIfOpened, openEditSportModalIfClosed} from "../../../services/actions/setting";
import EditSport from "../../compo/modals/sport/Edit";

class Sports extends React.Component {

    componentDidMount() {
        window.scrollTo(0, 0)
        if (!this.props.sports.is_loaded){
            this.props.getSports()
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
                                                <AccountSidebar />
                                            </div>

                                            <div className="col-md-9 my-3">
                                                <Card className={'pb-0'}>
                                                    <Card.Header>Sports</Card.Header>
                                                    <Card.Body>
                                                        <Table bordered hover>
                                                            <thead>
                                                            <tr>
                                                                <th>Name</th>
                                                                <th>Icon</th>
                                                                <th>Basnner</th>
                                                                <th>Action</th>
                                                            </tr>
                                                            </thead>
                                                            <tbody>
                                                            {
                                                                !this.props.sports.is_loaded ||
                                                                this.props.sports.data.map(item => (
                                                                    <tr key={item.id}>
                                                                        <td className={'align-middle'}>{item.name}</td>
                                                                        <td className={'align-middle text-center'}><i className={item.icon}></i></td>
                                                                        <td className={'align-middle'}>
                                                                            {
                                                                                item.banner ?
                                                                                    <img src={item.banner} alt={item.id} height={150}/>
                                                                                    :
                                                                                    "No Image Found"
                                                                            }
                                                                        </td>
                                                                        <td>
                                                                            <Button variant={'primary'} size={'sm'} className={'mr-1'} onClick={() => this.props.openEditSportsModal(item.id)}>
                                                                                <i className={'icon icon-help-technical'}/>
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

                <EditSport
                    show={this.props.edit_sport_modal.show}
                    onHide={() => this.props.closeEditSportModal()}
                />
            </>
        )
    }
}

const stateToProps = state => ({
    session: state.session,
    sports: {
        data: state.data.sports,
        is_loaded: state.data.is_sports_loaded
    },
    edit_sport_modal: state.setting.edit_sport_modal
})

const dispatchToProps = dispatch => ({
    getSports: () => dispatch(getSports()),
    openEditSportsModal: (id) => dispatch(openEditSportModalIfClosed(id, () => {
        dispatch(getSport(id))
    })),
    closeEditSportModal: () => dispatch(closeEditSportModalIfOpened())
})

export default connect(stateToProps, dispatchToProps)(Sports)