import React, {Component} from "react"
import { connect } from 'react-redux'
import {Button, Col, Container, Media, Row} from "react-bootstrap";

import axios from "axios";

 class  PnewPost extends Component {
    constructor(props) {
        super(props);
        this.state = {}


        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleChange = event => {
        this.setState({[event.target.id]: event.target.value});
    }

    handleSubmit = event => {
        if (this.props.currentUser) {
            event.preventDefault()
            console.log()
            axios.defaults.headers['authorization'] = localStorage.getItem('token');
            axios.post(`http://localhost:3001/api/posts`, this.state)
                .then(res => {
                    console.log(res.data)
                    this.props.onNewPost(res.data)
                    // this.setState({post: res.data})
                })
                .catch(err => {
                    if (err.response?.status === 401) {
                        this.props.onUnauthorizedError()
                    }
                })
                .finally(() => {
                    window.location.href = 'http://localhost:3000/posts'
                })
        }
    }
    render() {
        return (
            <Container style={{marginTop: 110}}>
                <Row>
                    <Col md="9">
                        <Media className="m-5 ">
                            <Media.Body className="text-newpost ">
                                    <div className="form-group-newpost" >
                                        <div className=" tcontainer-text"  >
                                            <input className="mainform-control-newpost"
                                                    id="title"
                                                   type="text"
                                                   style={{color: "white"}}
                                                   placeholder="Title"
                                                   onChange={this.handleChange} />
                                            <br/>
                                            <input className="mainform-control-newpost"
                                                   id="content"
                                                   type="text"
                                                   style={{color: "white"}}
                                                   placeholder="Content"
                                                   onChange={this.handleChange} />
                                            <br/>
                                            <input className="mainform-control-newpost"
                                                   id="categories"
                                                   type="text"
                                                   style={{color: "white"}}
                                                   placeholder="Categories"
                                                   onChange={this.handleChange} />
                                            <br />
                                            <Button onClick={this.handleSubmit}>Add</Button>

                                        </div>
                                    </div>
                                </Media.Body>
                            </Media>
                        </Col>
                    </Row>
                </Container>

        )
    }
}

const mapStateToProps = state => {
     return {
         currentUser: state.currentUser
     }
}


export default connect(mapStateToProps) (PnewPost);