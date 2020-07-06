import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import LoginForm from './components/LoginForm/LoginForm';
import LoginUser from './components/LoginForm/LoginUser';
import RegistrationForm from './components/RegistrationForm/RegistrationForm';
import Home from './components/Home/Home';
import MetaTags from 'react-meta-tags';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import AlertComponent from './components/AlertComponent/AlertComponent';
function App() {
  const [title, updateTitle] = useState(null);
  const [errorMessage, updateErrorMessage] = useState(null);
  const name = window.$name;

  return (
    <Router>
      <div className="App">
        <Header title={title} />
        <MetaTags>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        </MetaTags>
        <div className="container d-flex align-items-center flex-column">
          <Switch>
            <Route path="/" exact={true}>
              <LoginUser showError={updateErrorMessage} updateTitle={updateTitle} />
            </Route>
            <Route path="/register">
              <RegistrationForm showError={updateErrorMessage} updateTitle={updateTitle} />
            </Route>
            <Route path="/login">

              {
                (name !== '' && name !== undefined) ?
                  <LoginForm showError={updateErrorMessage} updateTitle={updateTitle} /> :
                  <LoginUser showError={updateErrorMessage} updateTitle={updateTitle} />
              }
            </Route>
            <Route path="/home">
              <Home />
            </Route>
          </Switch>
          <AlertComponent errorMessage={errorMessage} hideError={updateErrorMessage} />
        </div>
      </div>
    </Router>
  );
}

export default App;
