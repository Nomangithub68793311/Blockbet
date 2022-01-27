import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import {getSliders} from "../../services/actions/data";
import {connect} from "react-redux";
import {Button} from "react-bootstrap";
import {openRegistrationModalIfClosed} from "../../services/actions/setting";
import {Link} from "react-router-dom";

class HomeCarousel extends React.Component {
    componentDidMount() {
        if (!this.props.sliders.is_loaded) {
            this.props.getSliders()
        }
    }

    render() {
        return (
            <Carousel className={'banner-carousel carousel carousel-animation fullsize-carousel'} showThumbs={false}>

                {
                    !this.props.sliders.is_loaded ||
                        this.props.sliders.data.map(item => (
                            <slide className="high-contrast light-text item carousel-item active" key={item.id}>
                                <div className="item">
                                    <a className="banner-container max-container">
                                        <figure className="banner-slide bg-image">
                                            <figcaption className="carousel-text">
                                                <div className="rich-text-body-content">
                                                    <div className="h1-heading caption-title">
                                                        {item.title}
                                                    </div>
                                                    <div className="h3-heading caption-subtitle">
                                                        {item.subtitle}
                                                    </div>
                                                    <p>
                                                        {
                                                            !this.props.session.is_client_logged_in?
                                                                <Button variant={'link'} className="custom-cta primary" onClick={() => this.props.openRegistrationModal()}>Join Now</Button>
                                                                :
                                                                <Link to={'/account/dashboard'} className="custom-cta primary">Referral</Link>
                                                        }
                                                    </p>
                                                </div>
                                            </figcaption>
                                            <div className="img-container">
                                                <img className="img-responsive" alt="Bet on NFL" src={item.banner} />
                                            </div>
                                        </figure>
                                    </a>
                                </div>
                            </slide>
                        ))
                }

            </Carousel>
        )
    }
}

const stateToProps = state => ({
    session: state.session,
    sliders: {
        data: state.data.sliders,
        is_loaded: state.data.is_sliders_loaded
    }
})

const dispatchToProps = dispatch => ({
    openRegistrationModal: () => dispatch(openRegistrationModalIfClosed()),
    getSliders: () => dispatch(getSliders()),
})

export default connect(stateToProps, dispatchToProps)(HomeCarousel)
