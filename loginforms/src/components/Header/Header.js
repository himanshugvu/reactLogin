import React from 'react';
import { withRouter } from "react-router-dom";
import "./Header.css";
function Header(props) {
  const capitalize = (s) => {
    if (s === '') return 'Sign in'
    if (s === 'login' && window.$name !== undefined) return 'Welcome';
    if (s === 'login' && window.$name === undefined) return 'Sign in';
    if (s === 'register') return 'Create account';
    return s.charAt(0).toUpperCase() + s.slice(1)
  }
  const isRegister = props.location.pathname;
  const handleLogout = (e) => {
    props.history.push("/");
  };
  const title = capitalize(props.location.pathname.substring(1, props.location.pathname.length))
  return (
    <nav className="navbar navbar-dark bg-primary">
      <div className="row col-12 d-flex justify-content-center text-white">
        <span className="h3">{props.title || title}</span>
        {isRegister === '/home' ? (
          <button
            type="submit"
            className="btn btn-info buttonRight"
            onClick={handleLogout}
          >
            Logout
          </button>
        ) : (
            <span></span>
          )}

      </div>
    </nav >
  )
}
export default withRouter(Header);