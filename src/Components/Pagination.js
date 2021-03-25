import React, { Component } from "react";
import axios from "axios";


class Pagination extends Component {
    constructor(props) {
        super(props);
        this.state = {currentPageId: 1}
    }

    handlePages = event => {
        let pageId
        if (event.target.innerText === 'Next') {
            pageId = this.state.currentPageId + 1
        } else if (event.target.innerText === 'Prev' && this.state.currentPageId > 1) {
            pageId = this.state.currentPageId - 1
        } else {
            return
        }
        axios.defaults.headers['authorization'] = localStorage.getItem('token');
        axios.get(`http://localhost:3001/${this.props.url}?page=${pageId}`).then(res => {
            if (res.data.length > 0) {
                this.setState({currentPageId: pageId})
                this.props.handlePagination(res.data)
            }
        })
    }

    render() {
        return (
            <>
                <nav className="pagin">
                    <ul className="">
                        <li><a onClick={this.handlePages}>Prev</a></li>
                        <li><a onClick={this.handlePages}>Next</a></li>
                    </ul>
                </nav>
            </>

        )
    }
}

export default Pagination