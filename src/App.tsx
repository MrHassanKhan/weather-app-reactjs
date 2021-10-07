import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

import { Route, Switch } from 'react-router';
import Home from './pages/Home';
import Header from './components/Header';
class App extends Component<{}, {}> {
  
  render() {
    return (
      <div>
        <Header />
        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            {/* <Route exact path="/login" component={Login} /> */}
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
