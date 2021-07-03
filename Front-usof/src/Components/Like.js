import React, { Component } from "react";
import { faHeart } from "@fortawesome/free-solid-svg-icons";


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {connect} from "react-redux";


class Like extends Component {
    constructor(props) {
        super(props);
        this.state = {}


        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleSubmit = (event) => {
        event.preventDefault()
        let newCount = this.state + 1;
        this.setState({
            like: newCount
        });
    };

    handleChange = event => {
        this.setState({type_like: event.target.value});
        console.log(this.state)
    }



    render() {

         return (
            <div className="container-like">
                <>
                    <div
                        className="container-main"
                        onChange={this.handleChange}
                        onSubmit={this.handleSubmit}
                        // onClick={() => this.addLike}
                    >
                        {this.state.like === false ? (
                            <FontAwesomeIcon icon={faHeart} />
                        ) : (
                            <FontAwesomeIcon icon={faHeart}  />
                        )} {this.state.likes}
                    </div>
                </>
            </div>
         )
    }
}
const mapStateToProps = state => {
    return {
        currentUser: state.currentUser
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onUserCreateLike: () => dispatch({type: 'CREATELIKE'})
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (Like)