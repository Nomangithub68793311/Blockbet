import React from "react";
import {connect} from "react-redux";
import {getPageBySlug} from "../../services/actions/data";

class Page extends React.Component {

    componentDidMount() {
        const {params} = this.props.match
        this.props.getPageBySlug(params.page_slug)
    }

    componentDidUpdate() {
        const {params} = this.props.match
        if(params.page_slug !== this.props.page.data.slug){
            this.props.getPageBySlug(params.page_slug)
        }
    }

    render() {
        return (
            <div className={'top-container'}>
                <div className="cms-layout-container">
                    <div className="marketing-page-frame-container max-container">
                        <div className="marketing-page-frame-content">
                            <div className="content-block">
                                <div className="max-container">
                                    <div className="content-wrapper">
                                        <div className="marketing-page-content-block-body">
                                            <div className="rich-text-body-content" dangerouslySetInnerHTML={{__html: this.props.page.data.content}}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )

    }
}

const stateToProps = state => ({
    page: state.data.page
})

const dispatchToProps = dispatch => ({
    getPageBySlug: (slug) => dispatch(getPageBySlug(slug))
})

export default connect(stateToProps, dispatchToProps)(Page)

