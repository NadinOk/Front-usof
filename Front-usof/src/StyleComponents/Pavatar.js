import React, { Component } from "react"
import axios from "axios";
import { connect } from "react-redux";
import { Button, Col, Container, Media, Row } from "react-bootstrap";


class Pavatar extends Component {
    constructor(props) {
        super(props);
        this.state = {filename: {}}
        this.fileInput = React.createRef();

        this.submitAvatar = this.submitAvatar.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange = event => {
        event.preventDefault()
        this.setState({[event.target.id]: event.target.value});
    }

    submitAvatar = (event) => {
        event.preventDefault()
        const formData = new FormData();
        formData.append('image', this.fileInput.current.files[0])
        axios.defaults.headers['authorization'] = localStorage.getItem('token');
        axios.defaults.headers.post['Access-Control-Allow-Origin'] = true
        axios.defaults.headers.post['Content-Type'] = 'multipart/form-data'
        axios.post(`http://localhost:3001/api/users/${this.props.currentUser.id}/avatar`, formData)
            .then(res => {
                window.alert(res.data)
                axios.get(`http://localhost:3001/api/users/${this.props.currentUser.id}`)
                    .then(res => {
                        this.props.onUserAvatar(res.data)
                    })
            })
    }

    render() {
        return (
            <Container style={{marginTop: 110}}>
                <Row>
                    <Col md="9">
                        <Media className="m-5 ">
                            <Media.Body className="text-post ">
                                <div className="file-box">
                                    <form onSubmit={this.submitAvatar}>
                                        <input className="form-control-file" id="formFileSm" type="file"
                                               ref={this.fileInput}/>
                                        <Button type={"submit"}>add</Button>
                                    </form>
                                    <label htmlFor="formFileSm" className="form-label"></label>

                                    <img className="image_avatar"
                                         src={`http://localhost:3001/${this.props.currentUser.profile_picture}`}/>
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

const mapDispatchAvatar = dispatch => {
    return {
        onUserAvatar: (user) => dispatch({type: 'AVATAR', payload: {currentUser: user}})
    }
}


export default connect(mapStateToProps, mapDispatchAvatar)(Pavatar)