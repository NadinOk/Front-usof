import React, {Component} from "react";

import axios from "axios";
import {Button, Col, Container, Media, Row} from "react-bootstrap";

import Like from "../Components/Like";
import Dislike from "../Components/Dislike";
import {connect} from "react-redux";
import Pagination from "./Pagination";


class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {posts: []}


        this.handleChange = this.handleChange.bind(this)
        this.handlePagination = this.handlePagination.bind(this)

    }


    handleChange = event => {

        this.setState({posts: event.target.value});
    }

    handlePagination(newPosts) {

        this.setState({posts: newPosts})
    }
    componentDidMount() {
        axios.defaults.headers['authorization'] = localStorage.getItem('token');
        if (this.props.currentUser) {

            axios.defaults.headers.post['Access-Control-Allow-Origin'] = true;
            axios.get(`http://localhost:3001/api/users/${this.props.currentUser.id}/posts`, this.state)
                .then(res => {
                    this.setState({posts: res.data})
            })
                .catch(err => {
                    if (err.response?.status === 401) {
                        this.props.onUnauthorizedError()
                    }
                })
        }

    }

    render() {
        return (
            <>
                <Container style={{marginTop: 110}}>
                    <Row>
                        <Col md="9">
                            <Media className="m-5 ">
                                <Media.Body className="text-post ">
                                    <div>
                                        <div>{this.state.posts.map((postElement, i) =>
                                        <div className=" tcontainer" key={i} >
                                            <h4> {this.props.currentUser.login}</h4>
                                            <a href={`posts/${postElement.id}`}><h5>{postElement.title}</h5></a>
                                            <p>{postElement.content}</p>
                                    <div style={{marginTop: "5%", marginRight: "70%"}}>
                                        <Button onClick={this.handlePostLike} className="like"
                                                style={{marginRight: "3%"}}>
                                            <Like likes={this.state.likes}/>
                                        </Button>
                                        <Button className="dislike" >
                                            <Dislike likes={this.state.likes}/>
                                        </Button>
                                        <Button className="delete">
                                            delete
                                        </Button>
                                    </div>
                                        </div>)}
                                            </div>
                                        </div>
                                </Media.Body>
                            </Media>
                        </Col>
                    </Row>
                </Container>
                <Pagination handlePagination={this.handlePagination} url={`api/posts/${this.props.currentUser.id}`}/>
            </>


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
        onUnauthorizedError: () => dispatch({type: 'LOGOUT'})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
