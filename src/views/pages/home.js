import React from "react";
import {Link} from "react-router-dom";
import BottomHeader from "../compo/bottomHeader";
import HomeCarousel from "../compo/HomeCarousel";
import {connect} from "react-redux";
import {getSports} from "../../services/actions/data";
import {Card} from "react-bootstrap";
import SportNotFound from "../../assets/images/sport-not-found.jpg"

class Home extends React.Component {

    componentDidMount() {
        if(!this.props.is_sports_loaded){
            this.props.getSports()
        }
    }

    render() {
        return (
            <div className={'top-container'}>
                <div className={'content'}>
                    <div className={'marketing-page-container'}>

                        <BottomHeader show={9}/>

                        <HomeCarousel/>

                        <section className="carousel primary">
                            <div className="component-wrapper max-container">
                                <header className="component-header mb-4">
                                    <h2 className="h3-heading content-title">All Sports</h2>
                                </header>

                                <div className="row">

                                    {
                                        !this.props.is_sports_loaded ||
                                        this.props.sports.map((sport, index) => (
                                            <div className="col-md-3 col-sm-6 col-6 mb-3">
                                                <Link to={'/sport/' + sport.id}>
                                                    <Card className={'pb-0'}>
                                                        {
                                                            sport.banner ?
                                                                <Card.Img src={sport.banner} />
                                                                :
                                                                <Card.Img src={SportNotFound} />
                                                        }
                                                        <Card.Header>Bet On {sport.name}</Card.Header>
                                                    </Card>
                                                </Link>
                                            </div>
                                        ))
                                    }

                                </div>

                            </div>
                        </section>

                    </div>
                </div>
            </div>
        )

    }
}

const stateToProps = state => ({
    sports: state.data.sports,
    is_sports_loaded: state.data.is_sports_loaded
})

const dispatchToProps = dispatch => ({
    getSports: () => dispatch(getSports()),
})

export default connect(stateToProps, dispatchToProps)(Home)

