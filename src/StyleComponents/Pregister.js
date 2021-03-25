import React, {Component} from "react"
import axios from "axios";
import Login from "./Plogin";
import {Route} from "react-router-dom";


export default class Pregister extends Component {
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
        event.preventDefault();



        // axios.defaults.headers['authorization'] = localStorage.getItem('token');
        axios.defaults.headers.post['Access-Control-Allow-Origin'] = true;
        axios.post(`http://localhost:3001/api/auth/register`, this.state)
            .then(res => {
                console.log(res);
                console.log(res.data);
            })
        //TODO route
}

    render() {
        return (
            <div className="container-reg">
                <div className="col s6 offset-s4 ">
        <form  className="card  N/A transparent">
            <div className="card-content white-text">
                <span className="card-title">Sing in</span>
                <div>

                    <div className="input-field ">
                        <input placeholder="login"
                               id="login"
                               type="text"
                               name="login"
                               className="blue-input"
                               onChange={this.handleChange}
                        />
                        {/*<label htmlFor="login">Login</label>*/}
                    </div>

                    <div className="input-field ">
                        <input placeholder="enter password"
                               id="password"
                               type="password"
                               name="password"
                               className="blue-input"
                               onChange={this.handleChange}
                        />
                        {/*<label htmlFor="Password">Password</label>*/}
                    </div>

                    <div className="input-field ">
                        <input placeholder="full name"
                               id="full_name"
                               type="text"
                               name="full_name"
                               className="blue-input"
                               onChange={this.handleChange}
                        />
                        {/*<label htmlFor="full name">Full name</label>*/}
                    </div>

                    <div className="input-field ">
                        <input placeholder="enter email"
                               id="email"
                               type="text"
                               name="email"
                               className="blue-input"
                               onChange={this.handleChange}
                        />

                    </div>
                </div>
            </div>
            <div className="card-action">
                <button className="button-custom">Login</button>
                <button onClick={this.handleSubmit} className="btn-resset" >Registration</button>

            </div>
        </form>
    </div>
</div>
        )
    }
}