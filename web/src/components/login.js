import React from "react";
import logo from "../logo.svg";
import "../App.css";
import GoogleLogin from "react-google-login";

function onSignIn(response, props) {
  localStorage.setItem("token", response.accessToken);
  props.onLogin();
}

function Login(props) {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <GoogleLogin
          clientId="641328261456-ocqg4rj3butg5308i0ano2n51tgt2fk6.apps.googleusercontent.com"
          buttonText="Login With Google"
          onSuccess={response => onSignIn(response, props)}
          onFailure={onSignIn}
        />
      </header>
    </div>
  );
}

export default Login;
