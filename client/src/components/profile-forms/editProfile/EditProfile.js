import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  createProfile,
  getCurrentProfile,
} from "../../../actions/profileActions";

import "./editProfile.scss";

const EditProfile = ({
  createProfile,
  history,
  getCurrentProfile,
  profile: { profile, loading },
}) => {
  const [formData, setFormData] = useState({
    instruments: "",
    website: "",
    location: "",
    status: "",
    bio: "",
    youtube: "",
    facebook: "",
    instagram: "",
    twitter: "",
  });

  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  useEffect(() => {
    getCurrentProfile();

    setFormData({
      instruments:
        loading || !profile.instruments ? "" : profile.instruments.join(","),
      website: loading || !profile.website ? "" : profile.website,
      location: loading || !profile.location ? "" : profile.location,
      status: loading || !profile.status ? "" : profile.status,
      bio: loading || !profile.bio ? "" : profile.bio,
      twitter: loading || !profile.social ? "" : profile.social.twitter,
      facebook: loading || !profile.social ? "" : profile.social.facebook,
      youtube: loading || !profile.social ? "" : profile.social.youtube,
      instagram: loading || !profile.social ? "" : profile.social.instagram,
    });
  }, [loading]);

  const {
    instruments,
    website,
    location,
    status,
    bio,
    youtube,
    facebook,
    instagram,
    twitter,
  } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    createProfile(formData, history, true);
  };

  return (
    <div className="edit-profile">
      <div className="edit-profile__inner">
        <div className="edit-profile__inner__title">
          <h1>Edit Your Profile</h1>
          <p>Lets get some info into your profile</p>
          <p>* = required fields</p>
        </div>
        <form onSubmit={handleSubmit} className="edit-profile__inner__form">
          <div className="edit-profile__inner__inputs">
            <div className="edit-profile__inner__inputs__input">
              <select
                type="text"
                placeholder="Your musical status*"
                name="status"
                value={status}
                onChange={handleChange}
              >
                <option value="0">* Select Status</option>
                <option value="Solo Musician">Solo Musician</option>
                <option value="Band Member">Band Member</option>
                <option value="DJ">DJ</option>
                <option value="Song Writer">Song Writer</option>
                <option value="Tech Creator">Tech Creator</option>
                <option value="Composer">Composer</option>
                <option value="Other">Other</option>
              </select>
              <p>Give us an idea of where you are at in your music career</p>
            </div>
            <div className="edit-profile__inner__inputs__input">
              <input
                type="text"
                placeholder="Location"
                name="location"
                value={location}
                onChange={handleChange}
              />
              <p>City and country suggested (eg. Moscow, RU)</p>
            </div>
            <div className="edit-profile__inner__inputs__input">
              <input
                type="text"
                placeholder="Website"
                name="website"
                value={website}
                onChange={handleChange}
              />
              <p>What is URL of your website</p>
            </div>
            <div className="edit-profile__inner__inputs__input">
              <input
                type="text"
                placeholder="Instruments*"
                name="instruments"
                value={instruments}
                onChange={handleChange}
              />
              <p>
                Whats instruments you play? Please separate values with
                comma(eg. Guitar, Piano, ...)
              </p>
            </div>
            <div className="edit-profile__inner__inputs__input">
              <textarea
                cols="30"
                rows="10"
                placeholder="A short bio of yourself"
                name="bio"
                value={bio}
                onChange={handleChange}
              ></textarea>
              <p>Tell us a bit about yourself</p>
            </div>
          </div>
          <div className="edit-profile__inner__social-links">
            <div className="edit-profile__inner__social-links__button">
              <button
                className="btn btn-purple"
                type="button"
                onClick={() => toggleSocialInputs(!displaySocialInputs)}
              >
                Add Social Network Links
              </button>
              <p>Optional</p>
            </div>
            {displaySocialInputs && (
              <div className="edit-profile__inner__social-links__inputs">
                <div className="edit-profile__inner__social-links__inputs__input">
                  <span
                    className="iconify"
                    data-inline="false"
                    data-icon="akar-icons:instagram-fill"
                    style={{ color: "#2b77b5", fontSize: "64px" }}
                  ></span>
                  <input
                    type="text"
                    placeholder="Instagram URL"
                    name="instagram"
                    value={instagram}
                    onChange={handleChange}
                  />
                </div>
                <div className="edit-profile__inner__social-links__inputs__input">
                  <span
                    className="iconify"
                    data-inline="false"
                    data-icon="logos:twitter"
                    style={{ fontSize: "52px" }}
                  ></span>
                  <input
                    type="text"
                    placeholder="Twitter URL"
                    name="twitter"
                    value={twitter}
                    onChange={handleChange}
                  />
                </div>
                <div className="edit-profile__inner__social-links__inputs__input">
                  <span
                    className="iconify"
                    data-inline="false"
                    data-icon="logos:youtube-icon"
                    style={{ fontSize: "52px" }}
                  ></span>
                  <input
                    type="text"
                    placeholder="Youtube URL"
                    name="youtube"
                    value={youtube}
                    onChange={handleChange}
                  />
                </div>
                <div className="edit-profile__inner__social-links__inputs__input">
                  <span
                    className="iconify"
                    data-inline="false"
                    data-icon="logos:facebook"
                    style={{ fontSize: "64px" }}
                  ></span>
                  <input
                    type="text"
                    placeholder="Facebook URL"
                    name="facebook"
                    value={facebook}
                    onChange={handleChange}
                  />
                </div>
              </div>
            )}
          </div>
          <div className="edit-profile__inner__submit">
            <button className="btn btn-black" type="submit">
              Submit
            </button>
            <Link href="/dashboard" className="btn btn-orange">
              Go Back
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  profile: state.profileReducer,
});

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  withRouter(EditProfile)
);
