
import React from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./Components/Header";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Home from "./Pages/Home";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Categories from "./Pages/Categories";
import Like from "./Components/Like";
import Avatar from "./Pages/Avatar";
import Post from "./Pages/Post"
import Ppost from "./StyleComponents/Ppost";
import PnewPost from "./StyleComponents/PnewPost";
import Profile from './Components/Profile'
import Security from "./Components/Security";
import NewPost from "./Pages/NewPost";
import NotFound from "./Components/NotFound";
import ResetPassword from "./Components/ResetPassword";
import ResetPasswordToEmail from "./Components/ResetPasswordToEmail";
import Footer from "./Components/Footer";
import Pagination from "./Components/Pagination";


export default  function App() {

    // const items = [{value: "Posts", href: "/posts",}, {value: "Crete post comment", href: "/post/:id/comment"}]
  return (
      <>
      < Header />

      <BrowserRouter>
              <Switch>
                  <Route exact path="/posts" component={Home} />
                  <Route exact path="/login" component={Login}/>
                  <Route exact path="/register" component={Register}/>
                  <Route exact path="/categories" component={Categories} />
                  <Route exact path="/profile" component={Profile} />

                  <Route exact path="/settings/" component={Avatar}/>
                  <Route exact path="/security" component={Security}/>
                  <Route exact path="/posts/:post_id" component={Ppost} />
                  <Route exact path="/post/create" component={PnewPost} />
                  {/*<Route component={NotFound} />*/}
                  <Route exact path="/password-reset/:id" component={ResetPassword} />
                  <Route exact path="/reset-password-to-email" component={ResetPasswordToEmail} />

              </Switch>

      </BrowserRouter>
          <Footer />
      </>
  );
}


