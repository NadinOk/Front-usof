import React, { Component } from "react";
import login from "../images/login.png"
import axios from "axios";
import { Button, Col, Container, Media, Row } from "react-bootstrap";

import Like from "../Components/Like";
import Dislike from "../Components/Dislike";
import Moment from "react-moment";


class Ppost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            post: {},
            comments: [],
            likes: [],
            dislikes: []
        }


        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this);

    }


    handleChange = event => {
        console.log(event.target.value)
        this.setState({content: event.target.value});
    }


    handleSubmit = event => {
        event.preventDefault()
        console.log(event);

        axios.defaults.headers['authorization'] = localStorage.getItem('token');
        axios.post(`http://localhost:3001/api/posts/${this.props.match.params.post_id}/comments`, this.state).then(res => {
            console.log(res.data)
            this.state.comments.push(res.data)
            this.setState({comments: this.state.comments})
        })

    }
    handlePostDelete = event => {
        event.preventDefault()
        console.log(this.state)

        axios.delete(`http://localhost:3001/api/posts/${this.props.match.params.post_id}`)
            .then(res => {
                this.setState({post: this.state.post})
                this.props.history.push('/posts')
            })
            .catch(err => {
                if (err.response?.status === 401) {
                    this.props.onUnauthorizedError()
                }
            })
    }


    handlePostLike = event => {
        event.preventDefault()
        console.log(this.state)

        axios.post(`http://localhost:3001/api/posts/${this.props.match.params.post_id}/like`, {type_like: 'like'})

            .then(res => {
                this.state.likes.push(res.data)
                this.setState({likes: this.state.likes})
            })
            .catch(err => {
                if (err.response?.status === 401) {
                    this.props.onUnauthorizedError()
                }
            })
    }
    handlePostDislike = event => {
        event.preventDefault()
        axios.post(`http://localhost:3001/api/posts/${this.props.match.params.post_id}/like`, {type_like: 'dislike'})
            .then(res => {
                console.log('[res data]', res.data)
                this.state.dislikes.push(res.data)
                this.setState({dislikes: res.data})

            })
            .catch(err => {
                if (err.response?.status === 401) {
                    this.props.onUnauthorizedError()
                }
            })
    }

    handleCommentLike(comment_id) {
        axios.post(`http://localhost:3001/api/comments/${comment_id}/like`, {type_like: 'like'})
            .then(res => {
                console.log('[res data]', res.data)
                this.state.likes.push(res.data)
                this.setState({likes: res.data})

            })
            .catch(err => {
                if (err.response?.status === 401) {
                    this.props.onUnauthorizedError()
                }
            })
    }

    handleCommentDislike(comment_id) {
        axios.post(`http://localhost:3001/api/comments/${comment_id}/like`, {type_like: 'dislike'})
            .then(res => {
                console.log('[res data]', res.data)
                this.state.dislikes.push(res.data)
                this.setState({dislikes: res.data})

            })
            .catch(err => {
                if (err.response?.status === 401) {
                    this.props.onUnauthorizedError()
                }
            })
    }


    componentDidMount() {
        // if (this.props.currentUser) {
        axios.defaults.headers['authorization'] = localStorage.getItem('token');
        axios.defaults.headers.post['Access-Control-Allow-Origin'] = true;
        let getPost = axios.get(`http://localhost:3001/api/posts/${this.props.match.params.post_id}`);
        let getComments = axios.get(`http://localhost:3001/api/posts/${this.props.match.params.post_id}/comments`);
        let getLikes = axios.get(`http://localhost:3001/api/posts/${this.props.match.params.post_id}/like`);


        axios.all([getPost, getComments, getLikes])
            .then(axios.spread((...responses) => {
                this.setState({
                    post: responses[0].data[0],
                    comments: responses[1].data,
                    likes: responses[2].data
                });
            }))

    }


    render() {


        let post = <h3>Post Not Found</h3>;
        let comment = null;
        if (this.state.post) {
            post = (
                <div className=" tcontainer">
                    <h4>{this.state.post.Author?.login}</h4>
                    <h5>{this.state.post.title}</h5>
                    <p>{this.state.post.content}</p>
                    <Moment format="DD.MM.YYYY HH:mm" date={this.state.publish_date}></Moment>
                    <div style={{marginTop: "5%", marginRight: "70%"}}>
                        <Button onClick={this.handlePostLike} className="like" style={{marginRight: "3%"}}>
                            <Like likes={this.state.likes}/>
                        </Button>
                        <Button onClick={this.handlePostDislike} className="dislike">
                            <Dislike dislikes={this.state.dislikes}/>
                        </Button>
                        <Button onClick={this.handlePostDelete}>delete</Button>
                    </div>
                </div>
            )
            comment = (
                <>
                    <div className="form-group" style={{marginTop: "10%"}}>
                        <input className="mainform-control"
                               type="text"
                               placeholder="Comment text"
                               onChange={this.handleChange}
                            style={{color: "white"}}
                        />
                        <Button onClick={this.handleSubmit}>Add</Button>
                    </div>
                    <div style={{marginTop: "10%"}}>{this.state.comments.map((commentElement, key) =>
                        <div className=" tcontainer-comment" key={key}>
                            <h4>{commentElement.CommentAuthor?.login}</h4>
                            <p>{commentElement.content}</p>
                            <div style={{marginTop: "5%", marginRight: "70%"}}>
                                <Button onClick={() => this.handleCommentLike(commentElement.id)} className="like"
                                        style={{marginRight: "3%"}}>
                                    <Like likes={this.state.likes}/>
                                </Button>
                                <Button onClick={() => this.handleCommentDislike(commentElement.id)}
                                        className="dislike">
                                    <Dislike dislikes={this.state.dislikes}/>
                                </Button>
                                <Button>delete
                                    {/*< Delete />*/}
                                </Button>

                            </div>
                        </div>)}
                    </div>
                </>
            )
        }
        return (
            <>

                <Container style={{marginTop: 110}}>
                    <Row>
                        <Col md="9">
                            <Media className="m-5 ">
                                <Media.Body className="text-post ">
                                    <div>
                                        {post}
                                    </div>
                                    <div>
                                        {comment}
                                    </div>
                                </Media.Body>
                            </Media>
                        </Col>
                    </Row>
                </Container>
            </>


        )
    }
}


export default (Ppost);
