import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ProfileTop = ({ profile, auth }) => {
  const {
    status,
    location,
    website,
    social,
    user: { name },
  } = profile;
  return (
    <div className="profile__inner__header">
      <div className="profile__inner__header__picture">
        <div className="profile__inner__header__picture__container"></div>
      </div>
      <div className="profile__inner__header__items">
        <h2>{name}</h2>
        <p>{status}</p>
        <p>{location && <span>{location}</span>}</p>
        {auth.isAuthenticated &&
          auth.loading === false &&
          auth.user._id === profile.user._id && (
            <Link to="/edit-profile" className="btn btn-black">
              Edit Profile
            </Link>
          )}
        <div className="profile__inner__header__items__icons">
          {website && (
            <a
              href={`http://${website}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              <span
                className="iconify"
                data-inline="false"
                data-icon="ls:web"
                style={{ fontSize: "60px" }}
              ></span>
            </a>
          )}

          {social && social.instagram && (
            <a
              href={`http://${social.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              <span
                className="iconify"
                data-inline="false"
                data-icon="akar-icons:instagram-fill"
                style={{ color: "#2b77b5", fontSize: "64px" }}
              ></span>
            </a>
          )}

          {social && social.twitter && (
            <a
              href={`http://${social.twitter}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              <span
                className="iconify"
                data-inline="false"
                data-icon="logos:twitter"
                style={{ fontSize: "52px" }}
              ></span>
            </a>
          )}

          {social && social.youtube && (
            <a
              href={`http://${social.youtube}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              <span
                className="iconify"
                data-inline="false"
                data-icon="logos:youtube-icon"
                style={{ fontSize: "52px" }}
              ></span>
            </a>
          )}

          {social && social.facebook && (
            <a
              href={`http://${social.facebook}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              <span
                className="iconify"
                data-inline="false"
                data-icon="logos:facebook"
                style={{ fontSize: "64px" }}
              ></span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

ProfileTop.propTypes = {
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

export default ProfileTop;
