import React from "react";
import {connect} from "react-redux";
import {Card} from "react-bootstrap";
import {Link} from "react-router-dom";
import slotMachine from "../../assets/games/shot-machine.jpg"
import roulette from "../../assets/games/roulette.jpg"

class Casino extends React.Component {

    render() {
        return (
            <div className={'top-container'}>
                <div className={'sp-top-visible'}>
                    <div className="component-wrapper max-container">
                        <div className="row my-5">

                            <div className="col-md-4 px-3 py-3">
                                <Card className={'pb-0'}>
                                    <Card.Img variant="top" src={slotMachine} height={250} />
                                    <Card.Body>
                                        <Card.Title>Fruit Slot Machine</Card.Title>
                                        <Link to={'/games/slot-machine'} className={'btn btn-primary'} target={'new'}>Play Now</Link>
                                    </Card.Body>
                                </Card>
                            </div>

                            <div className="col-md-4 px-3 py-3">
                                <Card className={'pb-0'}>
                                    <Card.Img variant="top" src={roulette} height={250} />
                                    <Card.Body>
                                        <Card.Title>Roulette</Card.Title>
                                        <Link to={'/games/roulette'} className={'btn btn-primary'} target={'new'}>Play Now</Link>
                                    </Card.Body>
                                </Card>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        )

    }
}

const stateToProps = state => ({})

const dispatchToProps = dispatch => ({})

export default connect(stateToProps, dispatchToProps)(Casino)

