import React, { Component } from "react";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeartBroken } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {connect} from "react-redux";

class Dislike extends Component {
    state = { liked: false };
    toggle = () => {
        let localLiked = this.state.liked;

        // Toggle the state variable liked
        localLiked = !localLiked;
        this.setState({ liked: localLiked });
    };

    render() {
        return (
            <div className="container-dislike">
                <>
                    <div
                        className="container-maindis"
                        onClick={() => this.toggle()}
                    >
                        {this.state.liked === true ? (
                            <FontAwesomeIcon icon={faHeartBroken}/>
                        ) : (
                            <FontAwesomeIcon icon={faHeartBroken} />
                        )}
                    </div>
                </>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        currentUser: state.currentUser
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onUserCreateDislike: () => dispatch({type: 'CREATEDISLIKE'})
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (Dislike)

