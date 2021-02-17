import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../../actions/authActions";
import { Link, Redirect } from "react-router-dom";

import "./login.scss";

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ email, password });
    setFormData({
      email: "",
      password: "",
    });
  };

  if (isAuthenticated) {
    return <Redirect to="dashboard" />;
  }

  return (
    <div className="login">
      <div className="login__inner">
        <div className="login__inner__left">
          <h1>Welcome Back</h1>
          <div className="login__inner__left__arrow"></div>
        </div>
        <div className="login__inner__right">
          <form className="login__inner__right__form" onSubmit={handleSubmit}>
            <div className="input1">
              <p>Email</p>
              <input
                type="email"
                name="email"
                value={email}
                onChange={handleChange}
              />
            </div>
            <div className="input2">
              <p>Password</p>
              <input
                type="password"
                name="password"
                value={password}
                onChange={handleChange}
              />
            </div>
            <button className="btn btn-black" type="submit">
              Log In
            </button>
          </form>
          <div className="login__inner__right__submit-link">
            <p>
              Don't have an account? <Link to="/register">Sign Up</Link>
            </p>
          </div>
        </div>
      </div>
      <div className="login-circle-1"></div>
      <div className="login-circle-2"></div>
      <div className="login-circle-3"></div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.authReducer.isAuthenticated,
});

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, { login })(Login);
