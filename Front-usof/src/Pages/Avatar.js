import React, {Component} from "react"
import {Col, Container, Media, Row} from "react-bootstrap";
import login from "../images/login.png"
import Phome from "../StyleComponents/Phome"
import {useEffect} from "react";
import axios from "axios";
import Pavatar from "../StyleComponents/Pavatar";


export default class Avatar extends Component {


    render() {
        return (
            <div style={{margin: 90}}>
                <Pavatar />
            </div>
        )
    }
}