import React from "react";
import {Card, ListGroup} from "react-bootstrap";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {getSports} from "../../services/actions/data";

class LeftSidebar extends React.Component {

    componentDidMount() {
        if(!this.props.is_sports_loaded){
            this.props.getSports()
        }
    }

    render() {
        return (
            <Card className={'pb-0'}>
                <ListGroup variant="flush">
                    {
                        Object.keys(this.props.sports).length < 1 ||
                        this.props.sports?.map(item => (
                            <Link to={'/sport/'+item.id} className={'w-100 list-group-item'} key={item.id}>
                                <span className={'float-left' + (this.props.sport_id === item.id ? ' active' : '')}>
                                    <i className={item.icon + ' mr-2'}></i>
                                    {item.name}
                                </span>

                                <span className={'float-right'}>
                                    <i className={'icon icon-arrow-next' + (this.props.sport_id === item.id ? ' active' : '')}></i>
                                </span>
                            </Link>
                        ))
                    }
                </ListGroup>
            </Card>
        )
    }

}

const stateToProps = state => ({
    sport_id: state.data.sport_id,
    sports: state.data.sports,
    is_sports_loaded: state.data.is_sports_loaded
})

const dispatchToProps = dispatch => ({
    getSports: () => dispatch(getSports())
})

export default connect(stateToProps, dispatchToProps)(LeftSidebar)
