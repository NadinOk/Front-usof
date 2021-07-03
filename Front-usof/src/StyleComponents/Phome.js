import React, { Component } from "react"
import { Col, Container, Media, Row } from "react-bootstrap";
import login from "../images/login.png"
import avatar from "../StyleComponents/Pavatar"
import axios from "axios";
import Moment from 'react-moment'
import { connect } from "react-redux";
import Pagination from "../Components/Pagination";


class Phome extends Component {
    constructor(props) {
        super(props);
        this.state = {posts: []}
        this.handlePagination = this.handlePagination.bind(this)

    }

    componentDidMount() {

        axios.defaults.headers['authorization'] = localStorage.getItem('token');
        axios.get('http://localhost:3001/api/posts/', this.state)
            .then(res => {
                this.setState({posts: res.data})
            })
            .catch(err => {
                if (err.response?.status === 401) {
                    this.props.onUnauthorizedError()
                }
            })
    }

    handlePagination(newPosts) {

        this.setState({posts: newPosts})
    }

    render() {
        let defAvatar = <img className="author-photo" src={login}/>
        if (this.props.currentUser) {
            defAvatar = (
                <img className="author-photo" src={`http://localhost:3001/${this.props.currentUser.profile_picture}`}/>
            )
        }
        return (
            <>

                <Container style={{marginTop: 50}}>
                    <Row>
                        <Col md="9">
                            <Media className="m-5 ">
                                <Media.Body className="text-post ">
                                    <div>{this.state.posts.map((postElement, i) =>

                                        <div className=" tcontainer" key={i}>
                                            <div className="content">
                                                <a href={`posts/${postElement.id}`}><h5>{postElement.title}</h5></a>
                                                <p className="content-post">{postElement.content}</p>
                                                <hr/>
                                                <a href={`posts/${postElement.id}`}><p
                                                    style={{textAlign: "left"}}>{postElement.categories}</p></a>
                                            </div>
                                            <hr/>
                                            <div className="author">
                                                <div className="author-content">
                                                    {defAvatar}
                                                    <p>{postElement?.Author?.login}</p>
                                                </div>
                                                <div className="author-content">
                                                    <p>Posted at: <br/><Moment format="DD.MM.YYYY HH:mm"
                                                                               date={postElement.publish_date}></Moment>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>)}
                                    </div>
                                </Media.Body>
                            </Media>
                        </Col>
                    </Row>
                </Container>
                <Pagination handlePagination={this.handlePagination} url={'api/posts'}/>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        currentUser: state.currentUser
    }
}

export default connect(mapStateToProps)(Phome);