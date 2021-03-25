import { Component } from "react";
import Ppost from "../StyleComponents/Ppost";


class Footer extends Component {

    render() {
        return (
            <>
                <footer className="footer">
                    <div className="container">
                        <div className="row">
                            <div className="col l6 s12">
                                <br/>
                                <h5 className="white-text">
                                    About the creator</h5>
                                <p className="grey-text text-lighten-4">I am Nadia, you can find more on the link<br/>My
                                    contact</p>
                            </div>
                            <div className="col l4 offset-l2 s12">
                                <br/>
                                <h5 className="white-text">Links</h5>
                                <ul>
                                    <li><a className="grey-text text-lighten-3" href="/posts">{Ppost}</a></li>
                                    <li><a className="grey-text text-lighten-3"
                                           href="https://instagram.com/nadiia__onopriienko?igshid=1xe6udsafn5oy">Instagram</a>
                                    </li>
                                    <li><a className="grey-text text-lighten-3"
                                           href="https://t.me/NadinOk1992">Telegram</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="footer-copyright">
                        <div className="container" style={{color: "darkgrey"}}>
                            © 2021 USOF.ua <br/>
                            Здесь должна быть политика сайта<br/>А здесь лицензии
                            <br/>
                        </div>
                    </div>
                </footer>
            </>
        )
    }

}

export default Footer