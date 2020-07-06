import React, { useState } from "react";
import axios from "axios";
import "./LoginForm.css";
import { API_BASE_URL } from "../../constants/apiContants";
import { withRouter } from "react-router-dom";

function LoginForm(props) {
  const [state, setState] = useState({
    email: "",
    successMessage: null,
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };
  const sendDetailsToServer = () => {
    const payload = {
      username: state.email,
    };
    axios
      .post(API_BASE_URL + "loginuser", payload)
      .then(function (response) {
        if (response.status === 200) {
          setState((prevState) => ({
            ...prevState,
            successMessage: "Login successful. Redirecting to home page..",
          }));
          redirectToLogin(response.data);
          props.showError(null);
        } else {
          props.showError("The username is not recognized");
        }
      })
      .catch(function (error) {
        props.showError("The username is not recognized");
      });
  }
  const handleSubmitClick = (e) => {
    e.preventDefault();
    if (state.email !== '') {
      sendDetailsToServer();
    } else {
      props.showError("Please enter username ");
    }
  };
  const redirectToLogin = (data) => {
    window.$name = data.username;
    props.updateTitle("Welcome");
    props.history.push({
      pathname: '/login',
      username: data.username,
    });
  };
  const redirectToRegister = () => {
    props.history.push("/register");
    props.updateTitle("Create account");
  };
  return (
    <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
      <form>
        <div className="form-group text-left">
          <label htmlFor="exampleInputEmail1">Username</label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            value={state.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-check"></div>
        <button
          type="submit"
          className="btn btn-primary form-control"
          onClick={handleSubmitClick}
        >
          Next
        </button>
      </form>
      <div
        className="alert alert-success mt-2"
        style={{ display: state.successMessage ? "block" : "none" }}
        role="alert"
      >
        {state.successMessage}
      </div>
      <div className="mt-2">
        <span>New to AutoDesk? </span>
        <span className="loginText" onClick={() => redirectToRegister()}>
          <u> Create Account</u>
        </span>
      </div>

      <div className="copyrightLogin">
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
