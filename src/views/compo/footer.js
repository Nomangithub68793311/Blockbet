import React from "react";
import '../css/bottomHeader.css'
import EighteenPlusIcon from '../../assets/images/18-plus.png'
import EthereumIcon from '../../assets/images/ethereum.png'
import FacebookIcon from '../../assets/images/facebook.png'
import TwitterIcon from '../../assets/images/twitter.png'

import {Link} from "react-router-dom";
import {connect} from "react-redux";

class Footer extends React.Component {
    render() {
        return (
            <footer className="footer-links">
                <div>
                    <div className="hide-scroll">
                        <ul className="custom-tab max-container tertiary" role="list">
                            <li role="link">
                                <Link title="About" to={'/p/about'}>About</Link>
                            </li>
                            <li role="link">
                                <Link title="Terms of Service" to={'/p/terms-of-service'}>Terms of Service</Link>
                            </li>
                            <li role="link">
                                <Link title="Forms &amp; Agreements" to={'/p/forms-and-agreements'}>Forms &amp; Agreements</Link>
                            </li>
                            <li role="link">
                                <Link title="Privacy Policy" to={'/p/privacy-policy'}>Privacy Policy</Link>
                            </li>
                            <li role="link">
                                <Link title="Responsible Gaming" to={'/p/responsible-gaming'}>Responsible Gaming</Link>
                            </li>
                            <li role="link">
                                <Link title="Contact" to={'/contact'}>Contact</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="content-block">
                        <div className="max-container">
                            <div className="content-wrapper">
                                <div className="rich-text-body-content">
                                    <div className="rich-text-body-content">
                                        <div className="footer-logos">
                                            <ul className="social-links-container">

                                                <li className={'mr-2'}>
                                                    <img src={EighteenPlusIcon}/>
                                                </li>

                                                <li className={'mr-2'}>
                                                    <img src={EthereumIcon}/>
                                                </li>

                                                {
                                                    !this.props.config.facebook_link||
                                                    <li className={'mr-2'}>
                                                        <a href={this.props.config.facebook_link} target={'_blank'}  rel={'noreferrer'}>
                                                            <img src={FacebookIcon}/>
                                                        </a>
                                                    </li>
                                                }

                                                {
                                                    !this.props.config.twitter_link||
                                                    <li>
                                                        <a href={this.props.config.twitter_link} target={'_blank'}  rel={'noreferrer'}>
                                                            <img src={TwitterIcon}/>
                                                        </a>
                                                    </li>
                                                }
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="content-block">
                        <div className="max-container">
                            <div className="content-wrapper">
                                <div className="rich-text-body-content">
                                    <div className="rich-text-body-content">
                                        {
                                            !this.props.is_configs_loaded ||
                                                <div className="disclaimer-container" dangerouslySetInnerHTML={{__html: this.props.config.footer_text}}></div>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </footer>
        )
    }
}

const stateToProps = state => ({
    is_configs_loaded: state.config.is_configs_loaded,
    config: state.config.configs,
})

const dispatchToProps = dispatch => ({})

export default connect(stateToProps, dispatchToProps)(Footer)
