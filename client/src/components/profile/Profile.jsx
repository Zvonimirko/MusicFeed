import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Spinner from "../layout/spinner/Spinner.js";
import { getProfileById } from "../../actions/profileActions";

import "./profile.scss";
import { Link } from "react-router-dom";
import ProfileTop from "./ProfileTop.jsx";
import ProfileAbout from "./ProfileAbout.jsx";
import ProfileProject from "./ProfileProject.jsx";
import ProfileEducation from "./ProfileEducation.jsx";

const Profile = ({
  profile: { profile, loading },
  auth,
  getProfileById,
  match,
}) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById, match.params.id]);
  console.log(profile);
  console.log(auth);
  return (
    <>
      {profile === null || loading ? (
        <Spinner />
      ) : (
        <div className="profile">
          <div className="profile__inner">
            <ProfileTop profile={profile} auth={auth} />
            <ProfileAbout profile={profile} />
            <div className="profile__inner__footer">
              <div className="profile__inner__footer__container">
                <h2>Projects</h2>
                {profile.projects.length > 0 ? (
                  <>
                    {profile.projects.map((project) => (
                      <ProfileProject project={project} key={project._id} />
                    ))}
                  </>
                ) : (
                  <Link to="/add-project">
                    <h4>Add Project</h4>
                  </Link>
                )}
              </div>
              <div className="profile__inner__footer__container">
                <h2>Music Education</h2>
                {profile.education.length > 0 ? (
                  <>
                    {profile.education.map((edu) => (
                      <ProfileEducation education={edu} key={edu._id} />
                    ))}
                  </>
                ) : (
                  <p>hi</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  profile: state.profileReducer,
  auth: state.authReducer,
});

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, { getProfileById })(Profile);
