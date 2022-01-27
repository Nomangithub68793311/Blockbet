import React from "react";
import {Link} from "react-router-dom";
import '../css/bottomHeader.css'
import {connect} from "react-redux";
import {getSports} from "../../services/actions/data";

class BottomHeader extends React.Component {

    renderIfAllSports() {
        if(this.props.full !== true) {
            return (
                <li role="button">
                    <div role="button" title="All Sports">
                        <Link className="sec-menu-btn static-btn more-sports" to="/sport">
                            <i className="icon static-icon icon-arrow-next"></i>
                            <span className="static-title">All Sports</span>
                        </Link>
                    </div>
                </li>
            )
        }
    }

    componentDidMount() {
        if(!this.props.is_sports_loaded){
            this.props.getSports()
        }
    }

    sportsByProps(){
        if(this.props.show) {
            return this.props.sports.slice(0, this.props.show)
        }
        return this.props.sports;
    }

    render() {
        return (
            <div className="content-block">
                <div className="max-container">
                    <div className="content-wrapper">
                        <div className="rich-text-body-content">
                            <nav className="sp-primary-nav">
                                <ul className="custom-tab small-tab tab-menu sport fade-in">

                                    {
                                        !this.props.is_sports_loaded ||
                                            this.sportsByProps().map(sport => (
                                                <li className="top-sports" title="Football" key={sport.id}>
                                                    <Link className="sp-tab-bar-btn static-btn" to={"/sport/" + sport.id}>
                                                        <i className={sport.icon + (this.props.sport_id === sport.id ? ' active' : '')}></i>
                                                        <span className={'static-title' + (this.props.sport_id === sport.id ? ' active' : '')}>{sport.name}</span>
                                                    </Link>
                                                </li>
                                            ))
                                    }

                                    {
                                        this.renderIfAllSports()
                                    }

                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const stateToProps = state => ({
    sport_id: state.data.sport_id,
    sports: state.data.sports,
    is_sports_loaded: state.data.is_sports_loaded
})

const dispatchToProps = dispatch => ({
    getSports: () => dispatch(getSports()),
})

export default connect(stateToProps, dispatchToProps)(BottomHeader)
