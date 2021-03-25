import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { Button } from "react-bootstrap";

class Delete extends Component {
    constructor(props) {
        super(props);
        this.state = {
            post: {},
            comments: [],
            likes: [],
            dislikes: []
        }
    }

    componentDidMount() {

        // axios.defaults.headers['authorization'] = localStorage.getItem('token');
        // axios.defaults.headers.post['Access-Control-Allow-Origin'] = true;
        // let delPost = axios.delete(`http://localhost:3001/api/posts/${this.props.match.params.post_id}`);
        // let delComment = axios.delete(`http://localhost:3001/api/posts/${this.props.match.params.post_id}/comments`);
        // let delLikes = axios.delete(`http://localhost:3001/api/posts/${this.props.match.params.post_id}/like`);
        //
        // axios.all([delPost, delComment, delLikes])
        //     .then(axios.spread((...responses) => {
        //         this.setState({
        //             post: responses[0].data[0],
        //             comments: responses[1].data,
        //             likes: responses[2].data
        //         });
        //     }))

    }

    render() {
        return (
            <div>

            </div>

        );
    }
}

const mapStateToProps = state => {
    return {
        currentUser: state.currentUser
    }
}


export default connect(mapStateToProps)(Delete)
