import React, { Component } from "react";

import axios from "axios";
import { Col, Container, Media, Row } from "react-bootstrap";
import { connect } from "react-redux";


class ResetPasswordToEmail extends Component {
    constructor(props) {
        super(props);
        this.state = "";

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = event => {
        this.setState({email: event.target.value});
    }
    handleSendMail = event => {
        event.preventDefault()
            axios.defaults.headers['authorization'] = localStorage.getItem('token');
            axios.post(`http://localhost:3001/api/auth/password-reset`, this.state)
                .then(res => {
                    console.log(res.data)

                    this.setState({password_reset: this.state.password_reset})
                })
                .catch(err => {
                    if (err.response?.status === 401) {
                        this.props.onUnauthorizedError()
                    }
                }).finally(() => {
                window.alert('Email sent! Check your mail!')
                window.location.href = 'http://localhost:3000/posts'


            })
        }


    render() {

        return (
            <>
                <Container style={{marginTop: 110}}>
                    <Row>
                        <Col md="9">
                            <Media className="m-5 ">
                                <Media.Body className="text-post ">
                                    <label style={{color: "deepskyblue"}}>Send link to e-mail</label>
                                    <div className="row">
                                        <form className="col s12">
                                            <div className="row">
                                                <div className="input col s8">
                                                    <div className="row">
                                                        <div className="input col s8">
                                                            <label style={{color: "#0c5460", height: 40}}
                                                                   htmlFor="email">Email</label>
                                                            <input style={{color: "white", marginLeft: 20}}
                                                                   id="email"
                                                                   type="email"
                                                                   className="validate"
                                                                   onChange={this.handleChange}
                                                            />
                                                        </div>

                                                    </div>
                                                </div>

                                            </div>
                                            <button onClick={this.handleSendMail}>Reset password</button>
                                        </form>
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

const mapStateToProps = state => {
    return {
        currentUser: state.currentUser
    }
}

export default connect(mapStateToProps)(ResetPasswordToEmail);