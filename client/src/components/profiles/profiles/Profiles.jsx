import React, { useEffect } from "react";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../../layout/spinner/Spinner";
import { getProfiles } from "../../../actions/profileActions";

import "./profiles.scss";
import ProfileItem from "../profileItem/ProfileItem";

const Profiles = ({ profile: { profiles, loading }, getProfiles }) => {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="profiles">
          <div className="profiles__inner">
            <div className="profiles__inner__top">
              <div className="profiles__inner__top__text">
                <h1>Profiles</h1>
                <p>Browse and connect with people</p>
              </div>
              <input type="text" placeholder="Search" />
            </div>
            <div className="profiles__inner__bottom">
              {profiles.length > 0 ? (
                profiles.map((profile) => (
                  <ProfileItem key={profile._id} profile={profile} />
                ))
              ) : (
                <h1>No Profiles Found</h1>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  profile: state.profileReducer,
});

Profiles.propTypes = {
  profile: PropTypes.object.isRequired,
  getProfiles: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { getProfiles })(Profiles);
