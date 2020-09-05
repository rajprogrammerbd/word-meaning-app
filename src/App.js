import React, { Component, Fragment } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

// Components
import Home from "./components/Home";
import Add from './components/Added';
import Navbar from "./components/Navbar";
import Success from "./components/Success";
import Error from "./components/Error";
import SearchReasult from "./components/SearchReasult";
import Word from "./components/Word";
import View from "./components/View";

// Stylesheets
import "./basic.scss";
import "./App.scss";

class App extends Component {
  state = {
    pageLimitView: 4
  }

  render() {
    return (
      <Fragment>
        <div className="header-bg"></div>
        <Navbar />

        <Switch>
          <Route path="/sucess/:status" render={props => <Success {...props} />} />
          <Route path="/add" render={props => <Add {...props} />} />
          <Route path="/404" render={props => <Error {...props} />} />
          <Route path="/view" render={props => <View {...props}  />} />
          <Route path="/findWord/:word" render={props => <Word {...props} />} />
          <Route path="/searchResult" render={props => <SearchReasult pageLimit={this.state.pageLimitView} {...props} />} />
          <Route path="/" exact render={props => <Home {...props} />} />
          <Redirect to="/404" />
        </Switch>

      </Fragment>
    );
  }
}

export default App;
