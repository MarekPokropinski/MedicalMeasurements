import React from 'react';
import logo from './logo.svg';
import './App.css';
import GoogleLogin from 'react-google-login';

function onSignIn(response) {
  console.log('logged in! token: ', response)
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <GoogleLogin
          clientId="641328261456-20e7ud9jmghth8ekn25kcgmbp8o2vcm1.apps.googleusercontent.com"
          buttonText="LOGIN WITH GOOGLE"
          onSuccess={onSignIn}
          onFailure={onSignIn}
        />
      </header>
    </div>
  );
}

export default App;
