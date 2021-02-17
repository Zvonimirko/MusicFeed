import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import "./landing.scss";

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  console.log(isAuthenticated);

  return (
    <div className="landing">
      <div className="landing__inner">
        <div className="landing__inner__left">
          <div className="landing__inner__left__image"></div>
        </div>
        <div className="landing__inner__right">
          <div className="landing__inner__right__text">
            <h1>Enjoy The Sound</h1>
            <p>
              Join us and discover new artists, albums, make connections towards
              creating music
            </p>
          </div>
          <Link className="btn btn-orange" to="/register">
            Join Now
          </Link>
        </div>
      </div>
      <div className="landing-circle-1"></div>
      <div className="landing-circle-2"></div>
      <div className="landing-circle-3"></div>
    </div>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.authReducer.isAuthenticated,
});

export default connect(mapStateToProps)(Landing);
