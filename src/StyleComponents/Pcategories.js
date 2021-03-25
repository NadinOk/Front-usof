import React, {Component} from "react"
import {Button, Col, Container, Media, Row} from "react-bootstrap";

import axios from "axios";



export default class Pcategories extends Component {
    constructor(props) {
        super(props);
        this.state = {categories: []}
    }

    componentDidMount() {
        axios.defaults.headers['authorization'] = localStorage.getItem('token');
        axios.defaults.headers.post['Access-Control-Allow-Origin'] = true;
        axios.get('http://localhost:3001/api/categories', this.state.categories.id).then(res => {

            this.setState({categories: res.data})
        })
    }

    render() {
        return (
            <>
                <Container style={{marginTop: 50}}>
                    <Row>
                        <Col md="9">
                            <Media className="m-5 ">
                                <Media.Body className="cat-box">
                                    <div>{this.state.categories.map((catElement, i) =>
                                        <div className=" tcontainer"  key={i}>
                                            {/*<img src={login} className='login'/>*/}
                                            {/*<h4>{postElement?.Author?.login}</h4>*/}
                                            <h5>{catElement.title}</h5>
                                            <p>{catElement.description}</p>
                                            {/*<p >{postElement.content}</p>*/}
                                            {/*<Button className="like" style={{marginRight: "2%"}}>*/}
                                            {/*    <Like />*/}
                                            {/*</Button>*/}
                                            {/*<Button  className="dislike">*/}
                                            {/*    <Dislike />*/}
                                            {/*</Button>*/}
                                            {/*<Button className="comment"> Comment</Button>*/}

                                        {/*    < Comment />*/}



                                        </div>)}
                                    </div>

                                    {/*<p>*/}
                                    {/*    We are not committing to keeping*/}
                                    {/*    breaking changes in lockstep with*/}
                                    {/*    bootstraps major releases, there*/}
                                    {/*    may be a react-bootstrap v2 targeting*/}
                                    {/*    Bootstrap v4 depending on what's best for the project.*/}
                                    {/*</p>*/}

                                </Media.Body>
                            </Media>
                        </Col>
                    </Row>
                </Container>
            </>
        )
    }
}