
import React from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./Components/Header";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Home from "./Pages/Home";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Categories from "./Pages/Categories";



function App() {
  return (
      <BrowserRouter>
          <div>
              <Switch>
                  <Route exact path="/" > jbsdfojnvxck</Route>
                  <Route exact path="/register" component={Register}/>
                  <Route exact path="/login" component={Login}/>
                  {/*<Route exact path="/logout" component={Logout}/>*/}
                  <Route exact path="/Categories" component={Categories}/>
              </Switch>
                <Header />
          </div>
      </BrowserRouter>

  );
}

export default App;
