import React from "react";
import { Link } from "react-router-dom";
import "./landing.scss";

const Landing = () => {
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

export default Landing;
