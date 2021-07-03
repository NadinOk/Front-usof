import React, { Component } from "react"
import axios from "axios";
import { connect } from 'react-redux'


class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = event => {
        this.setState({[event.target.id]: event.target.value});
    }

    handleSubmit = event => {
        event.preventDefault()
        axios.defaults.headers.post['Access-Control-Allow-Origin'] = true
        axios.post(`http://localhost:3001/api/auth/login`, this.state)
            .then(res => {
                localStorage.setItem('token', res.data.token)
                axios.defaults.headers['authorization'] = localStorage.getItem('token')
                axios.get(`http://localhost:3001/api/users/${res.data.user_id}`)
                    .then((userData) => {
                        this.props.onUserLoggedIn(userData.data)
                    })
                    .finally(() => {
                        window.location.href = 'http://localhost:3000/posts'
                    })
            })
    }

    render() {
        return (

            <div className="container-reg">
                <div className="col s6 offset-s4 ">
                    <div className="card  N/A transparent">
                        <div className="card-content white-text">
                            <span className="card-title">Log in</span>
                            <div>
                                <div className="input-field ">
                                    <input placeholder="email"
                                           id="email"
                                           type="text"
                                           name="email"
                                           className="blue-input"
                                           onChange={this.handleChange}
                                    />
                                </div>

                                <div className="input-field ">
                                    <input placeholder=" password"
                                           id="password"
                                           type="password"
                                           name="password"
                                           className="blue-input"
                                           onChange={this.handleChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="card-action">
                            <button onClick={this.handleSubmit} className="button-custom">Login</button>
                        </div>
                        <a href="/reset-password-to-email" style={{color: "whitesmoke"}}>Востановить пароль</a>
                    </div>
                </div>
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
        onUserLoggedIn: (user) => dispatch({type: 'LOGIN', payload: {currentUser: user}})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
