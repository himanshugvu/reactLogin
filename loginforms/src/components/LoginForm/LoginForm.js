import React, { useState } from "react";
import axios from "axios";
import "./LoginForm.css";
import { API_BASE_URL } from "../../constants/apiContants";
import { withRouter } from "react-router-dom";
import back from './back.png';

function LoginForm(props) {
  const [state, setState] = useState({
    email: "",
    password: "",
    successMessage: null,
  });
  const redirectToLogin = (data) => {
    window.$name = data.username;
    props.updateTitle("Welcome");
    props.history.push({
      pathname: '/login',
      username: data.username,
    });
  };
  const handleChange = (e) => {
    const { id, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmitClick = (e) => {
    e.preventDefault();
    const payload = {
      username: props.location.username,
      password: state.password,
    };
    axios
      .post(API_BASE_URL + "login", payload)
      .then(function (response) {
        if (response.status === 200) {
          setState((prevState) => ({
            ...prevState,
            successMessage: "Login successful. Redirecting to home page..",
          }));
          redirectToHome();
          props.showError(null);
        } else if (response.status === 204) {
          props.showError("Username and password do not match");
        } else {
          props.showError("Username does not exists");
        }
      })
      .catch(function (error) {
        props.showError("Username or password do not match");
      });
  };
  const redirectToHome = () => {
    props.updateTitle("Home");
    props.history.push("/home");
  };
  const redirectToRegister = () => {
    props.history.push("/register");
    props.updateTitle("Register");
  };
  const imageClick = () => {
    props.history.push("/");
    props.updateTitle("Sign in");
  }
  return (
    <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
      <form>
        <div id="left" className="form-group text-left">
          <img src={back} width="30" height="20" onClick={() => imageClick()} />
        </div>
        <div id="right" className="form-group text-left">
          <label htmlFor="username">{props.location.username}</label>
        </div>
        <div className="form-group text-left">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
            value={state.password}
            onChange={handleChange}
          />
        </div>
        <div className="form-check"></div>
        <button
          type="submit"
          className="btn btn-primary form-control"
          onClick={handleSubmitClick}
        >
          Sign in
        </button>
      </form>
      <div
        className="alert alert-success mt-2"
        style={{ display: state.successMessage ? "block" : "none" }}
        role="alert"
      >
        {state.successMessage}
      </div>
      <div className="mt-4">
        <span>Your Account for everything Autodesk </span>
        <br />
        <span className="loginText" onClick={() => redirectToLogin()}>
          Learn More
    </span>
      </div>
    </div>
  );
}

export default withRouter(LoginForm);
