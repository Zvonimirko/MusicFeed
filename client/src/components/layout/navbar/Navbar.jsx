import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { logout } from "../../../actions/authActions";
import PropTypes from "prop-types";

import logo from "../../../images/Logo.png";
import "./navbar.scss";

const Navbar = ({ auth: { isAuthenticated, loading }, logout, history }) => {
  const authLinks = (
    <div className="navbar__links">
      <button className="btn btn-red" onClick={() => logout(history)}>
        Logout
      </button>
      <Link className="btn btn-green" to="/profiles">
        Profiles
      </Link>
      <Link className="btn btn-purple" to="/posts">
        Posts
      </Link>
    </div>
  );

  const guestLinks = (
    <div className="navbar__links">
      <Link className="btn btn-red" to="/login">
        Login
      </Link>
      <Link className="btn btn-green" to="/profiles">
        Profiles
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

export default connect(mapStateToProps, { logout })(withRouter(Navbar));
