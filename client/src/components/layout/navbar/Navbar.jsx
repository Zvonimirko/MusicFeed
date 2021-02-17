import React from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { logout } from "../../../actions/authActions";
import PropTypes from "prop-types";

import logo from "../../../images/Logo.png";
import "./navbar.scss";

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <div className="navbar__links">
      <Link className="btn btn-red" onClick={logout}>
        Logout
      </Link>
      <Link className="btn btn-green" to="/users">
        Users
      </Link>
    </div>
  );

  const guestLinks = (
    <div className="navbar__links">
      <Link className="btn btn-red" to="/login">
        Login
      </Link>
      <Link className="btn btn-green" to="/users">
        Users
      </Link>
    </div>
  );

  return (
    <div className="navbar">
      <div className="navbar__left">
        <Link className="navbar__left__logo" to="">
          <img src={logo} alt="Logo" />
          <p>MusicFeed</p>
        </Link>
      </div>
      {!loading && <> {isAuthenticated ? authLinks : guestLinks} </>}
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.authReducer,
});

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, { logout })(Navbar);
