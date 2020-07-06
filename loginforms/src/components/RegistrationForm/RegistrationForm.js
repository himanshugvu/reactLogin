import React, { useState } from "react";
import axios from "axios";
import "./RegistrationForm.css";
import { API_BASE_URL } from "../../constants/apiContants";
import { withRouter } from "react-router-dom";

function RegistrationForm(props) {
  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    confirmEmail: "",
    email: "",
    password: "",
    confirmPassword: "",
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
    if (state.firstName.length === 0) {
      props.showError("First Name is required");
    } else if (state.lastName.length === 0) {
      props.showError("Last Name is required");
    } else if (state.email != state.confirmEmail) {
      props.showError("Username do not match");
    } else if (state.password != state.confirmPassword) {
      props.showError("Password do not match");
    } else if (state.email.length && state.password.length) {
      props.showError(null);
      const payload = {
        username: state.email,
        password: state.password,
        firstname: state.firstName,
        lastname: state.lastName,
      };
      axios
        .post(API_BASE_URL + "register", payload)
        .then(function (response) {
          if (response.status === 201) {
            setState((prevState) => ({
              ...prevState,
              successMessage:
                "Registration successful. Redirecting to home page..",
            }));
            redirectToLoginSuccess();
            props.showError(null);
          } else {
            props.showError("Some error ocurred");
          }
        })
        .catch(function (error) {
          console.log(error.response);
          if (error.response.status === 400) {
            props.showError(error.response.data.username);
          } else {
            props.showError("Please enter all the required information");
          }
        });
    } else {
      props.showError("Please enter valid username and password");
    }
  };
  const redirectToLoginSuccess = () => {
    props.updateTitle("Sign in");
    props.history.push("/");
  };
  const redirectToLogin = () => {
    props.updateTitle("Sign in");
    props.history.push("/");
  };
  const handleSubmitClick = (e) => {
    e.preventDefault();
    sendDetailsToServer();

  };
  return (
    <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
      <form>
        <div id="left" className="form-group text-left">
          <label htmlFor="exampleInputFirstName">First name</label>
          <input
            type="text"
            className="form-control"
            id="firstName"
            aria-describedby="firstNameHelp"
            value={state.firstName}
            onChange={handleChange}
          />
        </div>
        <div id="right" className="form-group text-left">
          <label htmlFor="exampleInputLastName">Last name</label>
          <input
            type="text"
            className="form-control"
            id="lastName"
            aria-describedby="lastNameHelp"
            value={state.lastName}
            onChange={handleChange}
          />
        </div>
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
        <div className="form-group text-left">
          <label htmlFor="exampleInputEmail1">Re-Type username</label>
          <input
            type="email"
            className="form-control"
            id="confirmEmail"
            aria-describedby="emailHelp"
            value={state.confirmEmail}
            onChange={handleChange}
          />
        </div>
        <div className="form-group text-left">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={state.password}
            onChange={handleChange}
          />
        </div>
        <div className="form-group text-left">
          <label htmlFor="exampleInputPassword1">Re-Type Password</label>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            value={state.confirmPassword}
            onChange={handleChange}
          />
        </div>
        <div className="form-check ">
          <button
            type="submit"
            className="btn btn-primary form-control"
            onClick={handleSubmitClick}
          >
            Create Account
        </button>
        </div>
      </form>
      <div
        className="alert alert-success mt-2"
        style={{ display: state.successMessage ? "block" : "none" }}
        role="alert"
      >
        {state.successMessage}
      </div>
      <div className="mt-2">
        <span>Already have an account? </span>
        <span className="loginText" onClick={() => redirectToLogin()}>
          Sign in
        </span>
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

export default withRouter(RegistrationForm);
