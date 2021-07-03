import React, { Component } from "react";
import { Button} from "react-bootstrap";
import axios from "axios";

class ResetPassword extends Component {
   state = {
       password: ""
   }
    handleChange = event => {
       event.preventDefault()
        this.setState({ password: event.target.value})
    }

    submitNewPass = event => {
        event.preventDefault()
        axios.defaults.headers['authorization'] = localStorage.getItem('token');
        const arr = window.location.href.split('/')
        const token = arr[arr.length - 1]
        axios.post(`http://localhost:3001/api/auth/password-reset/confirm-token/${token}`, {password: this.state.password})
            .then(res => {
                console.log(res)
            }).catch(e => {
            console.log(e)
            window.location.href = ('http://localhost:3000/login')
        })

    }

    render() {
        return (
            <div style={{margin: 90}}>
                <form>
                    <input type="password"
                           placeholder="new password"
                           value={this.state.password}
                           onChange={this.handleChange}
                           style={{color: "white"}}/>
                    <Button type="submit"  onClick={this.submitNewPass}>send</Button>
                </form>
            </div>
        )
    }
}

export default ResetPassword