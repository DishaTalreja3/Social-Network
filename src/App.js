import React, { Component } from 'react';
import './css/App.css';
import TwoFactorAuthentication from './Login/TwoFactorAuthentication';
import Profile from './Profile';
import MainPage from './Login/MainPage';
import QRcode from './Login/QRcode';

import { BrowserRouter as Router, Route, Redirect} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Router>
        <Route path="/QRcode" strict render={ () =>
         (<QRcode code="data:image/png;base64,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"></QRcode>) 
        }/>
        <Route path="/login" strict render={ () =>
          (<MainPage />)
        }>
        </Route>
        <Route path="/" exact strict render={ () =>
          (<Redirect to='/login' />)
        }/>
        <Route path="/2factor"strict render={ () => (
          <TwoFactorAuthentication></TwoFactorAuthentication>)
        } />

        <Route path="/profile"strict render={ () => (
          <Profile></Profile>)
        } />

      </Router>
    );
  }
}

export default App;
