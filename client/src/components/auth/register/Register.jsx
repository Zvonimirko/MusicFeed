import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import setAlert from "../../../actions/alertActions";
import { register } from "../../../actions/authActions";

import PropTypes from "prop-types";

import "./register.scss";

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { name, email, password, confirmPassword } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setAlert("Passwords don't match", "danger");
    } else {
      register({ name, email, password });
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    }
  };

  // If authenticated

  if (isAuthenticated) {
    return <Redirect to="dashboard" />;
  }

  return (
    <div>
      <div className="cover-image"></div>
      <div className="signup">
        <div className="signup__inner">
          <div className="signup__inner__left">
            <h1>Join The Sound.</h1>
          </div>
          <div className="signup__inner__right">
            <form
              className="signup__inner__right__form"
              onSubmit={handleSubmit}
            >
              <div className="signup__inner__right__form__input">
                <p>Name</p>
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={handleChange}
                />
              </div>
              <div className="signup__inner__right__form__input">
                <p>Email</p>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                />
              </div>

              <div className="signup__inner__right__form__input">
                <p>Password</p>
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={handleChange}
                />
              </div>
              <div className="signup__inner__right__form__input">
                <p>Confirm Password</p>
                <input
                  type="password"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={handleChange}
                />
                <button type="submit" className="btn btn-black">
                  Sign Up
                </button>
              </div>
            </form>
            <div className="signup__inner__right__submit-link">
              <p>
                Already have an account? <Link to="/login">Sign In</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticatied: state.authReducer.isAuthenticated,
});

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, { setAlert, register })(Register);
